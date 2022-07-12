const express = require('express');

const PORT = process.env.PORT || 8002;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//NEEDS TO BE THE LAST ROUTE- OVERRIDES ALL OTHERS
//Default response for any other request (NOT FOUND)
app.use((req,res) => {
    res.status(404).end();
})

//starts the express server on 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})