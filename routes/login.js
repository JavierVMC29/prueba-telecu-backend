const express = require('express');
const { body } = require('express-validator');

const loginController = require('../controllers/loginController');
const { validate } = require('../validators/index');

const router = express.Router();

router.post(
  '/',
  validate([
    body('username')
      .notEmpty()
      .isAlphanumeric()
      .withMessage('Invalid username'),
    body('password').notEmpty().withMessage('Password is required')
  ]),
  loginController.login
);

module.exports = router;
