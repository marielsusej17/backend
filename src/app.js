import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CORS FORZADO (SIN ERRORES)
======================== */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ========================
   MIDDLEWARES
======================== */
app.use(express.json());

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);

/* ========================
   TEST
======================== */
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

export default app;