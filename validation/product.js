const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  category: Joi.string().valid('Luxury Goods', 'Fashion', 'Electronics', 'Health', 'Beauty').required(),
  price: {
    value: Joi.number().min(50).required(),
    currency: Joi.string().valid('NGN').required(),
  },
  color: Joi.string().min(3).required(),
  description: Joi.string().min(20).required(),
  availableStock: Joi.number().required(),
  size: Joi.string().valid('Large', 'Small', 'Medium', 'Extra-Large', 'N/A').required(),
});

module.exports = addProductSchema;
