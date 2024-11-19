import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const getAllPostsV1Handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify([
            { id: '1', title: 'First Post', content: 'Content of the first post.' },
            { id: '2', title: 'Second Post', content: 'Content of the second post.' },
        ]),
    };
};
