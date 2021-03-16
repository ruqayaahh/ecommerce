const { generateUUID } = require('../utils');
const db = require('../db/setup');
const {
  insertProduct,
  fetchSingleProductById,
  updateProductDetails,
  deleteProduct,
  fetchAllProducts,
  insertProductRating,
  calculateProductRating,
  updateProductRating,
  fetchAllProductRatings,
} = require('../db/queries/product');

const addNewProduct = async (data, user) => {
  const id = generateUUID();
  const ownerId = user.id;
  const storeName = user.store_name;
  const averageRating = 0.00;
  const {
    name, category, price, color, description, availableStock, size,
  } = data;
  const finalPrice = `${price.currency} ${price.value}`;
  return db.one(
    insertProduct, [
      id,
      name,
      category,
      finalPrice,
      color,
      description,
      ownerId,
      storeName,
      averageRating,
      availableStock,
      size,
    ],
  );
};

const getSingleProductById = async (productId) => db.oneOrNone(fetchSingleProductById, [productId]);

const updateSingleProduct = async (product, data) => {
  const obj = {
    name: product.name,
    category: product.category,
    price: product.price,
    color: product.color,
    description: product.description,
    availableStock: product.available_stock,
    size: product.size,
  };
  Object.keys(data).forEach((key) => {
    Object.keys(obj).forEach((el) => {
      if (key === el) {
        obj[el] = data[key];
        if (key === 'price') {
          obj[el] = `NGN ${data[key]}`;
        }
      }
    });
  });
  return db.one(
    updateProductDetails, [
      product.id,
      obj.name,
      obj.category,
      obj.price,
      obj.color,
      obj.description,
      obj.availableStock,
      obj.size,
    ],
  );
};

const deleteSingleProduct = async (productId) => db.none(deleteProduct, [productId]);

const getAllProducts = async () => db.manyOrNone(fetchAllProducts);

const getAllRatings = async (productId) => db.manyOrNone(fetchAllProductRatings, [productId]);

const calculateSingleProduct = async (id) => db.one(calculateProductRating, [id]);

const updateSingleProductAvgRating = async (id, value) => db.one(updateProductRating, [id, value]);

const rateSingleProduct = async (product, rating, rater) => {
  const { id, name } = product;
  console.log(id, name, rating, product.owner_id, rater);
  db.one(insertProductRating, [id, name, rating, product.owner_id, rater]);
  const calcAvgRating = await calculateSingleProduct(id);
  console.log(calcAvgRating);
  const avgRating = parseFloat(calcAvgRating.average_rating).toFixed(2);
  console.log(avgRating);
  const y = await updateSingleProductAvgRating(id, avgRating);
  return y;
};

module.exports = {
  addNewProduct,
  getSingleProductById,
  updateSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  rateSingleProduct,
  getAllRatings,
};
