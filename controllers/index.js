const { registerUser, loginUser } = require('./user');
const {
  addProduct,
  updateProduct,
  deleteTheProduct,
  allProducts,
  fetchProduct,
  rateTheProduct,
} = require('./product');

module.exports = {
  registerUser,
  loginUser,
  addProduct,
  updateProduct,
  deleteTheProduct,
  allProducts,
  fetchProduct,
  rateTheProduct,
};
