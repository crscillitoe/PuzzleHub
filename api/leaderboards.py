from api import app
from flask import abort
from flask import request
from flask_cors import cross_origin
from flask import jsonify
from api.database import get_db
from api.auth import get_user_id

xstr = lambda s: s or ""

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getLeaderboards
# Required POST parameters:
#   GameID: int
#   Difficulty: int
#                     D   W   M
#   Leaderboard: int (0 - 1 - 2)
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
        abort(500, "Difficulty not found")

    try:
        leaderboard = request.json["Leaderboard"]
    except:
        abort(500, "Leaderboard not found")

    db = get_db()

    cursor = db.cursor()
    if leaderboard == 0:
        sql_query = '''
            SELECT Username, TimeElapsed, Role
            FROM dailyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
            ORDER BY TimeElapsed
            LIMIT 25
        '''
    elif leaderboard == 1:
        sql_query = '''
            SELECT Username, TimeElapsed, Role
            FROM weeklyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
            ORDER BY TimeElapsed
            LIMIT 25
        '''
    elif leaderboard == 2:
        sql_query = '''
            SELECT Username, TimeElapsed, Role
            FROM monthlyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
            ORDER BY TimeElapsed
            LIMIT 25
        '''

    query_model = {
        "game_id": game_id,
        "difficulty": difficulty
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    to_return = []

    for d in data:
        if len( str(d[1]).split(':')[2] ) != 2:
            model = {
                "username":d[0],
                "time":str(d[1])[:-3],
                "role":str(d[2])
            }
            to_return.append(model)
        else :
            model = {
                "username":d[0],
                "time":str(d[1]) + '.000',
                "role":str(d[2])
            }
            to_return.append(model)

    return jsonify(to_return)

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getPersonalBest
# Required POST parameters:
#   GameID
#   Difficulty
# Returns on success:
#   PersonalBest: TimeString (return 'N/A' if no time on record)
# Returns on failure:
#   No return, throw error on failure.
@app.route('/api/getPersonalBest', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_personal_best():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return '-1'
    except:
        return '-1'

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
    sql_query_1 = '''
        SELECT TimeElapsed 
        FROM dailyLeaderboards
        WHERE GameID = %(game_id)s AND 
              Difficulty = %(difficulty)s AND
              UserID = %(user_id)s
    '''
    sql_query_2 = '''
        SELECT TimeElapsed 
        FROM weeklyLeaderboards
        WHERE GameID = %(game_id)s AND 
              Difficulty = %(difficulty)s AND
              UserID = %(user_id)s
    '''
    sql_query_3 = '''
        SELECT TimeElapsed 
        FROM monthlyLeaderboards
        WHERE GameID = %(game_id)s AND 
              Difficulty = %(difficulty)s AND
              UserID = %(user_id)s
    '''

    query_model = {
        "game_id": game_id,
        "difficulty": difficulty,
        "user_id": user_id
    }

    cursor.execute(sql_query_1, query_model)
    data_1 = cursor.fetchall()
    cursor.close()

    cursor = db.cursor()
    cursor.execute(sql_query_2, query_model)
    data_2 = cursor.fetchall()
    cursor.close()

    cursor = db.cursor()
    cursor.execute(sql_query_3, query_model)
    data_3 = cursor.fetchall()
    cursor.close()

    daily_time = "N/A"
    weekly_time = "N/A"
    monthly_time = "N/A"

    if len(data_1) != 0:
        if len( str((data_1[0])[0]).split(':')[2] ) != 2:
            daily_time = str((data_1[0])[0])[:-3]
        else:
            daily_time = str((data_1[0])[0]) + '.000'

    if len(data_2) != 0:
        if len( str((data_2[0])[0]).split(':')[2] ) != 2:
            weekly_time = str((data_2[0])[0])[:-3]
        else:
            weekly_time = str((data_2[0])[0]) + '.000'

    if len(data_3) != 0:
        if len( str((data_3[0])[0]).split(':')[2] ) != 2:
            monthly_time = str((data_3[0])[0])[:-3]
        else:
            monthly_time = str((data_3[0])[0]) + '.000'

    model = {
        "daily":daily_time,
        "weekly":weekly_time,
        "monthly":monthly_time
    }

    return jsonify(model)
