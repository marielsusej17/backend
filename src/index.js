import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CORS (FIJO Y FUNCIONANDO)
======================== */
app.use(
  cors({
    origin: "https://frontend-lake-five-ny8hvbxz4c.vercel.app",
    credentials: true,
  })
);

/* ========================
   MIDDLEWARES
======================== */
app.use(express.json());

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);

/* ========================
   TEST ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

export default app;