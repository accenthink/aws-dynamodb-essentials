const AWS = require('aws-sdk');

module.exports.instance = (options) => {
    if(options){
        AWS.config.update(options);
    }

    return new AWS.DynamoDB();
}