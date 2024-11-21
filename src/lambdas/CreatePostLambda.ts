import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const createPostHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log('Incoming request body:', event.body);

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Post created successfully!' }),
    };
};
