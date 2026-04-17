import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

const app = express();

/* ========================
   CORS (FIX LOCAL)
======================== */
origin: [
  "http://localhost:5173",
  "https://frontend-rho-vert-12.vercel.app"
]
/* ========================
   MIDDLEWARES
======================== */
app.use(morgan('dev'));
app.use(express.json());

/* ========================
   ROUTES
======================== */
app.use('/api/auth', authRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;