import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

/* ========================
   CONFIG
======================== */
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

/* ========================
   VALIDACIONES
======================== */
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI no está definida');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET no está definida');
  process.exit(1);
}

/* ========================
   CONEXIÓN DB + SERVER
======================== */
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('🔌 Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });