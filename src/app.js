import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* ========================
   CORS (FINAL FUNCIONANDO)
======================== */
const corsOptions = {
  origin: "https://frontend-lake-five-ny8hvbxz4c.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 CLAVE

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