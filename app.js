require('dotenv').config()
const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//ROUTES
const indexRouter = require('./app/routes/index');
const productsRouter = require('./app/routes/products');
const brandsRouter = require('./app/routes/brands');
const usersRouter = require('./app/routes/users');
const authRouter = require('./app/routes/auth');

app.use('/', indexRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/brands', brandsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

const swaggerURL = process.env.HOST_URL + ":" + (process.env.PORT || 3000);

//Swagger config
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Sistema productos Express API with Swagger",
            version: "1.0.0",
            description:
                "Aplicación mediante API con Express y documentación en Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Gerardo Gomez",
                url: "",
                email: "gomez.gergil@email.com",
            },
        },
        servers: [
            {
                url: swaggerURL,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./app/routes/*.js"],
};

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(options), { explorer: true })
);

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});