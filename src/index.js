import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CONFIG
======================== */
const PORT = process.env.PORT || 3000;

/* ========================
   MIDDLEWARES
======================== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ========================
   RUTAS
======================== */
app.use("/api/auth", authRoutes);

/* ========================
   TEST
======================== */
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

/* ========================
   CONEXIÓN DB + SERVER
======================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🔌 Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error DB:", err.message);
  });