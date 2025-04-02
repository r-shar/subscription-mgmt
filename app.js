import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Subscription Tracker API");
});

app.listen(PORT, () => {
  console.log(`Subscription Tracker API running at http://localhost:${PORT}`);
});

export default app;
