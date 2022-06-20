const e = require('express');
const DYDB= require('./config');

let ddclient = new DYDB.DynamoDB.DocumentClient();

let deleteByKey = function(){
    var params ={
        TableName :"users",
        Key:{
            "email_id":"dude1@gmail.com"
        }
    };

    ddclient.delete(params, function(err,data){
        if(err) console.log("ERRRRRRRRRRR");

        else{
            console.log(`${data} deleted`);
        }
    });
}

deleteByKey();