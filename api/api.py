from flask import Flask
from flask import jsonify
import mysql.connector
import json

# TODO - remove this line before going to production
from flask_cors import CORS, cross_origin

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# MySQL Configuration
with open('config.json') as f:
    json_data = json.load(f)

mysql_username = json_data['username']
mysql_password = json_data['password']
mysql_host     = 'localhost'
mysql_database = 'puzzleDatabase'

db = mysql.connector.connect(
    host=mysql_host,
    user=mysql_username,
    passwd=mysql_password,
    database=mysql_database
)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----


# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Flask Configuration
app = Flask(__name__)

# TODO - remove this line before going to production
CORS(app, support_credentials=True)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Adds a dummy entry into the users table
@app.route('/addSampleData')
@cross_origin(supports_credentials=True)
def add_sample_data():
    cursor = db.cursor()

    sql_query = '''
        INSERT INTO users (Username, Email, Password)
        VALUES (%(username)s, %(email)s, %(password)s)
    '''
    sample_user = {
        "username":"Woohoojin",
        "email":"jingles341@gmail.com",
        "password":"1234567890",
    }

    cursor.execute(sql_query, sample_user)
    db.commit()

    return jsonify(cursor.lastrowid)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Returns all entries in the users table
@app.route('/getAllUsers')
@cross_origin(supports_credentials=True)
def get_all_users():
    cursor = db.cursor()
    sql_query = 'SELECT * FROM users'
    cursor.execute(sql_query)
    data = cursor.fetchall()
    return jsonify(data)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
