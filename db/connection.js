 const { Client } = require('pg');

 const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'mypassword',
    port: 5432,
 });

 client.connect();

 module.exports = client;