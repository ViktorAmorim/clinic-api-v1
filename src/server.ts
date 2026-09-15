import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on  http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
