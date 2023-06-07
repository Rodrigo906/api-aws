const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const id = parseInt(event.pathParameters.id);

    const queryParams = {
        TableName: 'users',
        Key: { id: id }
    };

    try {
        const existingItem = await docClient.get(queryParams).promise();

        if (!existingItem.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'El usuario no existe' })
            };
        }

        await docClient.delete(queryParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Usuario eliminado exitosamente' })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar el usuario' })
        };
    }
};