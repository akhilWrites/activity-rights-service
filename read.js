const a = require('./config');


let docClient = new a.DynamoDB.DocumentClient();

let getOneByKey = function (){
    var params = {
        TableName : "users",
        Key: {
            "email_id":"ththht"
        }
    };

    docClient.get(params, function(err,data){
        if(err) {
            console.log("ERRRRRRRRRRRRRRRRRR");
        }
    
        else{
        console.log(`found ${data.Item} items`);
        console.log(data);
        }
    });
}

getOneByKey();