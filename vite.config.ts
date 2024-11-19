import { defineConfig } from 'vite';
import { createPostHandler } from './src/lambdas/CreatePostLambda';
import { getPostHandler } from './src/lambdas/GetPostLambda';
import { getAllPostsV1Handler } from './src/lambdas/GetAllPostsV1Lambda';
import { getAllPostsV2Handler } from './src/lambdas/GetAllPostsV2Lambda';

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

                    let result;

                    switch (true) {
                        case method === 'POST' && path === '/v1/posts':
                            result = await createPostHandler({} as any, {} as any);
                            break;

                        case method === 'GET' && /^\/v1\/posts\/[^/]+$/.test(path):
                            result = await getPostHandler({} as any, {} as any);
                            break;

                        case method === 'GET' && path === '/v1/posts':
                            result = await getAllPostsV1Handler({} as any, {} as any);
                            break;

                        case method === 'GET' && path === '/v2/posts':
                            result = await getAllPostsV2Handler({} as any, {} as any);
                            break;

                        default:
                            res.statusCode = 404;
                            return res.end(JSON.stringify({ message: 'Not Found' }));
                    }

                    res.statusCode = result?.statusCode || 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(result?.body || JSON.stringify({ message: 'Internal Server Error' }));
                });
            },
        },
    ],
    optimizeDeps: {
        include: [],
    },
});
