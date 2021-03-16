const { Router } = require('express');
const {
  addProduct,
  updateProduct,
  deleteTheProduct,
  allProducts,
  fetchProduct,
  rateTheProduct,
} = require('../controllers');
const {
  authenticate,
  validateProductAddition,
  checkIfProductExists,
  checkIfProductIsForCurrentUser,
  ratingValidator,
} = require('../middlewares');

const productRouter = Router();

productRouter.post('/product', authenticate, validateProductAddition, addProduct);
productRouter.get('/product', allProducts);

productRouter.put('/product/:productId', authenticate, checkIfProductExists, checkIfProductIsForCurrentUser, updateProduct);
productRouter.delete('/product/:productId', authenticate, checkIfProductExists, checkIfProductIsForCurrentUser, deleteTheProduct);
productRouter.get('/product/:productId', checkIfProductExists, fetchProduct);
productRouter.put('/product/rating/:productId', authenticate, checkIfProductExists, ratingValidator, rateTheProduct);

module.exports = productRouter;
