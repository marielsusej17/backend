import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

/* ========================
   ENV (IMPORTANTE)
======================== */
dotenv.config({ path: "./.env" });

const app = express();

/* ========================
   CORS (LOCAL SIN ERRORES)
======================== */
app.use(
  cors({
    origin: true,
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