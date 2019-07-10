from api import app
from flask import abort
from flask import request
from flask_cors import cross_origin
from flask import jsonify
from api.database import get_db
from api.auth import get_user_id

xstr = lambda s: s or ""

def calculate_xp_reward(length, difficulty):
    return (length * 200) * (difficulty * difficulty)

@app.route('/api/getDailyChallenges', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_daily_challenges():
    db = get_db()
    cursor = db.cursor()
    sql_query = '''
        SELECT Length, Relay, Difficulty FROM dailyChallenges
    '''

    cursor.execute(sql_query)
    data = cursor.fetchall()

    challenges = []
    for d in data:
        model = {
            "Length":d[0],
            "Relay":d[1],
            "Difficulty":d[2],
            "XPReward":calculate_xp_reward(d[0], d[2])
        }
        challenges.append(model)
    
    cursor.close()
    return jsonify(challenges)

@app.route('/api/getCompletedDailyChallenges', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_completed_daily_challenges():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return '-1'
    except:
        return '-1'

    db = get_db()
    cursor = db.cursor()
    sql_query = '''
        SELECT Difficulty FROM dailyChallengesCompleted
        WHERE UserID = %(user_id)s
    '''

    query_model = {
        "user_id": user_id
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()
    cursor.close()

    completed = []
    for d in data:
        completed.append(d[0])

    return jsonify(completed)


@app.route('/api/completeDailyChallenge', methods=['POST'])
@cross_origin(supports_credentials=True)
def complete_daily_challenge():
    try:
        user_id = get_user_id(xstr(request.headers.get('PuzzleHubToken')))
        if user_id == -1:
            return '-1'
    except:
        return '-1'

    try:
        difficulty = request.json["Difficulty"]
    except:
        abort(500, "difficulty not found")

    db = get_db()
    cursor = db.cursor()
    sql_query = '''
        SELECT Length, Relay, Difficulty
        FROM dailyChallenges
        WHERE Difficulty = %(difficulty)s
    '''

    query_model = {
        "difficulty": difficulty
    }

    cursor.execute(sql_query, query_model)
    data = cursor.fetchall()

    length = (data[0])[0]
    difficulty = (data[0])[2]

    xp_reward = calculate_xp_reward(length, difficulty)

    query_model = {
        "difficulty": difficulty,
        "user_id": user_id,
        "xp_reward": xp_reward
    }

    cursor.close()

    cursor = db.cursor()
    sql_query = '''
        INSERT INTO dailyChallengesCompleted
        (UserID, Difficulty)
        VALUES (%(user_id)s, %(difficulty)s)
    '''
    cursor.execute(sql_query, query_model)
    cursor.close()

    cursor = db.cursor()
    if difficulty == 1:
        sql_query = '''
        UPDATE accountData
        SET XP = XP + %(xp_reward)s,
            EasyDailiesCompleted = EasyDailiesCompleted + 1
        WHERE UserID = %(user_id)s
        '''
    elif difficulty == 2:
        sql_query = '''
        UPDATE accountData
        SET XP = XP + %(xp_reward)s,
            MediumDailiesCompleted = MediumDailiesCompleted + 1
        WHERE UserID = %(user_id)s
        '''
    elif difficulty == 3:
        sql_query = '''
        UPDATE accountData
        SET XP = XP + %(xp_reward)s,
            HardDailiesCompleted = HardDailiesCompleted + 1
        WHERE UserID = %(user_id)s
        '''
    elif difficulty == 4:
        sql_query = '''
        UPDATE accountData
        SET XP = XP + %(xp_reward)s,
            ExtremeDailiesCompleted = ExtremeDailiesCompleted + 1
        WHERE UserID = %(user_id)s
        '''

    cursor.execute(sql_query, query_model)
    cursor.close()

    db.commit()
    
    return jsonify({"success":True})