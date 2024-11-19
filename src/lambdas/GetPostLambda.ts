import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const getPostHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({ id: '1', title: 'Sample Post', content: 'This is a sample post.' }),
    };
};
