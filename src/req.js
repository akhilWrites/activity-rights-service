const { json } = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


console.log(`HELLO ${process.env.HEALTH_CHECK}`);


exports.handler = async function(event) {
    console.log('Request event: ', event);
    let response;
    switch(true) {
      case event.requestContext.http.method === 'GET' && event.requestContext.http.path === process.env.HEALTH_CHECK:
        response = buildResponse(200 , event.body);
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