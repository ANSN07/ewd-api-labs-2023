import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from './src/config/dependencies';
import createMoviesRouter from './src/movies/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from './logger';

dotenv.config();
db.init();
const app = express();
const dependencies = buildDependencies();

const port = process.env.PORT;
app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use(errorHandler);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API with Swagger",
            version: "1.0.0",
            description:
                "Movies API application with Swagger documentation",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/*/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }) //search bar is added when explorer is set to true
);

app.listen(port, () => {
    logger.info(`Server running at ${port}`);
});
