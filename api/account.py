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
import smtplib
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

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
        email_address = post_data["Email"]
    except BadRequestKeyError:
        abort(400, "ERROR: malformed post request")

    try:
        token = post_data["Token"]
    except:
        return jsonify({"success":False,"message":"Failed to retrieve reCAPTCHA token, please refresh and try again. If this issue persists, please email support@puzzle-hub.com"})

    try:
        refer = post_data["Refer"]
    except:
        refer = ''

    captcha_model = {
        "secret":"6Ldx55wUAAAAAMQyfKUezVAoZM7MpPq3UReBo4qp",
        "response":str(token)
    }

    r = requests.post('https://www.google.com/recaptcha/api/siteverify', captcha_model)
    json_response = r.json()
    if not json_response["success"]:
        return jsonify({"success":False,"message":"reCAPTCHA verification failed. Please refresh and try again. If this issue persists, please email support@puzzle-hub.com"})

   
    # check that the username meets our guidelines 
    if len(username) > 12:
        return jsonify({"success":False,"message":"Username length must be no more than 12 characters."})

    if not username.isalnum():
        return jsonify({"success":False,"message":"Username must be alpha numeric."})


    repeat_char = re.compile(r'(.)\1\1\1\1\1')

    # test that the password meets our guidelines
    if len(password) < 8:
        return jsonify({"success":False,"message":"Password length too short"})

    if len(password) > 64:
        return jsonify({"success":False,"message":"Password length too long"})

    if repeat_char.match(password) is not None:
        return jsonify({"success":False,"message":"Password has repeating characters"})

    if check_digits(password):
        return jsonify({"success":False,"message":"Password has incrementing numbers"})

    if is_pwned_password(password):
        return jsonify({"success":False,"message":"This password has been leaked in a known data breach. Please use a different password"})
    
    # test that the email is valid 
    if check_valid_email(email_address) is False:
        return jsonify({"success":False,"message":"Email is invalid."})

    # hash the password
    password_hash = argon2.using(time_cost=160, memory_cost=10240, parallelism=8).hash(password)
    
    cursor = db.cursor()

    # ---------------------------------------------------------------
    # check if an account already exists with the given username
    sql_query = ''' 
        SELECT * FROM users
        WHERE Username = %(Username)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        return jsonify({"success":False,"message":"This username is already taken!"})

    # check if an account already exists with the given email
    sql_query = ''' 
        SELECT * FROM users
        WHERE Email = %(Email)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        return jsonify({"success":False,"message":"This email is already taken!"})
    # ---------------------------------------------------------------

    #add to table
    sql_query = '''
        INSERT INTO users (Username, Email, Password, Refer)
        VALUES (%(username)s, %(email)s, %(password)s, %(refer)s)
    '''

    user_entry = {
        "username":str(username),
        "email":str(email_address),
        "password":str(password_hash),
        "refer":str(refer)
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

    sql_query = '''
        INSERT INTO userMedals(UserID, Type, BronzeMedals, SilverMedals, GoldMedals)
        VALUES (%(user_id)s, 0, 0, 0, 0), (%(user_id)s, 1, 0, 0, 0), (%(user_id)s, 2, 0, 0, 0)
    '''
    cursor.execute(sql_query, validation_entry)
    db.commit()

    sql_query = '''
        INSERT INTO accountData(UserID, XP, PuzzlerIcon)
        VALUES (%(user_id)s, 0, 0)
    '''
    cursor.execute(sql_query, validation_entry)
    db.commit()
 
    validation_url = "https://puzzlehub.io/EmailVerify;code="+str(validation_id)

    # Send validation url
    SENDER = "noreply@puzzlehub.io"
    SENDERNAME = "No Reply"
    RECIPIENT = str(email_address)

    USERNAME_SMTP = json_data['email_username']
    PASSWORD_SMTP = json_data['email_password']

    HOST = "email-smtp.us-east-1.amazonaws.com"
    PORT = 587

    SUBJECT = "Puzzle Hub Email Verification"
    BODY_TEXT = '''
        Thank you for registering for an account on puzzle-hub.com! 
        Please click the following link to verify your account
        \n\n
        ''' + validation_url


    msg = MIMEMultipart('alternative')
    msg['Subject'] = SUBJECT
    msg['From'] = email.utils.formataddr((SENDERNAME, SENDER))
    msg['To'] = RECIPIENT

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(BODY_TEXT, 'plain')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(part1)

    # Try to send the message.
    try:  
        server = smtplib.SMTP(HOST, PORT)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(USERNAME_SMTP, PASSWORD_SMTP)
        server.sendmail(SENDER, RECIPIENT, msg.as_string())
        server.close()
    except Exception as e:
        print ("Error: ", e)

    return jsonify({"success":True})
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
@app.route('/api/changePasswordWithCode', methods=['POST'])
@cross_origin(supports_credentials=True)
def change_password_with_code():
    
    db = get_db()
    post_data = request.json

    try:
        code = post_data["Code"]
        password = post_data["NewPassword"]
    except:
        abort(500, "Missing required post data")

    repeat_char = re.compile(r'(.)\1\1\1\1\1')

    # test that the password meets our guidelines
    if len(password) < 8:
        return jsonify({"success":False,"message":"Password length too short"})

    if len(password) > 64:
        return jsonify({"success":False,"message":"Password length too long"})

    if repeat_char.match(password) is not None:
        return jsonify({"success":False,"message":"Password has repeating characters"})

    if check_digits(password):
        return jsonify({"success":False,"message":"Password has incrementing numbers"})

    if is_pwned_password(password):
        return jsonify({"success":False,"message":"This password has been leaked in a known data breach. Please use a different password"})

    password_hash = argon2.using(time_cost=160, memory_cost=10240, parallelism=8).hash(password)

    cursor = db.cursor()

    sql_query = '''
        SELECT UserID
        FROM passwordResets
        WHERE ValidationID = %(Code)s
    '''

    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) == 0:
        return jsonify({"success":True, "message":"Success! You can now log in"})

    user_id = (data[0])[0]

    sql_query = '''
        UPDATE users
        SET Password = %(hash)s
        WHERE UserID = %(user_id)s
    '''

    query_model = {
        "hash":str(password_hash),
        "user_id":user_id
    }

    cursor.execute(sql_query, query_model)
    db.commit()

    return jsonify({"success":True, "message":"Success! You can now log in"})
    
@app.route('/api/requestPasswordReset', methods=['POST'])
@cross_origin(supports_credentials=True)
def request_password_reset():

    db = get_db()
    post_data = request.json

    try:
        email_address = post_data["Email"]
    except:
        abort(500, "Email not found")

    cursor = db.cursor()

    sql_query = ''' 
        SELECT UserID FROM users
        WHERE Email = %(Email)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) == 0:
        print('rejecting')
        return jsonify({"message": "Please check your email for a link to reset your password"})

    user_id = (data[0])[0]
    reset_id = uuid.uuid4()

    reset_entry = {
        "user_id":str(user_id),
        "reset_id":str(reset_id)
    }

    sql_query = '''
        SELECT * FROM passwordResets
        WHERE UserID = %(user_id)s
    '''
    cursor.execute(sql_query, reset_entry)
    data = cursor.fetchall()


    if len(data) == 0:
        sql_query = '''
            INSERT INTO passwordResets(UserID, ValidationID)
            VALUES (%(user_id)s, %(reset_id)s)
        '''

        cursor.execute(sql_query, reset_entry)
        db.commit()
    else:
        sql_query = '''
            UPDATE passwordResets
            SET ValidationID = %(reset_id)s
            WHERE UserID = %(user_id)s
        '''

        cursor.execute(sql_query, reset_entry)
        db.commit()

    reset_url = "https://puzzle-hub.com/ResetPassword;code="+str(reset_id)

    SENDER = "noreply@puzzle-hub.com"
    SENDERNAME = "No Reply"
    RECIPIENT = str(email_address)

    USERNAME_SMTP = json_data['email_username']
    PASSWORD_SMTP = json_data['email_password']

    HOST = "email-smtp.us-east-1.amazonaws.com"
    PORT = 587

    SUBJECT = "Reset Your Puzzle Hub Password"
    BODY_TEXT = '''
        Someone has requested a password reset for your account
        on puzzle-hub. If this was you, you can set a new password here:
        \n\n
        ''' + reset_url + '''\n\n
        If you don't want to change your password or didn't request this,
        just ignore and delete this message.

        To keep your account secure, please don't forward this email
        to anyone.

        Happy Puzzling!
        '''


    msg = MIMEMultipart('alternative')
    msg['Subject'] = SUBJECT
    msg['From'] = email.utils.formataddr((SENDERNAME, SENDER))
    msg['To'] = RECIPIENT

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(BODY_TEXT, 'plain')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(part1)

    # Try to send the message.
    try:  
        server = smtplib.SMTP(HOST, PORT)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(USERNAME_SMTP, PASSWORD_SMTP)
        server.sendmail(SENDER, RECIPIENT, msg.as_string())
        server.close()
    except Exception as e:
        print ("Error: ", e)

    return jsonify({"message": "Please check your email for a link to reset your password"})

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
        return jsonify({"validated":False})

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

    return jsonify({"validated":True})


# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /setPuzzlerIcon
# Required POST parameters:
#   PuzzlerIconID: int
# Returns on success:
#   200
# Returns on failure:
#   500
@app.route('/api/setPuzzlerIcon', methods=['POST'])
@cross_origin(supports_credentials=True)
def set_puzzler_icon():
    try:
        puzzler_icon_id = request.json["PuzzlerIconID"]
    except:
        abort(500)

    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            abort(500)
    except:
        abort(500)

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        UPDATE accountData
        SET PuzzlerIcon = %(puzzler_icon_id)s
        WHERE UserID = %(user_id)s
    '''

    query_model = {
        "user_id": user_id,
        "puzzler_icon_id": puzzler_icon_id
    }

    cursor.execute(sql_query, query_model)
    db.commit()
    cursor.close()

    return jsonify({})

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
        return jsonify({'Accept':False, 'Token':'Username not found'})

    try:
        password = request.json["Password"]
    except:
        return jsonify({'Accept':False, 'Token':'Password not found'})

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
        return jsonify({'Accept':False, 'Token':'Username not found'})

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
# /getUsername
# Returns on success:
#   username: string
# Returns on failure:
#   N / A
@app.route('/api/getUsername', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_username():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return jsonify({'username':''})
    except:
        return jsonify({'username':''})

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        SELECT Username FROM users WHERE UserID=%(user_id)s;
    '''
    query_model = {
        "user_id":user_id
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    return jsonify({'username':(data[0])[0]})


# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getUserData
# Returns all important data on the user
@app.route('/api/getUserData', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user_data():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return jsonify({})
    except:
        return jsonify({})

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        SELECT U.UserID, U.Username, U.Role, AD.XP, AD.PuzzlerIcon
        FROM users AS U
        INNER JOIN accountData AS AD
            ON AD.UserID = U.UserID
        WHERE U.UserID=%(user_id)s
    '''
    query_model = {
        "user_id":user_id
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    row = data[0]

    to_return = {
        'userId': row[0],
        'username': row[1],
        'role': row[2],
        'xp': row[3],
        'puzzlerIcon': row[4]
    }

    return jsonify(to_return)


# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getLevel
# Returns on success:
#   username: string
# Returns on failure:
#   N / A
@app.route('/api/getLevel', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_level():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return jsonify({'xp':0})
    except:
        return jsonify({'xp':0})

    db = get_db()

    cursor = db.cursor()
    sql_query = ''' 
        SELECT XP FROM accountData WHERE UserID=%(user_id)s;
    '''
    query_model = {
        "user_id":user_id
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    return jsonify({'xp':int((data[0])[0])})

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getMedals
# Required POST parameters:
#   Username: string
# Returns on success:
#   List <
#       GameID: int
#       Type: int (0 - daily, 1 - weekly, 2 - monthly)
#       TotalMedals: int
#   >
@app.route('/api/getMedals', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_medals():
    try:
        username = request.json['Username']
    except:
        abort(500, 'Username not found')

    db = get_db()
    cursor = db.cursor()

    sql_query = ''' 
        SELECT UserID FROM users WHERE Username=%(username)s;
    '''
    query_model = {
        "username":username
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    if len(data) == 0:
        abort(500, 'Username does not exist')

    cursor.close()

    cursor = db.cursor()
    user_id = (data[0])[0]

    sql_query = '''
        SELECT Type, BronzeMedals, SilverMedals, GoldMedals FROM userMedals WHERE UserID=%(user_id)s;
    '''
    query_model = {
        "user_id":user_id
    }
    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)


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

    j = json.loads(content.decode())
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
