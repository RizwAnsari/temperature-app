import express, { Express, Request, Response } from "express";
import "dotenv/config";
import publicRoutes from "./routes/public";
import authRoutes from "./routes/auth";
import tempRoutes from "./routes/temperature";

const app: Express = express();
const PORT: Number = parseInt(process.env.APP_PORT || "3000");

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/temperatures", tempRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running at ${process.env.APP_URL}:${PORT}`);
});
