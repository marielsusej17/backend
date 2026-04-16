import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import app from "./app.js";

/* ========================
   RUTA CORRECTA DEL .ENV
======================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

/* ========================
   CONFIG
======================== */
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    /* ========================
       VALIDAR ENV
    ======================== */
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está definido");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    console.log("📡 Conectando a MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "vehiculo",
    });

    console.log("✅ Conectado a MongoDB");

    /* DEBUG */
    console.log("🔐 JWT:", process.env.JWT_SECRET);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
}

startServer();