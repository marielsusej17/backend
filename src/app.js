import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";

const app = express();

/* ========================
   CORS
======================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

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
  res.send("API funcionando 🚀");
});

export default app;