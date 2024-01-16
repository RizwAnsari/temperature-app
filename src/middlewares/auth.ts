import { Request, Response, NextFunction } from "express";
import * as AuthController from "../controllers/AuthController";
import { response } from "../utils/helpers";

export default async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthController.verify(req, res);
  if (!result.success) {
    return response(
      res,
      result.message,
      result.success,
      result.data,
      result.status
    );
  }
  return next();
};
