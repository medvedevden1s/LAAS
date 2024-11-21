import { defineConfig } from 'vite';
import { createPostHandler } from './src/lambdas/CreatePostLambda';
import { getPostHandler } from './src/lambdas/GetPostLambda';
import { getAllPostsV1Handler } from './src/lambdas/GetAllPostsV1Lambda';
import { getAllPostsV2Handler } from './src/lambdas/GetAllPostsV2Lambda';

// Utility function to read the body from the request
const readRequestBody = (req: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: any) => {
            body += chunk;
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (error: any) => {
            reject(error);
        });
    });
};

export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        {
            name: 'lambda-invoker',
            configureServer(server) {
                server.middlewares.use(async (req, res) => {
                    const url = new URL(req.url || '', `http://${req.headers.host}`);
                    const path = url.pathname;
                    const method = req.method;

                    try {
                        const body = await readRequestBody(req);

                        const event = {
                            body,
                            httpMethod: method,
                            path,
                            headers: req.headers,
                            queryStringParameters: Object.fromEntries(url.searchParams.entries()),
                        };

                        let result;

                        switch (true) {
                            case method === 'POST' && path === '/v1/posts':
                                result = await createPostHandler(event as any, {} as any);
                                break;

                            case method === 'GET' && /^\/v1\/posts\/[^/]+$/.test(path):
                                result = await getPostHandler(event as any, {} as any);
                                break;

                            case method === 'GET' && path === '/v1/posts':
                                result = await getAllPostsV1Handler(event as any, {} as any);
                                break;

                            case method === 'GET' && path === '/v2/posts':
                                result = await getAllPostsV2Handler(event as any, {} as any);
                                break;

                            default:
                                res.statusCode = 404;
                                res.setHeader('Content-Type', 'application/json');
                                return res.end(JSON.stringify({ message: 'Not Found' }));
                        }

                        res.statusCode = result?.statusCode || 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(result?.body || JSON.stringify({ message: 'Internal Server Error' }));
                    } catch (error) {
                        console.error('Error processing request:', error);
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
                    }
                });
            },
        },
    ],
    optimizeDeps: {
        include: [],
    },
});
