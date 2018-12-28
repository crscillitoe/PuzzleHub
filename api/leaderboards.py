from api import app
from flask import abort
from flask import request
from flask_cors import cross_origin
from flask import jsonify
from api.database import get_db



# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getLeaderboards
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   List (length 10) <
#       Username: string
#       Time: TimeString
#   >
# Returns on failure:
#   No return, throw error on failure.
@app.route('/api/getLeaderboards', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_leaderboards():
    try:
        game_id = request.json["GameID"]
    except:
        abort(500, "GameID not found")

    try:
        difficulty = request.json["Difficulty"]
    except:
        abort(500, "difficulty not found")

    db = get_db()

    cursor = db.cursor()
    sql_query = '''
        SELECT Username, TimeElapsed 
        FROM puzzleDatabase.leaderboards AS L
        INNER JOIN users AS U ON
        U.UserID = L.UserID
        WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
        ORDER BY TimeElapsed
        LIMIT 10
    '''

    query_model = {
        "game_id": game_id,
        "difficulty": difficulty
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    to_return = []

    for d in data:
        model = {
            "username":d[0],
            "time":str(d[1])
        }
        to_return.append(model)


    return jsonify(to_return)
