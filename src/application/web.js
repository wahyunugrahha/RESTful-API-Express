// src/application/web.js
import express from 'express';
import {publicRouter} from '../route/public-api.js';
import {userRouter} from '../route/api.js';
import {errorMiddleware} from '../middleware/error-middleware.js';
import swaggerUi from 'swagger-ui-express'; // Tambahkan ini
import YAML from 'yamljs'; // Tambahkan ini
import path from 'path'; // Tambahkan ini

const web = express();
web.use(express.json());

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.resolve('docs', 'swagger.yaml')); // Sesuaikan path jika perlu

// Serve Swagger UI
web.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Ini adalah rute untuk Swagger UI

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

export {
    web
};