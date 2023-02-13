CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20), email VARCHAR(100) NOT NULL, 
                    pass_word VARCHAR(250) NOT NULL, user_role VARCHAR(10));
 