from flask import Flask, Blueprint, abort
#i assume this is needed, but it might not be
from werkzeug.exceptions import BadRequestKeyError
from flask import jsonify
#i assume this will change to sql
import pymongo
import json
from bson import ObjectId

from passlib.hash import argon2
import re

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
        abort(400, "ERROR: pasword has repeating chars")
    if website_name.match(password) is not None:
        abort(400, "ERROR: password has name of website")
    #TODO: add a cheeck for a set of common passwords (against a SQL table)
    
    #hash the password
    hash = argon2.hash(password)
    
    #add to table
    #addToSQLTable(username, hash, email)




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



