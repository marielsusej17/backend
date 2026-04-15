import { Router } from 'express';
import {
  createVehiculo,
  getVehiculos,
  getVehiculoById,
  updateVehiculo,
  deleteVehiculo
} from '../controllers/vehiculo.controller.js';

import {
  createVehiculoValidator,
  updateVehiculoValidator,
  placaValidator
} from '../validators/vehiculo.validator.js';

const router = Router();

/**
 * CRUD Vehículos
 * Base URL: /api/vehiculos
 */

// 🔹 Listar todos
router.get('/', getVehiculos);

// 🔹 Crear vehículo
router.post(
  '/',
  createVehiculoValidator,
  createVehiculo
);

// 🔹 Obtener por placa
router.get(
  '/:id',
  placaValidator,
  getVehiculoById
);

// 🔹 Actualizar vehículo
router.put(
  '/:id',
  updateVehiculoValidator,
  updateVehiculo
);

// 🔹 Eliminar vehículo
router.delete(
  '/:id',
  placaValidator,
  deleteVehiculo
);

export default router;