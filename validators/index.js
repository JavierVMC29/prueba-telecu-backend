const { validationResult } = require('express-validator');
const validateDocument = require('validate-document-ecuador');

/**
 * sequential processing, stops running validations chain if the previous one fails.
 * @param {*} validations
 * @returns
 */
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

/**
 * Validate if the dni is valid in Ecuador
 * @param {*} dni
 * @returns
 */
const validateCedula = async (dni) => {
  try {
    const response = validateDocument.getValidateDocument('cedula', dni);
    if (response.status === 'ERROR') {
      return Promise.reject('Cedula invalida');
    }
    return Promise.resolve();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { validate, validateCedula };
