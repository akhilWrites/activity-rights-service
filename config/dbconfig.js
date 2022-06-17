const mySql = require('mysql');



// create a connection

const db =mySql.createConnection({
    host :'localhost',user:'root',password:'12345', database: 'simple', port:3310
});

db.connect(function(error){
    if(error) throw error;
    console.log('Connected.......')
})

module.exports= db;
