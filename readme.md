## install DB
==================================
Read docs/db/readme.txt

cd to docs/db
#mysql -uroot -pyour_passwd

### install production db
mysql> create database rental;
mysql> use rental;
mysql> \. schema.sql

### install testing db
mysql> create database rental_test;
mysql> use rental_test;
mysql> \. schema.sql

## start server
==================================
$cd server
$npm install
$node server.8800.js

http://localhost:8800/#/


