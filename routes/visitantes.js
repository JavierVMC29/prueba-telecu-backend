const express = require('express');
const { body, param } = require('express-validator');

const visitanteController = require('../controllers/visitanteController');
const { checkUserRole, roles } = require('../middlewares/checkUserRole');
const { validate, validateCedula } = require('../validators/index');

const router = express.Router();

router.get(
  '/',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  visitanteController.getAll
);

router.get(
  '/cedula/:cedula',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  validate([param('cedula').trim().escape().isNumeric()]),
  visitanteController.getByCedula
);

router.get(
  '/:id',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  validate([param('id').trim().escape().isInt()]),
  visitanteController.getById
);

router.post(
  '/',
  checkUserRole([roles.RECEPCION]),
  validate([
    body('nombres')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('nombres es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('Nombres solo puede tener letras y espacios'),
    body('apellidos')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('apellidos es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('Apellidos solo puede tener letras y espacios'),
    body('cedula')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Cedula es requerido')
      .custom(validateCedula)
      .withMessage('Cedula invalida')
  ]),
  visitanteController.create
);

router.put(
  '/:id',
  checkUserRole([roles.RECEPCION]),
  validate([
    param('id').trim().escape().isInt(),
    body('nombres')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('nombres es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('nombres solo puede tener letras y espacios'),
    body('apellidos')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('apellidos es requerido')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('apellidos solo puede tener letras y espacios'),
    body('cedula')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('cedula es requerido')
      .custom(validateCedula)
      .withMessage('cedula solo debe tener numeros')
  ]),
  visitanteController.update
);

router.delete(
  '/:id',
  checkUserRole([roles.RECEPCION]),
  validate([param('id').trim().escape().isInt()]),
  visitanteController.destroy
);

module.exports = router;
