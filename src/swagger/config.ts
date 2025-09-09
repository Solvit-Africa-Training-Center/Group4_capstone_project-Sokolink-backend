import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sokolink API',
    version: '1.0.0',
    description: 'API documentation for Sokolink application',
    contact: {
      name: 'Development Team',
      email: 'dev@sokolink.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
    {
      url: 'http://localhost:5500/api',
      description: 'Docker development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/swagger/paths/*.yaml', './src/swagger/schemas/*.yaml'],
};

export const swaggerSpec = swaggerJsdoc(options);