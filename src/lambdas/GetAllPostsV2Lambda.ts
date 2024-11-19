import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const getAllPostsV2Handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify([
            { id: '1', title: 'First Post (V2)', content: 'Enhanced content of the first post.' },
            { id: '2', title: 'Second Post (V2)', content: 'Enhanced content of the second post.' },
        ]),
    };
};
