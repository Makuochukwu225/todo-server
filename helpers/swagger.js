const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Replace with your server URL
            },
            {
                url: 'https://todo-server-lyi9.onrender.com',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'https',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, to specify that it's a JWT
                },
            },
            schemas: {
                Note: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the note',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the note',
                        },
                        content: {
                            type: 'string',
                            description: 'Content of the note',
                        },
                        user: {
                            type: 'string',
                            description: 'ID of the user who created the note',
                        },
                    },
                    required: ['title', 'content'],
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Apply this security scheme globally to all routes
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI available at /api-docs');
};

module.exports = setupSwagger;
