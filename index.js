const client = require('./db/connection');

client.query('SELECT * FROM employee', (err, res) => {
    if (err) {
        console.error('Error executing query', err);
    } else {
        console.log(res);
    }
});
