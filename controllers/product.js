const {
  addNewProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  rateSingleProduct,
} = require('../services');

const addProduct = async (req, res) => {
  try {
    const todo = await addNewProduct(req.body, req.user);
    res.status(201).json({
      status: 'Success',
      message: 'Product added successfully',
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const theUpdatedProduct = await updateSingleProduct(req.product, req.body);
    res.status(200).json({
      status: 'Success',
      message: 'Product updated successfully',
      data: theUpdatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
const deleteTheProduct = async (req, res) => {
  try {
    await deleteSingleProduct(req.product.id);
    res.status(200).json({
      status: 'Success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const allProducts = async (req, res) => {
  try {
    const productList = await getAllProducts();
    res.status(200).json({
      status: 'Success',
      message: 'All products fetched successfully',
      data: productList,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const fetchProduct = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Success',
      message: 'Product fetched successfully',
      data: req.product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const rateTheProduct = async (req, res) => {
  try {
    const updatedRating = await rateSingleProduct(req.product, req.body.rating, req.user.id);
    console.log(updatedRating);
    return res.status(200).json({
      status: 'Success',
      message: 'Product rating updated successfully',
      data: updatedRating,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteTheProduct,
  allProducts,
  fetchProduct,
  rateTheProduct,
};
