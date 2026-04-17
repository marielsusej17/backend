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
   CORS (PRODUCCIÓN + LOCAL)
======================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-rho-vert-12.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // permitir requests sin origin (Postman / Render / health checks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Bloqueado por CORS: " + origin));
    },
    credentials: true,
  })
);

/* ========================
   MIDDLEWARES
======================== */
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
   DB + SERVER
======================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🔌 Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error DB:", err.message);
  });