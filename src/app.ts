import express, { Express, Request, Response } from "express";
import * as AuthController from "./controllers/AuthController";
import * as TempController from "./controllers/TemperatureController";
import upload from "./configs/multer";
import auth from "./middlewares/auth";
import "dotenv/config";

const app: Express = express();
const PORT: Number = parseInt(process.env.APP_PORT || "3000");

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, this is a Temperature Application.");
});

app.get(
  "/generate-token",
  async (req: Request, res: Response) => await AuthController.token(req, res)
);

app.get(
  "/temperatures/city/:id",
  auth,
  async (req: Request, res: Response) =>
    await TempController.cityStats(req, res)
);

app.post(
  "/temperatures/upload",
  [auth, upload.single("file")],
  async (req: Request, res: Response) =>
    await TempController.bulkInsert(req, res)
);

app.listen(PORT, async () => {
  console.log(`Server is running at ${process.env.APP_URL}:${PORT}`);
});
