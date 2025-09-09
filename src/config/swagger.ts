// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger configuration options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SokoLink API Documentation",
      version: "1.0.0",
      description: "API documentation for SokoLink project",
      contact: {
        name: "API Support",
        email: "support@sokolink.com"
      }
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server"
      },
      {
        url: "https://api.sokolink.com",
        description: "Production server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/**/*.ts", "./src/models/*.ts"] // Path to your API files
};

// Generate Swagger specs
const specs = swaggerJsdoc(options);

// Setup function to be used in your main app file
export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customSiteTitle: "SokoLink API Documentation",
      swaggerOptions: {
        persistAuthorization: true, // Keep auth token between browser sessions
      }
    })
  );
  
  console.log("Swagger documentation available at /api-docs");
};