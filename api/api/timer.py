from api import app
from flask import jsonify
from flask_cors import cross_origin
from api.database import get_db

# TODO - /startTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   Returns puzzle for given game id and difficulty
# Returns on failure:
#   0
@app.route('/startTimer', methods=['POST'])
@cross_origin(supports_credentials=True)
def start_timer():
    db = get_db()
    cursor = db.cursor()

    # GameID sanity check
    sql_query = '''
        SELECT * FROM games WHERE GameID=%(GameID)s;
    '''
    cursor.execute(sql_query, request.form)
    db.commit()
    data = cursor.fetchall()
    if len(data) == 0:
        return '0'
    game_id = request.forms["GameID"]

    # Difficulty sanity check
    sql_query = '''
        SELECT * FROM difficulty WHERE Difficulty=%(Difficulty)s;
    '''
    cursor.execute(sql_query, request.form)
    db.commit()
    data = cursor.fetchall()
    if len(data) == 0:
        return '0'
    difficulty = request.forms["Difficulty"]

    # TODO: extract user_id from encrypted token sent with request
    user_id = "1"

    # Compile values for new timer entry and insert it into the timers table
    new_timer = {
        "user_id":user_id,
        "game_id":game_id,
        "difficulty":difficulty,
        "time_started":datetime.utcnow()
    }

    sql_query = '''
        INSERT INTO timers (UserID, GameID, Difficulty, TimeStarted)
        VALUES (%(user_id)s, %(game_id)s, %(difficulty)s, %(time_started)s);
    '''
    cursor.execute(sql_query, new_timer)
    db.commit()

    return jsonify(cursor.lastrowid)
