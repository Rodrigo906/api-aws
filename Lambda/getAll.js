const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    const params = {
        TableName: process.env.TableName
    };

    return await docClient.scan(params).promise();
};
