const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const fs = require('fs');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SokoLink API',
      version: '1.0.0',
      description: 'API documentation for SokoLink project',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/models/*.ts',
    './src/routes/*.ts',
  ],
};

console.log('Generating Swagger documentation...');

try {
  const specs = swaggerJsdoc(options);
  
  // Generate YAML
  const yamlString = YAML.stringify(specs, 10);
  fs.writeFileSync(path.join(__dirname, 'swagger.yaml'), yamlString);
  
  console.log('✅ swagger.yaml generated successfully!');
  console.log('📁 File location: ' + path.join(__dirname, 'swagger.yaml'));
} catch (error) {
  console.error('❌ Error generating Swagger docs:', error);
  process.exit(1);
}