var aws = require('aws-sdk');

let awsCOnfig= {
    "region":"ap-south-1",
    "endpoint":"http://dynamodb.ap-south-1.amazonaws.com"
};

aws.config.update(awsCOnfig);

let dc = new aws.DynamoDB.DocumentClient();

exports.handler = async function(event) {
    console.log('Request event: ', event);
    let response;
    switch(true) {
      case event.requestContext.http.method === 'GET' && event.requestContext.http.path === "/health":
        response = buildResponse(200 , event);
        break;
      case event.requestContext.http.method === 'POST' && event.requestContext.http.path==="/activityRights":
        response = await createActivityRight(JSON.parse(event.body));
        break;
      case event.requestContext.http.method === 'GET' && event.requestContext.http.path=== "/activityRight":
        response = await getActivityRight(event.queryStringParameters.email);
        break;
      case event.requestContext.http.method === 'DELETE' && event.requestContext.http.path==="/activityRight":
        response = await deleteActivityRight(JSON.parse(event.body).email_id);
        break;

      default:
        response = buildResponse(404, 'Content not found');
    }
    return response;
  };

  async function deleteActivityRight(email){
    var params ={
        TableName :"users",
        Key:{
            "email_id": email
        }
    };
    return await dc.delete(params).promise().then( (response) =>{
        const body ={
            statusCode: 200,
            Message: 'Succesfully deleted the object in the database',
            data : [response.Item]
        };
        return buildResponse(200, body);
    }, (error) =>{
        console.error("Error found",error);
    });
  }

  async function getActivityRight(email){
    var params = {
        TableName : "users",
        Key: {
            "email_id":email
        }
    };
    return await dc.get(params).promise().then( (response )=> {
        console.log(response);
        if(Object.keys(response).length ===0) {
            return buildResponse(400, `Email-${email} doesn't exists`);
        }
        else{
            return buildResponse(200, response.Item);
        }

    }, (err) =>{
        console.error("Error received", err);
    });
  }

  function buildResponse(statusCode, event){
    return{
        statusCode:statusCode,
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(event)
    };
  }

  async function createActivityRight(requestBody){
    var params ={
        TableName : "users",
        Item: requestBody
    };

    return await dc.put(params).promise().then( () =>{
        const body = {
            statusCode: 201,
            Message: 'Succesfully saved the object in the database',
            data : [requestBody]
          };
          return buildResponse(201, body);
    }, (error) =>{
        console.error("Error received.....", error);
    });

  }