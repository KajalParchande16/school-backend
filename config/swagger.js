import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "School Management API",
            version: "1.0.0",
            description: "API documentation for School Project"
        },
        servers: [
            {
                url: "https://school-backend-1-9syr.onrender.com",
                description: "Live Server"
            },
            {
                url: "http://localhost:4000",
                description: "Local Server"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };