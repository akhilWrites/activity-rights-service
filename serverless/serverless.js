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
      default:
        response = buildResponse(404, 'Content not found');
    }
    return response;
  };

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