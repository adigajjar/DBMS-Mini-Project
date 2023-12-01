use login;
CREATE USER 'admin'@'localhost' IDENTIFIED BY "admin_user";
GRANT SELECT, INSERT, UPDATE, DELETE ON login.* TO 'admin'@'localhost';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'user_';
GRANT SELECT, INSERT, UPDATE ON login.* TO 'user'@'localhost';

