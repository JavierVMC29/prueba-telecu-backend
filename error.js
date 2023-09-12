/**
 * Error handling middleware function reads the error message
 * and sends back a response in JSON format
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    // Handle specific errors, e.g., validation errors
    res.status(err.code || 500).json({ error: err.message });
  } else {
    // Handle other types of errors
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Fallback middleware function for returning 404 error for undefined paths.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const invalidPathHandler = (req, res, next) => {
  res.status(404);
  res.render('pageNotFound');
};

module.exports = { errorHandler, invalidPathHandler };
