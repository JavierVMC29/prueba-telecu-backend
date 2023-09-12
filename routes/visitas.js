const express = require('express');
const { body, param } = require('express-validator');

const visitaController = require('../controllers/visitaController');
const { checkUserRole, roles } = require('../middlewares/checkUserRole');
const { validate } = require('../validators/index');

const router = express.Router();

router.get(
  '/',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  visitaController.getAll
);

router.get(
  '/:id',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  validate([param('id').trim().escape().isInt()]),
  visitaController.getById
);

router.post(
  '/',
  checkUserRole([roles.RECEPCION]),
  validate([
    body('fecha')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Fecha es requerida')
      .isISO8601()
      .withMessage('Fecha invalida'),
    body('hora')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Hora es requerida')
      .isTime({
        hourFormat: 'hour24',
        mode: 'withSeconds'
      })
      .withMessage('Hora invalida'),
    body('fecha_ingreso')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Fecha de ingreso es requerida')
      .isISO8601()
      .withMessage('Fecha de ingreso invalida'),
    body('motivo_visita')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Motivo de visita es requerido')
      .matches(/^[A-Za-z0-9 ]+$/)
      .withMessage('Motivo de visita debe tener solo letras y numeros'),
    body('novedad')
      .optional()
      .trim()
      .escape()
      .matches(/^[A-Za-z0-9,\. ]*$/)
      .withMessage('Novedad debe tener solo letras, numeros, coma y punto'),
    body('estado')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Estado es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('Estado debe tener solo letras y numeros'),
    body('visitante_id')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Visitante id es requerido')
      .isInt()
      .withMessage('Visitante id debe ser un entero'),
    body('departamento_id')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Departamento id es requerido')
      .isInt()
      .withMessage('Departamento id debe ser un entero')
  ]),
  visitaController.create
);

router.put(
  '/:id',
  checkUserRole([roles.RECEPCION]),
  validate([
    param('id').trim().escape().isInt(),
    body('fecha')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Fecha es requerida')
      .isISO8601()
      .withMessage('Fecha invalida'),
    body('hora')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Hora es requerida')
      .isTime({
        hourFormat: 'hour24',
        mode: 'withSeconds'
      })
      .withMessage('Hora invalida'),
    body('fecha_ingreso')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Fecha de ingreso es requerida')
      .isISO8601()
      .withMessage('Fecha de ingreso invalida'),
    body('motivo_visita')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Motivo de visita es requerido')
      .matches(/^[A-Za-z0-9 ]+$/)
      .withMessage('Motivo de visita debe tener solo letras y numeros'),
    body('novedad')
      .optional()
      .trim()
      .escape()
      .matches(/^[A-Za-z0-9,\. ]*$/)
      .withMessage('Novedad debe tener solo letras, numeros, coma y punto'),
    body('estado')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Estado es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('Estado debe tener solo letras y numeros'),
    body('visitante_id')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Visitante id es requerido')
      .isInt()
      .withMessage('Visitante id debe ser un entero'),
    body('departamento_id')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Departamento id es requerido')
      .isInt()
      .withMessage('Departamento id debe ser un entero')
  ]),
  visitaController.update
);

router.delete(
  '/:id',
  checkUserRole([roles.RECEPCION]),
  validate([param('id').trim().escape().isInt()]),
  visitaController.destroy
);

module.exports = router;
