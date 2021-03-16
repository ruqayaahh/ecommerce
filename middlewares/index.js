const { validateSignUp, checkIfUserExists, validateLogin } = require('./user');
const { validateProductAddition, checkIfProductExists, checkIfProductIsForCurrentUser } = require('./product');
const { authenticate, ratingValidator } = require('./auth');

module.exports = {
  validateSignUp,
  validateLogin,
  validateProductAddition,
  checkIfUserExists,
  authenticate,
  checkIfProductExists,
  checkIfProductIsForCurrentUser,
  ratingValidator,
//   adminAccessValidator,
};
