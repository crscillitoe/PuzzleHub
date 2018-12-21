from api import app
from flask import jsonify
from flask import request
from flask_cors import cross_origin
from datetime import datetime
from api.database import get_db

# ============================================================ #

# TODO - /startTimer
# Required POST parameters:
#   GameID: int
#   Difficulty: int
# Returns on success:
#   Returns puzzle seed for given game id and difficulty
# Returns on failure:
#   -1

@app.route('/startTimer', methods=['POST'])
# TODO: remove before moving to production
@cross_origin(supports_credentials=True)

def start_timer():

    db = get_db()

    if (start_timer_sanity_checks(db, request.form) != 0):
        return '-1'

    # TODO: extract user_id from encrypted token sent with request
    # Compile values for new timer entry
    game_id = request.form["GameID"]
    difficulty = request.form["Difficulty"]
    user_id = "1"
    new_timer = {
        "user_id":user_id,
        "game_id":game_id,
        "difficulty":difficulty,
        "time_started":datetime.utcnow()
    }

    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM timers WHERE 
            UserID=%(user_id)s AND 
            GameID=%(game_id)s AND 
            Difficulty=%(difficulty)s;
    '''
    cursor.execute(sql_query, new_timer);
    data = cursor.fetchall()
    cursor.close()
    
    # entry does not already exist in timers db, so create it
    if len(data) == 0:

        cursor = db.cursor()
        sql_query = '''
            INSERT INTO timers (UserID, GameID, Difficulty, TimeStarted)
            VALUES (%(user_id)s, %(game_id)s, %(difficulty)s, %(time_started)s);
        '''
        cursor.execute(sql_query, new_timer)
        db.commit()
        cursor.close()

        return jsonify(cursor.lastrowid)

    else:

        cursor = db.cursor()
        sql_query = '''
            UPDATE timers SET TimeStarted=%(time_started)s WHERE 
                UserID=%(user_id)s AND
                GameID=%(game_id)s AND
                Difficulty=%(difficulty)s;        
        '''
        cursor.execute(sql_query, new_timer)
        db.commit()
        cursor.close()

        return jsonify(cursor.lastrowid)

# ------------------------------------------------------------ #

def start_timer_sanity_checks(db, form_values):

    # GameID sanity check
    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM games WHERE GameID=%(GameID)s;
    '''
    cursor.execute(sql_query, form_values)
    data = cursor.fetchall()
    if len(data) == 0:
        return 1
    cursor.close()

    # Difficulty sanity check
    cursor = db.cursor()
    sql_query = '''
        SELECT * FROM difficulties WHERE Difficulty=%(Difficulty)s;
    '''
    cursor.execute(sql_query, request.form)
    data = cursor.fetchall()
    if len(data) == 0:
        return 1
    cursor.close()

    return 0

# ------------------------------------------------------------ #
