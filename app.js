import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDB from "./config/database/mongodb.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Subscription Tracker API");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API running at http://localhost:${PORT}`);
  await connectDB();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export default app;
