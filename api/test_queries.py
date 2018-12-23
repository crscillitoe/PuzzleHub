from api import app
from flask_cors import cross_origin
from flask import jsonify
from flask import request
from api.database import get_db

@app.route('/api/addNumbers', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_numbers():
    print(request.headers.get('PuzzleHubToken'))
    post_data = request.json
    num_1 = post_data['num1']
    num_2 = post_data['num2']
    return str(num_1 + num_2)

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# Returns all entries in the users table
@app.route('/api/getAllUsers')
@cross_origin(supports_credentials=True)
def get_all_users():
    db = get_db()
    cursor = db.cursor()
    sql_query = 'SELECT * FROM users'
    cursor.execute(sql_query)
    data = cursor.fetchall()
    return jsonify(data)
# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
