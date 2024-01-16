import { Router, Request, Response } from "express";
import * as AuthController from "../controllers/AuthController";

const router = Router();

router.get(
  "/generate-token",
  async (req: Request, res: Response) => await AuthController.token(req, res)
);

export default router;
