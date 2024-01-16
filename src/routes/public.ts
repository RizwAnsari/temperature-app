import { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Hello world, this is a Temperature Application.");
});

export default router;
