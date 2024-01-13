import express, { Express, Request, Response } from "express";
import 'dotenv/config'

const app: Express = express();
const PORT: Number = parseInt(process.env.APP_PORT || "3000");

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${process.env.APP_URL}:${PORT}`);
});
