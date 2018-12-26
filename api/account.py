from api import app

from flask import abort
from flask import request
from flask_cors import cross_origin
from werkzeug.exceptions import BadRequestKeyError
from flask import jsonify
import json
#from bson import ObjectId
from passlib.hash import argon2
import re
import uuid
import dns.resolver
import socket
import smtplib
import urllib.request
import hashlib
import requests
from email.mime.text import MIMEText
from api.auth import get_user_id
from api.database import get_db
from api.auth import encrypt_token
from api.config import get_config_path

xstr = lambda s: s or ""

with open(get_config_path()) as f:
    json_data = json.load(f)

WHOIS_APIKEY = json_data['who_is_api_key']

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Registers a user account
@app.route('/api/registerUser', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_user():

    db = get_db()
    post_data = request.json

    try:
        username = post_data["Username"]
        password = post_data["Password"]
        email = post_data["Email"]
    except BadRequestKeyError:
        # TODO - specify which field was not found
        abort(400, "ERROR: malformed post request")
   
    # check that the username meets our guidelines 
    if len(username) > 16:
        abort(400, "ERROR: username length too long")


    check_is_valid_password(password)
    
    # TODO: add a check for banned characters
    
    # test that the email is valid 
    if check_valid_email(email) is False:
        abort(400, "ERROR: email is invalid")

    if check_blacklisted_email(email) is False:
        abort(400, "ERROR: domain is blacklisted")

    # hash the password
    # TODO - test how long it takes to hash, edit parameters to get it to around 250ms
    password_hash = argon2.using(time_cost=160, memory_cost=10240, parallelism=8).hash(password)
    
    cursor = db.cursor()

    # ---------------------------------------------------------------
    # TODO - put this in another method
    # check if an account already exists with the given username
    sql_query = ''' 
        SELECT * FROM users
        WHERE Username = %(Username)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        abort(400, "ERROR: an account with the username already exists")

    # check if an account already exists with the given email
    sql_query = ''' 
        SELECT * FROM users
        WHERE Username = %(Email)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        abort(400, "ERROR: an account with the email already exists")
    # ---------------------------------------------------------------

    #add to table
    sql_query = '''
        INSERT INTO users (Username, Email, Password)
        VALUES (%(username)s, %(email)s, %(password)s)
    '''

    user_entry = {
        "username":str(username),
        "email":str(email),
        "password":str(password_hash),
    }

    cursor.execute(sql_query, user_entry)
    db.commit()

    user_id = cursor.lastrowid
    #generate validation id
    validation_id = uuid.uuid4()

    sql_query = '''
        INSERT INTO validations(UserID, ValidationID)
        VALUES (%(user_id)s, %(validation_id)s)
    '''

    validation_entry = {
        "user_id":str(user_id),
        "validation_id":str(validation_id)
    }

    cursor.execute(sql_query, validation_entry)
    db.commit()
 
    validation_url = "http://apiurl.com/validateUser/"+str(validation_id)
    #send_validation_email(validation_url, email)

    #return "Validation email sent!"
    return validation_url
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    
@app.route('/api/validateUser/<validation_id>')
@cross_origin(supports_credentials=True)
def validate_user(validation_id):
    db = get_db()

    cursor = db.cursor()
    query_params = {
        'validation_id':validation_id
    }

    sql_query = ''' 
        SELECT UserID FROM validations
        WHERE ValidationID = %(validation_id)s
    '''
    cursor.execute(sql_query, query_params)
    data = cursor.fetchall()
    
    if len(data) != 1:
        abort(400, "ERROR: validation token is not valid")

    user_id = (data[0])[0]
    query_params = {
        'validation_id':validation_id,
        'user_id':user_id
    }

    sql_query = '''
        UPDATE users
        SET Validated = 1
        WHERE UserID = %(user_id)s
    '''
    cursor.execute(sql_query, query_params)
    db.commit()

    sql_query = '''
        DELETE FROM validations
        WHERE ValidationID = %(validation_id)s
    '''    
    cursor.execute(sql_query, query_params)
    db.commit()

    return 'User Validated'

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /login
# Required POST parameters:
#   Username: string
#   Password: string
# Returns on success:
#   Accept: bool - True
#   Token: string - Encrypted token for future user validation
# Returns on failure:
#   Accept: bool - False
#   Token: string - Empty string
@app.route('/api/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    try:
        username = request.json["Username"]
    except:
        abort(500, 'Username not found')

    try:
        password = request.json["Password"]
    except:
        abort(500, 'Password not found')

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        SELECT Password, UserID, NOW(3), Validated AS CurDate 
        FROM users WHERE Username=%(username)s;
    '''
    query_model = {
        "username":username
    }
    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()
    if len(data) == 0:
        abort(500, 'Username not found')

    hashed_pw = (data[0])[0]
    validated = (data[0])[3]
    if not validated or not argon2.verify(password, hashed_pw):
        return jsonify({'Accept':False, 'Token':''})
    else:
        user_id = (data[0])[1]
        curr_date = (data[0])[2]
        to_encrypt = json.dumps({"user_id":user_id, "time_issued":str(curr_date)})
        encrypted_token = encrypt_token(to_encrypt).decode()
        return jsonify({'Accept':True, 'Token':encrypted_token})

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /changePassword
# Required POST parameters:
#   OldPassword: string
#   NewPassword: string
# Returns on success:
#   Accept: bool - True
# Returns on failure:
#   Accept: bool - False
@app.route('/api/changePassword', methods=['POST'])    
@cross_origin(supports_credentials=True)
def change_password():
    
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            abort(500, 'Token verification failed')
    except:
        abort(500, 'Token verification failed')

    try:
        old_password = request.json["OldPassword"]
    except:
        abort(500, 'OldPassword not found')

    try:
        new_password = request.json["NewPassword"]
    except:
        abort(500, 'NewPassword not found')

    check_is_valid_password(new_password)
    if (new_password == old_password):
        abort(400, 'New password cannot be the same as the old password')

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        SELECT Password FROM users WHERE UserID=%(user_id)s;
    '''
    query_model = {
        "user_id":user_id,
        "new_password":argon2.using(time_cost=160, memory_cost=10240, parallelism=8).hash(new_password)
    }
    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()
    if len(data) == 0:
        abort(500, 'UserID does not exist')
    cursor.close()

    old_hashed_password = (data[0])[0]
    if not argon2.verify(old_password, old_hashed_password):
        abort(400, 'OldPassword not correct')

    cursor = db.cursor()
    sql_query = '''
        UPDATE users SET Password=%(new_password)s WHERE UserID=%(user_id)s;
    '''
    cursor.execute(sql_query, query_model)
    db.commit()
    cursor.close()

    return jsonify({"Accept":True})

##################################################
# HELPERS
#################################################

# check_is_valid_password
# Parameters:
#   password: string
# Return value:
#   void (aborts API call if password is malformed)
def check_is_valid_password(password):
    repeat_char = re.compile(r'(.)\1\1\1\1\1')
    # TODO: replace this with the actual name of the website
    website_name = re.compile(r's[a@]mp[l1][e3]', re.IGNORECASE)

    # test that the password meets our guidelines
    if len(password) < 8:
        abort(400, "ERROR: password length too short")

    if len(password) > 64:
        abort(400, "ERROR: password length too long")

    if repeat_char.match(password) is not None:
        abort(400, "ERROR: password has repeating chars")

    if check_digits(password):
        abort(400, "ERROR: pasword has incrementing nums")

    if website_name.match(password) is not None:
        abort(400, "ERROR: password has name of website")

    if is_pwned_password(password):
        abort(400, "ERROR: password is on list of banned passwords")

# is_pwned_password
# Parameters:
#   password: string
# Return value:
#   bool
#       False - indicates password is not in haveibeenpwned database
#       True - indicates password is in the database
def is_pwned_password(password):
    hash_pass = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    url = "https://api.pwnedpasswords.com/range/" + hash_pass[0:5]
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        if hash_pass[5:] in response.text:
            return True
    return False


def check_digits(password):  
    last, count = None, 0 
    for char in password:
        try:
            curr = int(char)
            if (last is None) or (last + 1 == curr):
                last = curr
                count += 1
            else:
                last, count = None, 1
        except ValueError:
            last, count = None, 0
    
        if count >= 5:
            return True
    return False

#check that the email provided looks like an actual email
def check_valid_email(email):
    if len(email) > 7:
        if re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email) is not None:
            return True
    return False

#check if the email is coming from some meme temporary account
def check_blacklisted_email(email):
    domain_name = email.split('@')[1]
    request = "http://api.whoapi.com/?domain=" + domain_name + "&r=blacklist&apikey=" + WHOIS_APIKEY
    try:
        content = urllib.request.urlopen(request).read()
    except URLError:
        return True

    j = json.loads(content)
    blacklist = int(j['blacklisted'])

    if blacklist == 0:
        return True
    else:
        return False

#sends a validation email to validate a new account
def send_validation_email(vid_url, email):
    sender_email = 'noreply@puzzle-hub.com'
    msg = MIMEText("Please click on the link to verify:\n" + str(vid_url))
    msg['Subject'] = 'PuzzleHub Validation Email'
    msg['From'] = sender_email
    msg['To'] = email

    s = smtplib.SMTP('localhost')
    s.sendmail(sender_email, [email], msg.asstring())
    s.quit()
