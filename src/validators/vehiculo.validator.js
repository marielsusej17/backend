import { body, param } from 'express-validator';

/* 🔥 REGEX GLOBAL */
const PLACA_REGEX = /^[A-Z0-9]+$/;

/* 🔹 VALIDAR PLACA EN URL */
export const placaValidator = [
  param('id')
    .exists().withMessage('La placa es obligatoria')
    .bail()
    .isString().withMessage('La placa debe ser texto')
    .trim()
    .notEmpty().withMessage('La placa no puede estar vacía')
    .isLength({ min: 6, max: 10 }).withMessage('Debe tener entre 6 y 10 caracteres')
    .matches(PLACA_REGEX).withMessage('Solo letras y números (sin espacios)')
    .toUpperCase(),
];

/* 🔹 VALIDAR CREACIÓN */
export const createVehiculoValidator = [
  body('placa')
    .exists().withMessage('La placa es obligatoria')
    .bail()
    .isString().withMessage('La placa debe ser texto')
    .trim()
    .notEmpty().withMessage('La placa no puede estar vacía')
    .isLength({ min: 6, max: 10 }).withMessage('Debe tener entre 6 y 10 caracteres')
    .matches(PLACA_REGEX).withMessage('Solo letras y números (sin espacios)')
    .toUpperCase(),

  body('marca')
    .exists().withMessage('La marca es obligatoria')
    .bail()
    .isString().withMessage('La marca debe ser texto')
    .trim()
    .notEmpty().withMessage('La marca no puede estar vacía')
    .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),

  body('modelo')
    .exists().withMessage('El modelo es obligatorio')
    .bail()
    .isString().withMessage('El modelo debe ser texto')
    .trim()
    .notEmpty().withMessage('El modelo no puede estar vacío')
    .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),

  body('anio')
    .exists().withMessage('El año es obligatorio')
    .bail()
    .isInt({
      min: 1900,
      max: new Date().getFullYear() + 1
    }).withMessage('Año inválido'),

  body('mantenimientos')
    .optional()
    .isArray().withMessage('Debe ser un arreglo'),

  body('mantenimientos.*.fecha')
    .optional()
    .isISO8601().withMessage('Fecha inválida'),

  body('mantenimientos.*.tipo')
    .optional()
    .isString().withMessage('Tipo debe ser texto')
    .trim()
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
];

/* 🔹 VALIDAR UPDATE */
export const updateVehiculoValidator = [
  ...placaValidator,

  body('marca')
    .optional()
    .isString().withMessage('Marca debe ser texto')
    .trim()
    .notEmpty().withMessage('Marca no puede estar vacía')
    .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),

  body('modelo')
    .optional()
    .isString().withMessage('Modelo debe ser texto')
    .trim()
    .notEmpty().withMessage('Modelo no puede estar vacío')
    .isLength({ max: 50 }).withMessage('Máximo 50 caracteres'),

  body('anio')
    .optional()
    .isInt({
      min: 1900,
      max: new Date().getFullYear() + 1
    }).withMessage('Año inválido'),

  body('mantenimientos')
    .optional()
    .isArray().withMessage('Debe ser un arreglo'),
];