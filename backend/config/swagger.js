const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API',
      version: '1.0.0',
      description: 'API documentation for the backend services',
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: [__dirname + '/../routes/*.js', __dirname + '/../controllers/*.js', __dirname + '/../services/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
