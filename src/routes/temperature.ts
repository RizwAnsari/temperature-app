import { Router, Request, Response } from "express";
import * as TempController from "../controllers/TemperatureController";
import auth from "../middlewares/auth";
import upload from "../configs/multer";

const router = Router();

router.get(
  "/city/:id",
  auth,
  async (req: Request, res: Response) =>
    await TempController.cityStats(req, res)
);

router.post(
  "/upload",
  [auth, upload.single("file")],
  async (req: Request, res: Response) =>
    await TempController.bulkInsert(req, res)
);

export default router;
