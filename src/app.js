import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

const app = express();


app.use(
  cors({
    origin: [
      "https://frontend-rho-vert-12.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

   MIDDLEWARES
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