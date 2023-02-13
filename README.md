DATABASE PORT IS 5432
BACKEND PORT IS 7000

---

INSTRUCTIONS :-
1- first change user and password of postgres according to your device in .env and database.json files
2- create database and put name of it in .env and database.json files
3- run migrations to create tables

---

Structure :-
build --> consist of compiled ts files to js after building
DB --> consist of database connection and models
middleware --> consist of authentication and validation functions separeted
migrations --> consist of migrations of creating DB schemas
modules --> consist of folder for each model that have
(controller that have functions - routes that have routes of model - validation that have all validation schemas)
routes --> that have all routes before using in main file
spec --> this have jasmine configration
tests --> have helpers of jasmine and specs of testing

---

environment variables:-
PORT --> port of server
SALT --> hasing salt
PEPPER --> hashing pepper
TOKEN_KEY --> token secret key
ENV --> which database is working
DB_HOST --> host of database (localhost)
DB_NAME --> name of development database
DB_NAME_TEST --> name of test database
DB_USER --> username of postgres
DB_PASSWORD --> password of postgres

---

Scripts involved :-
format --> to apply prettier options and modify code style
lint --> to check syntax and provide errors if exist
build --> to build ts files to js
test --> to test it with jasmine
start --> starts the app

---

Endpoints involved :-
GET http://localhost:7000/api/user/ --> gets all users
require token

GET http://localhost:7000/api/user/:id --> gets speceific user
require parameter(id) and token

POST http://localhost:7000/api/user/ --> add user
require token and body with firstname-lastname-email-password

POST http://localhost:7000/api/user/login --> authenticate user
require body with email-password

GET http://localhost:7000/api/product/ --> gets all products

GET http://localhost:7000/api/product/:id --> gets speceific product
require parameter(id)

POST http://localhost:7000/api/product/ --> add product
require token

GET http://localhost:7000/api/order/ --> gets all orders

GET http://localhost:7000/api/order/:id/product --> gets products of speceific order
require parameter(id of product) and token

POST http://localhost:7000/api/order/:id/product --> add product to speceific order
require parameter(id of product) and token

---

Middlewares :-
in this app there are two middlewares:
1- Validation --> this validates schemas to requests
2- Authorization --> this authorize user that making the request
