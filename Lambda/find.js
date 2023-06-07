const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    let id = parseInt(event.pathParameters.id);
    
    const params = {
        TableName: process.env.TableName,
        KeyConditionExpression: 'id = :value',
        ExpressionAttributeValues: {
            ':value': id
        }
    };
    
    return {
        statusCode: 200,
        body: JSON.stringify(await docClient.query(params).promise())
    }
};