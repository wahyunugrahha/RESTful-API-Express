import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path"; // Import path module

export const web = express();
web.use(express.json());

// Load Swagger YAML file
// Use path.resolve to ensure correct path regardless of current working directory
const swaggerDocument = YAML.load(path.resolve('./docs/swagger.yaml'));

// Serve Swagger UI at /api-docs
web.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);