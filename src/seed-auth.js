import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

async function run() {
  try {
    /* ========================
       VALIDAR ENV
    ======================== */
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI no está definido en el .env");
    }

    console.log("📡 Conectando a MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "vehiculo",
    });

    console.log("🔌 Conectado a:", mongoose.connection.db.databaseName);

    /* ========================
       VERIFICAR USUARIO
    ======================== */
    const existingUser = await User.findOne({
      email: "admin@demo.com",
    });

    if (existingUser) {
      console.log("⚠️ El usuario ya existe:", existingUser.email);
      await mongoose.disconnect();
      return;
    }

    /* ========================
       CREAR USUARIO
    ======================== */
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      email: "admin@demo.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Usuario creado:", user.email);

    /* ========================
       VERIFICAR DB
    ======================== */
    const users = await User.find();
    console.log("📋 Usuarios en DB:", users);

    await mongoose.disconnect();
    console.log("🔌 Desconectado");

  } catch (error) {
    console.error("❌ Error seed:", error.message);
    process.exit(1);
  }
}

run();