import "reflect-metadata";
import 'express-async-errors'
import express, { NextFunction, Request, response, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";

import "./shared/container";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    console.error(err.stack);
    return res.status(err.statusCode).json({ message: err.message });
  }

  return response
    .status(500)
    .json({
      status: "Error",
      message: `Internal server error - ${err.message}`,
    });
});

app.listen(3333, () => {
  console.log("server is running");
});
