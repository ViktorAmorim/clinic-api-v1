import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.DB_PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
