import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"; // 🔥 IMPORTANTE

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* JSON */
app.use(express.json());

/* RUTAS API */
app.use("/api", authRoutes); // 🔥 ESTO TE FALTA

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});