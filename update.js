const DYNAMODB = require('./config');


let DC =  new DYNAMODB.DynamoDB.DocumentClient();


let modify = function(){
    var params = {
        TableName: "users",
        Key: { "email_id": "akhil.kanduri179@gmail.com" },
        UpdateExpression: "set updated_by = :byUser, is_deleted = :boolValue, seq = :updateSeq, fname = :updateFName, name =  :updateName",
        ExpressionAttributeValues: {
            ":byUser": "updateUser2",
            ":boolValue": false,
            ":updateSeq" :3,
            ":updateFName": "akhil",
            ":updateName" : "A"
            
        },
        ReturnValues: "UPDATED_NEW"

    };

    DC.update(params, function(err, data){
        if(err) console.log("ERRRRRRRRRRRR");

        else{
            console.log(data);
        }
    });
    
}

modify();
