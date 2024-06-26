import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";
import routes from "./routes";

import "@shared/typeorm";

import AppError from "@shared/errors/AppError";
import { errors } from "celebrate";

import uploadConfig from "@config/upload";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/files", express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
