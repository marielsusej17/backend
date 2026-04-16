import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

const app = express();

/* ========================
   CORS (CORREGIDO)
======================== */
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-lake-five-ny8hvbxz4c.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // permitir peticiones sin origin (postman, etc)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('CORS bloqueado: ' + origin));
      }
    },
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
app.use('/api/auth', authRoutes);
app.use('/api/vehiculos', vehiculoRoutes);

/* ========================
   HEALTH CHECK
======================== */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ========================
   ROOT (OPCIONAL)
======================== */
app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

export default app;