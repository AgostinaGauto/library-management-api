// este archivo configura swagger para 
// documentar la api, mostrar los endpoints en una web,
// permitir probarlos (GET, POST, PUT, DELETE),
// y usar JWT con authorization: bearer

const swaggerJSDoc = require('swagger-jsdoc'); // importa la libreria que lee comentarios especiales y genera un Json openapi

const options = { // contiene toda la configuracion de swagger
  definition: { 
    openapi: '3.0.0', // indica que usamos la version moderna de swagger
    info: { // informacion visible en Swagger UI
      title: 'API Biblioteca',
      version: '1.0.0',
      description: 'Documentación de la API'
    },
    servers: [
      {
        url: 'http://localhost:3006' // indica donde corre nuestra api
      }
    ],
    components: { // le dice a swagger que usamos autenticacion Bearer, el token es un JWT
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [ // seguridad global. Todas las rutas requieren token, a menos que se indique lo contrario
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // lee todos los archivos de la carpeta routes. Busca comentarios tipo @swagger
                               // y genera la documentacion automaticamente
};

module.exports = swaggerJSDoc(options);