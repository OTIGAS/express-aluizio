import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("JWT token is missing.");
  }

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token.");
  }
}

export default isAuthenticated;
