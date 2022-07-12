const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 8002;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CONNECTS to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MySQL username,
        user: 'root',
        //Your MYSQL password
        password: 'RenRosenthal28',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

//query the database to test connection
//EXPLANATION IN 12.2.4
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

//returns a single candidate
db.query(`SELECT * FROM candidates WHERE id=1`, (err,row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

//Deletes a candidate
// db.query(`DELETE FROM candidates WHERE id=?`,1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// })

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
VALUES (?, ?, ?, ?)`;
//ABOVE ... the ?'s are placeholders
//values must match the values in params, thats why we use an array
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
})

//NEEDS TO BE THE LAST ROUTE- OVERRIDES ALL OTHERS
//Default response for any other request (NOT FOUND)
app.use((req,res) => {
    res.status(404).end();
})

//starts the express server on 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})