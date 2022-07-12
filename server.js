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

//NEEDS TO BE THE LAST ROUTE- OVERRIDES ALL OTHERS
//Default response for any other request (NOT FOUND)
app.use((req,res) => {
    res.status(404).end();
})

//starts the express server on 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})