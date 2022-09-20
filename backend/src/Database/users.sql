--USERS TABLE


 CREATE TABLE users(id VARCHAR(100) NOT NULL,username VARCHAR(100)UNIQUE,email VARCHAR(200) UNIQUE,password VARCHAR(200),role VARCHAR(100) DEFAULT 'user', welcome VARCHAR(50) DEFAULT 0

 )

 --REGISTER USERS

 CREATE PROCEDURE insertUsers(@id VARCHAR(100), @username VARCHAR(100), @email VARCHAR(100), @password VARCHAR(200))
AS
BEGIN
INSERT INTO users(id,username,email,password) VALUES (@id,@username,@email,@password)

END

--GET ALL USERS
CREATE PROCEDURE getUsers
   AS
   BEGIN
   SELECT * FROM users
   END


--GET ONE USER
CREATE PROCEDURE getUser(@email VARCHAR(200))
AS
BEGIN
SELECT * FROM users WHERE email =@email
END   
