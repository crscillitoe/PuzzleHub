from flask import Flask, Blueprint, abort
#i assume this is needed, but it might not be
from werkzeug.exceptions import BadRequestKeyError
from flask import jsonify
#i assume this will change to sql
import pymongo
import json
from bson import ObjectId

from database import *

from passlib.hash import argon2
import re
import uuid

user_registration = Blueprint(  'user_registration', __name__, 
                                template_folder='templates')

@app.route('/registerUser')
@cross_origin(supports_credentials=True)
def register_user():
    post_data = request.form
    try:
        username = post_data["Username"]
        password = post_data["Password"]
        email = post_data["Email"]
    except BadRequestKeyError:
        abort(400, "ERROR: malformed post request")
    
    #check that the username meets our guidelines 
    if len(username) > 16:
        abort(400, "ERROR: username length too long")

    repeat_char = re.compile(r'(.)\1\1\1\1\1')
    #replace this with the actual name of the website
    website_name = re.compile(r's[a@]mp[l1][e3]', re.IGNORECASE)

    #test that the password meets our guidelines
    if len(password) < 8:
        abort(400, "ERROR: password length too short")
    if len(password) > 64:
        abort(400, "ERROR: password length too long")
    if repeat_char.match(password) is not None:
        abort(400, "ERROR: password has repeating chars")
    if check_inc_digit(password):
        abort(400, "ERROR: pasword has incrementing nums")
    if website_name.match(password) is not None:
        abort(400, "ERROR: password has name of website")
    #TODO: add a cheeck for a set of common passwords (against a SQL table)
    #TODO: add a check for banned characters
    
    #test that the email is valid 
    if check_valid_password() is False:
        abort(400, "ERROR: email is invalid")

    #hash the password
    password_hash = argon2.hash(password)
    
    cursor = db.cursor()

    #check if an account already exists with the given username
    sql_query = ''' 
        SELECT * FROM users
        WHERE Username = %(Username)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        abort(400, "ERROR: an account with the username already exists")

    #check if an account already exists with the given email
    sql_query = ''' 
        SELECT * FROM users
        WHERE Username = %(Email)s
    ''' 
    cursor.execute(sql_query, post_data)
    data = cursor.fetchall()

    if len(data) > 0:
        abort(400, "ERROR: an account with the email already exists")

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

    uid = cursor.lastrowid
    #generate validation id
    vid = uuiid.uuiid4()

    sql_query = '''
        INSERT INTO validations(UserId, ValId)
        VALUES (%(userid)s, %(valid)s)
    '''

    validation_entry = {
        "userid":str(uid),
        "valid":str(vid)
    }

    cursor.execute(sql_query, validation_entry)
    db.commit()
    
    #todo: actually send an email with this link
    return "http://apiurl.com/validateUser/"+vid
    
@app.route('/validateUser/<vid>')
@cross_origin(supports_credentials=True)
def validate_user(vid):

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


def check_inc_digit(password):  
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

def check_valid_password(email):
    if len(email) > 7:
        if re.match("^.+@([?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email) != None:
            return True
        return False

