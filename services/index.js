const {
  addNewUser,
  getSingleUserByEmail,
} = require('./user');
const {
  addNewProduct,
  getSingleProductById,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  getAllRatings,
  rateSingleProduct,
} = require('./product');

module.exports = {
  addNewUser,
  getSingleUserByEmail,
  addNewProduct,
  getSingleProductById,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  getAllRatings,
  rateSingleProduct,
};
