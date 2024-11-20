# How to run Lambda as a Server (LAAS) Demo project

This is a demo project showcasing how to use AWS Lambda handlers locally as a server using Vite.

It demonstrates how to configure multiple Lambda functions for different HTTP methods and routes in a local development environment.

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- AWS Lambda knowledge is helpful but not required.

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/medvedevden1s/LAAS
    cd LAAS
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```


## Endpoints

| Method | Endpoint         | Description                            |
|--------|-------------------|----------------------------------------|
| POST   | `/v1/posts`       | Create a new blog post                |
| GET    | `/v1/posts/{id}`  | Retrieve a blog post by ID            |
| GET    | `/v1/posts`       | Retrieve all blog posts (v1)          |
| GET    | `/v2/posts`       | Retrieve all blog posts (v2)          |

## Example Requests

### Create a New Blog Post

```bash
curl -X POST http://localhost:8080/v1/posts \
     -H "Content-Type: application/json" \
     -d '{"title": "My First Post", "content": "Hello, World!"}'
```


## License
This project is open-source and available under the MIT License.