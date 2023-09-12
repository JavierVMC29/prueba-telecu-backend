const express = require('express');
const { param } = require('express-validator');

const departamentoController = require('../controllers/departamentoController');
const { checkUserRole, roles } = require('../middlewares/checkUserRole');
const { validate } = require('../validators/index');

const router = express.Router();

router.get(
  '/',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  departamentoController.getAll
);

router.get(
  '/:id',
  checkUserRole([roles.RECEPCION, roles.SUPERVISOR]),
  validate([param('id').trim().escape().isInt()]),
  departamentoController.getById
);

module.exports = router;
