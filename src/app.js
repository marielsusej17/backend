import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

const app = express();

/* ========================
   CORS
======================== */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* ========================
   MIDDLEWARES
======================== */
app.use(morgan('dev'));
app.use(express.json());

/* ========================
   ROUTES
======================== */

// 🔥 AQUÍ ESTÁ LA CLAVE
app.use('/api/auth', authRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;