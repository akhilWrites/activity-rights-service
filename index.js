const express = require('express');

//create express app

const app = express();

//setup server port

const port = process.env.port || 5000;

//define base url 

app.get('/', (req, res) => {
    res.send("Hello there");
} );

// listen to the port

app.listen(port, ()=>{console.log(`Server Running on ${port}`)});

