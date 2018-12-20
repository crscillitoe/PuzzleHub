def install_tables(db):
    sql_query = '''
        CREATE TABLE IF NOT EXISTS timers
        (
            UserID INT NOT NULL,
            GameID INT NOT NULL,
            Difficulty INT NOT NULL,
            TimeStarted DateTime NOT NULL
        );

        CREATE TABLE IF NOT EXISTS games
        (
            GameID INT NOT NULL AUTO_INCREMENT,
            GameName VARCHAR(50)
        );

        CREATE TABLE IF NOT EXISTS users
        (
            UserId INT NOT NULL AUTO_INCREMENT,
            Username VARCHAR(16) NOT NULL,
            Email VARCHAR(254) NOT NULL,
            Password VARCHAR(255) NOT NULL,
            Validated BIT NOT NULL DEFAULT 0,
            PRIMARY KEY (UserId)
        );

        CREATE TABLE IF NOT EXISTS validations
        (
            UserId INT NOT NULL,
            ValId VARCHAR(128) NOT NULL
            PRIMARY KEY (UserId) 
        );

        CREATE TABLE IF NOT EXISTS difficulties
        (
            DiffId INT NOT NULL,
            DiffName VARCHAR(16) NOT NULL
        );
    '''
