from flask import Flask
from flask import jsonify
import pymongo
import json
from bson import ObjectId

# TODO - remove this line before going to production
from flask_cors import CORS, cross_origin

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Mongo Configuration
mongo_db_url  = 'mongodb://localhost:27017/'
database_name = 'puzzle_hub_database'

client = pymongo.MongoClient(mongo_db_url)
db = client[database_name]
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----


# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Flask Configuration
app = Flask(__name__)

# TODO - remove this line before going to production
CORS(app, support_credentials=True)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Json encoder with support for mongodb ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Adds a dummy entry into the users table
@app.route('/addSampleData')
@cross_origin(supports_credentials=True)
def add_sample_data():
    users_table = db['users']
    sample_user = {
        "username":"Woohoojin",
        "email":"jingles341@gmail.com",
        "password":"1234567890",
        "validated":False
    }

    # Check if a user already exists with this email
    user = users_table.find_one({"email":"jingles341@gmail.com"})

    if user == None:
        result = users_table.insert_one(sample_user)
        return JSONEncoder().encode(to_return)
    else:
        return "User already exists"
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Returns all entries in the users table
@app.route('/getAllUsers')
@cross_origin(supports_credentials=True)
def get_all_users():
    users_table = db['users']
    to_return = []
    # .find() is the equivalent of SELECT *
    for record in users_table.find():
        to_return.append(record)
    return JSONEncoder().encode(to_return)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
