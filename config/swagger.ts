import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

const envFound = dotenv.config();
const PORT = process.env.PORT;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rindus App APIs',
      version: '1.0.0',
      description: 'API documentation Rindus project',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export default swaggerOptions;
