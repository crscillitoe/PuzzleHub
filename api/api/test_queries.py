from api import app
from flask_cors import cross_origin
from flask import jsonify
from flask import request
from api.database import get_db

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Adds a dummy entry into the users table
@app.route('/addSampleData')
@cross_origin(supports_credentials=True)
def add_sample_data():
    db = get_db()
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

@app.route('/addNumbers', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_numbers():
    print(request.headers.get('PuzzleHubToken'))
    post_data = request.json
    num_1 = post_data['num1']
    num_2 = post_data['num2']
    return str(num_1 + num_2)

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Returns all entries in the users table
@app.route('/getAllUsers')
@cross_origin(supports_credentials=True)
def get_all_users():
    db = get_db()
    cursor = db.cursor()
    sql_query = 'SELECT * FROM users'
    cursor.execute(sql_query)
    data = cursor.fetchall()
    return jsonify(data)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
