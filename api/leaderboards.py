from api import app
from flask import abort
from flask import request
from flask_cors import cross_origin
from flask import jsonify
from api.database import get_db
from api.auth import get_user_id

xstr = lambda s: s or ""

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
# /getProfileData
# Required POST parameters:
#   Username: string
# Returns on success:
#   DailyGoldMedals: int
#   DailySilverMedals: int
#   DailyBronzeMedals: int
#   WeeklyGoldMedals: int
#   WeeklySilverMedals: int
#   WeeklyBronzeMedals: int
#   MonthlyGoldMedals: int
#   MonthlySilverMedals: int
#   MonthlyBronzeMedals: int
#   MatchHistory: List(length 10) <
#       GameID: int
#       Difficulty: int
#       TimeCompleted: time-string
#       Time: time-string
#       Seed: int
#   >
# Returns on failure:
#   No return, throw error on failure.
@app.route('/api/getProfileData', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_profile_data():
    try:
        username = request.json["Username"]
    except:
        abort(500, "Username not found")

    db = get_db()

    cursor = db.cursor()
    sql_query = '''
        SELECT MH.GameID, MH.Difficulty, MH.Date AS TimeCompleted, MH.TimeElapsed AS Time, MH.Seed
        FROM users AS U
            INNER JOIN matchHistory AS MH
            ON U.UserID = MH.UserID
        WHERE U.Username = %(username)s
        LIMIT 10
    '''
    query_model = {
        "username":username
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    match_history = []
    for d in data:
        if len( str(d[3]).split(':')[2] ) != 2:
            model = {
                "GameID":d[0],
                "Difficulty":d[1],
                "TimeCompleted":str(d[2]),
                "TimeElapsed": str(d[3])[:-3],
                "Seed":d[4]
            }
            match_history.append(model)
        else :
            model = {
                "GameID":d[0],
                "Difficulty":d[1],
                "TimeCompleted":str(d[2]),
                "TimeElapsed": str(d[3]) + '.000',
                "Seed":d[4]
            }
            match_history.append(model)

    cursor.close()

    cursor = db.cursor()
    sql_query = '''
    SELECT M1.BronzeMedals AS DailyBronzeMedals,
           M2.BronzeMedals AS WeeklyBronzeMedals,
           M3.BronzeMedals AS MonthlyBronzeMedals,
           M1.SilverMedals AS DailySilverMedals,
           M2.SilverMedals AS WeeklySilverMedals,
           M3.SilverMedals AS MonthlySilverMedals,
           M1.GoldMedals   AS DailyGoldMedals,
           M2.GoldMedals   AS WeeklyGoldMedals,
           M3.GoldMedals   AS MonthlyGoldMedals
        FROM users AS U
        INNER JOIN userMedals AS M1
            ON M1.UserID = U.UserID AND
                M1.Type = 0
        INNER JOIN userMedals AS M2
            ON M2.UserID = U.UserID AND
                M2.Type = 1
        INNER JOIN userMedals AS M3
            ON M3.UserID = U.UserID AND
                M3.Type = 2
        WHERE U.Username = %(username)s
    '''

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()
    d = data[0]

    to_return = {
        "DailyGoldMedals":d[6],
        "DailySilverMedals":d[3],
        "DailyBronzeMedals":d[0],
        "WeeklyGoldMedals":d[7],
        "WeeklySilverMedals":d[4],
        "WeeklyBronzeMedals":d[1],
        "MonthlyGoldMedals":d[8],
        "MonthlySilverMedals":d[5],
        "MonthlyBronzeMedals":d[2],
        "MatchHistory":match_history
    }

    return jsonify(to_return)

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
            SELECT Username, TimeElapsed, Role, BronzeMedals, SilverMedals, GoldMedals
            FROM dailyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            INNER JOIN userMedals AS UM ON
            UM.UserID = L.UserID AND
            UM.Type = 0
            WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
            ORDER BY TimeElapsed
            LIMIT 25
        '''
    elif leaderboard == 1:
        sql_query = '''
            SELECT Username, TimeElapsed, Role, BronzeMedals, SilverMedals, GoldMedals
            FROM weeklyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            INNER JOIN userMedals AS UM ON
            UM.UserID = L.UserID AND
            UM.Type = 1
            WHERE GameID = %(game_id)s AND Difficulty = %(difficulty)s
            ORDER BY TimeElapsed
            LIMIT 25
        '''
    elif leaderboard == 2:
        sql_query = '''
            SELECT Username, TimeElapsed, Role, BronzeMedals, SilverMedals, GoldMedals
            FROM monthlyLeaderboards AS L
            INNER JOIN users AS U ON
            U.UserID = L.UserID
            INNER JOIN userMedals AS UM ON
            UM.UserID = L.UserID AND
            UM.Type = 2
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
                "role":str(d[2]),
                "bronzeMedals":d[3],
                "silverMedals":d[4],
                "goldMedals":d[5]
            }
            to_return.append(model)
        else :
            model = {
                "username":d[0],
                "time":str(d[1]) + '.000',
                "role":str(d[2]),
                "bronzeMedals":d[3],
                "silverMedals":d[4],
                "goldMedals":d[5]
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
