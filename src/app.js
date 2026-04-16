import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";

const app = express();

/* ========================
   CORS CONFIG (PRODUCCIÓN FIX)
======================== */
app.use(
  cors({
    origin: [
      "https://frontend-rho-vert-12.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* ========================
   MIDDLEWARES
======================== */
app.use(morgan("dev"));
app.use(express.json());

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/vehiculos", vehiculoRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

export default app;