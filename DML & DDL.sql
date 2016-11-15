CREATE DATABASE formulario;

use formulario;

CREATE TABLE usertypes(
typeID INT NOT NULL AUTO_INCREMENT,
typename VARCHAR(50) NOT NULL,
PRIMARY KEY (typeID)
);

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
typeID INT NOT NULL,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (typeID) REFERENCES usertypes(typeID)
);

use formulario;

/**insert user types*/
INSERT INTO usertypes(typename)
VALUES('Administrator');
INSERT INTO usertypes(typename)
VALUES('Users');

/**new user*/
INSERT INTO users(typeID, username, password)
VALUES(1, 'Admin','qwerty123');