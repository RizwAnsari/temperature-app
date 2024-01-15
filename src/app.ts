import express, { Express, Request, Response } from "express";
import * as TempController from "./controllers/TemperatureController";
import "dotenv/config";

const app: Express = express();
const PORT: Number = parseInt(process.env.APP_PORT || "3000");

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.get(
  "/temperatures/city/:id",
  async (req: Request, res: Response) =>
    await TempController.cityStats(req, res)
);

app.listen(PORT, async () => {
  console.log(`Server is running at ${process.env.APP_URL}:${PORT}`);
});
