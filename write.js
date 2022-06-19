const d = require('./config');


let dc = new d.DynamoDB.DocumentClient();

let save = function (){
    var input = {
        "email_id":"dude1@gmail.com",
        "created_on": new Date().toString(),
        "is_deleted":false
    }
    var params ={
        TableName : "users",
        Item: input
    }

    dc.put( params, function(err,data){
        if(err) console.log("ERRRRRRRRRRRRRRRRRRRRRRR");
        else{
            console.log(`FOund ${data.Item} items`);
            console.log(data);
        }
    });


}

save();