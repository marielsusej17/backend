import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CORS (PRODUCCIÓN PRO)
======================== */
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, backend, etc.)
      if (!origin) return callback(null, true);

      // Permitir localhost y cualquier deploy de Vercel
      if (
        origin.includes("localhost") ||
        origin.includes("vercel.app")
      ) {
        return callback(null, true);
      }

      // Bloquear otros
      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ========================
   PREFLIGHT (IMPORTANTE)
======================== */
app.options("*", cors());

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