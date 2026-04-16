import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CORS (FIX DEFINITIVO)
======================== */
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir sin origin (Postman, apps móviles, etc.)
    if (!origin) return callback(null, true);

    // Permitir localhost y cualquier frontend de Vercel
    if (
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("No permitido por CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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