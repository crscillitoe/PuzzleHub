USE puzzleDatabase

CREATE TABLE IF NOT EXISTS users
(
    UserId INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(16) NOT NULL,
    Email VARCHAR(254) NOT NULL,
    Password VARCHAR(255) NOT NULL,         /* TODO: change length based on hash function */
    Validated BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (UserId)
);
