import { validationResult } from "express-validator";
import Vehiculo from "../models/Vehiculo.js";

/* ---------------- VALIDACIÓN ---------------- */
const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
    return true;
  }
  return false;
};

/* ---------------- CREAR ---------------- */
export const createVehiculo = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const { placa, marca, modelo, anio, mantenimientos } = req.body;

    if (!placa) {
      return res.status(400).json({
        message: "La placa es obligatoria",
      });
    }

    const newVehiculo = await Vehiculo.create({
      placa: placa.trim().toUpperCase(),
      marca: marca?.trim(),
      modelo: modelo?.trim(),
      anio: Number(anio),
      mantenimientos: mantenimientos || [],
    });

    return res.status(201).json({
      message: "Vehículo creado correctamente",
      data: newVehiculo,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "La placa ya está registrada",
      });
    }
    next(err);
  }
};

/* ---------------- LISTAR ---------------- */
export const getVehiculos = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    const filter = q
      ? {
          $or: [
            { placa: new RegExp(q, "i") },
            { marca: new RegExp(q, "i") },
            { modelo: new RegExp(q, "i") },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Vehiculo.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Vehiculo.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- OBTENER UNO ---------------- */
export const getVehiculoById = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findOne({
      placa: req.params.id.toUpperCase(),
    });

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    res.json(vehiculo);
  } catch (err) {
    next(err);
  }
};

/* ---------------- ACTUALIZAR ---------------- */
export const updateVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findOneAndUpdate(
      { placa: req.params.id.toUpperCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    res.json({
      message: "Vehículo actualizado",
      data: vehiculo,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- ELIMINAR ---------------- */
export const deleteVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findOneAndDelete({
      placa: req.params.id.toUpperCase(),
    });

    if (!vehiculo) {
      return res.status(404).json({
        message: "Vehículo no encontrado",
      });
    }

    res.json({
      message: "Vehículo eliminado correctamente",
      placa: vehiculo.placa,
    });
  } catch (err) {
    next(err);
  }
};