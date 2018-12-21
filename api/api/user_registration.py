from api import app

from flask import abort
from flask import request
from flask_cors import cross_origin
from werkzeug.exceptions import BadRequestKeyError
from flask import jsonify
import json
from bson import ObjectId
from passlib.hash import argon2
import re
import uuid
import dns.resolver
import socket
import smtplib
import urllib.request
from email.mime.text import MIMEText
from api.database import get_db


with open('config.json') as f:
    json_data = json.load(f)

WHOIS_APIKEY = json_data['who_is_api_key']

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Registers a user account
@app.route('/registerUser', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_user():
    db = get_db()
    #post_data = request.form
    post_data = request.get_json(force=True)

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

    repeat_char = re.compile(r'(.)\1\1\1\1\1')
    # replace this with the actual name of the website
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

    # TODO: add a cheeck for a set of common passwords (from some API)
    # TODO: add a check for banned characters
    
    # test that the email is valid 
    if check_valid_email(email) is False:
        abort(400, "ERROR: email is invalid")
    if check_bad_email(email) is False:
        abort(400, "ERROR: domain is faulty")
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
    validation_id = uuiid.uuiid4()

    sql_query = '''
        INSERT INTO validations(UserId, ValId)
        VALUES (%(user_id)s, %(validation_id)s)
    '''

    validation_entry = {
        "user_id":str(user_id),
        "validation_id":str(validation_id)
    }

    cursor.execute(sql_query, validation_entry)
    db.commit()
 
    validation_url = "http://apiurl.com/validateUser/"+str(validation_id)
    send_validation_email(validation_url, email)

    return "Validation email sent!"
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
    
@app.route('/validateUser/<vid>')
@cross_origin(supports_credentials=True)
def validate_user(vid):
    db = get_db()

    cursor = db.cursor()

    sql_query = ''' 
        SELECT * FROM validations
        WHERE ValId = %(vid)s
    '''
    cursor.execute(sql_query)
    data = cursor.fetchall()
    
    if len(data) != 1:
        abort(400, "ERROR: validation token is not valid")

    uid = data[0][1]

    sql_query = '''
        UPDATE users
        SET column5 = 1
        WHERE UserId = %(uid)s
    '''
    cursor.execute(sql_query)
    db.commit()

    sql_query = '''
        DELETE FROM validations
        WHERE ValID = %(vid)s
    '''    
    cursor.execute(sql_query)
    db.commit()

    


##################################################
# HELPERS
#################################################


def check_digits(password):  
    count, num = None, 0 
    for char in password:
        try:
            num = int(char)
            if (last is None) or (last+1 == num):
                last = num
                count += 1
            else:
                last, count = None, 0
        except ValueError:
            last, count = None, 0
    
        if count >= 5:
            return True
    return False

#check that the email provided looks like an actual email
def check_valid_email(email):
    if len(email) > 7:
        if re.match("^.+@([?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email) is not None:
            return True
    return False

#check if the SMTP server associated with the email actually exists and is running
def check_bad_email(email):
    domain_name = email.split('@')[1]
    records = dns.resolver.query(domain_name, 'MX')
    mx_record = str(records[0].exchange)

    host = socket.gethostname()
    server = smtplib.SMTP()
    server.set_debuglevel(0)

    server.connect(mx_record)
    server.hello(host)
    server.mail('ecksdee@domain.com')
    code, message = server.rcpt(str(email))
    server.quit()

    if code == 250:
        return True
    else:
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
