import json
import mysql.connector

# ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

# MySQL Configuration

with open('config.json') as f:
    json_data = json.load(f)

mysql_username = json_data['username']
mysql_password = json_data['password']
mysql_host     = json_data['host']
mysql_database = 'puzzleDatabase'

def get_db():
    db = mysql.connector.connect(
        host=mysql_host,
        user=mysql_username,
        passwd=mysql_password,
        database=mysql_database
    )
    return db
