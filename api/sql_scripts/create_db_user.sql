CREATE USER 'puzzleHub'@'localhost' IDENTIFIED BY 'ch4nge_m3!';
CREATE DATABASE puzzleDatabase;
GRANT ALL ON puzzleDatabase.* TO 'puzzleHub'@'localhost';
