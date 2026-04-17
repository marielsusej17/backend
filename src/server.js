import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

/* ========================
   CONFIG
======================== */
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

/* ========================
   START SERVER FUNC
======================== */
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
  });
};

/* ========================
   CONEXIÓN DB
======================== */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("🔌 Conectado a MongoDB");
    startServer();
  })
  .catch((err) => {
    console.error("❌ Error MongoDB:", err.message);

    // ❗ IMPORTANTE: NO cierres el proceso sin debug en Render
    process.exit(1);
  });

/* ========================
   MANEJO DE ERRORES GLOBAL
======================== */
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});