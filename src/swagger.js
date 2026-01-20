const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca',
      version: '1.0.0',
      description: 'Documentación de la API de la biblioteca'
    },
    servers: [
      {
        url: 'http://localhost:3006'
      }
    ]
  },
  apis: ['./src/routes/*.js'], // donde Swagger va a leer los comentarios
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;