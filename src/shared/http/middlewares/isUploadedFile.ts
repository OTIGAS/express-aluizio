import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";

interface IUploadFile {
  filename: string;
  fieldname: string;
  originalname: string;
}

function isUploadedFile(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { filename, fieldname, originalname } = req.file as IUploadFile;

  if (!filename || !fieldname || !originalname) {
    throw new AppError("File not found");
  }

  return next();
}

export default isUploadedFile;
