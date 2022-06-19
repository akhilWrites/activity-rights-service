var aws = require('aws-sdk');

let awsCOnfig= {
    "region":"ap-south-1",
    "endpoint":"http://dynamodb.ap-south-1.amazonaws.com"
}

aws.config.update(awsCOnfig);


module.exports =  aws;