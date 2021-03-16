const { addProductSchema } = require('../validation');
const { getSingleProductById } = require('../services');

const validateProductAddition = (req, res, next) => {
  try {
    const { error } = addProductSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({
      status: 'Fail',
      message: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const checkIfProductExists = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await getSingleProductById(productId);
    if (product) {
      req.product = product;
      return next();
    }
    return res.status(404).json({
      status: 'Fail',
      message: 'Product does not exist',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const checkIfProductIsForCurrentUser = async (req, res, next) => {
  try {
    if (req.product.owner_id === req.user.id) {
      return next();
    }
    return res.status(404).json({
      status: 'Fail',
      message: 'Product does not belong to user',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = { validateProductAddition, checkIfProductExists, checkIfProductIsForCurrentUser };
