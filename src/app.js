import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";

const app = express();

/* ========================
   MIDDLEWARES
======================== */
app.use(morgan("dev"));
app.use(express.json());

/* ========================
   CORS FIX PRODUCCIÓN
======================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-rho-vert-12.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // permitir requests sin origin (Postman, health checks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true
  })
);

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/vehiculos", vehiculoRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ========================
   EXPORT
======================== */
export default app;