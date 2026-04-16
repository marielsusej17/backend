import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

async function run() {
  try {
    console.log("📡 Conectando a MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "vehiculo"
    });

    console.log("🔌 Conectado a:", mongoose.connection.db.databaseName);

    // limpiar usuarios
    await User.deleteMany({});
    console.log("🧹 Usuarios eliminados");

    const hashedPassword = await bcrypt.hash('123456', 10);

    const user = await User.create({
      email: 'admin@demo.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log("✅ Usuario creado:", user.email);

    const users = await User.find();
    console.log("📋 Usuarios en DB:", users);

    await mongoose.disconnect();
    console.log("🔌 Desconectado");

    process.exit(0);

  } catch (error) {
    console.error("❌ Error seed:", error);
    process.exit(1);
  }
}

run();