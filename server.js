const express = require('express');
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 8002;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);


//NEEDS TO BE THE LAST ROUTE- OVERRIDES ALL OTHERS
//Default response for any other request (NOT FOUND)
app.use((req, res) => {
    res.status(404).end();
  });

//starts the express server on 3001
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });