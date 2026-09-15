import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clinic API",
      version: "1.0.0",
      description:
        "API para gerenciamento de consultas médicas, com autenticação JWT e controle de acesso por papel (PACIENTE, MEDICO, ADMIN)",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/dtos/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
