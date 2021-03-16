const { verifyToken } = require('../utils');
const { getAllRatings } = require('../services');

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: 'Fail',
        message: 'You are not signed in',
      });
    }
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    if (err) {
      return res.status(401).json({
        status: 'Fail',
        message: 'You need to be signed in',
      });
    }
    req.user = data;
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};
const ratingValidator = async (req, res, next) => {
  try {
    if (req.user.id !== req.product.owner_id) {
      const rater = await getAllRatings(req.product.id);
      console.log(rater);
      if (rater.length) {
        rater.forEach((el) => {
          if (String(el.rater_id) === String(req.user.id)) {
            return res.status(403).json({
              status: 'Fail',
              message: 'You have already rated this product.',
            });
          }
          return next();
        });
      }
      return next();
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You are not allowed to rate your own product.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = { authenticate, ratingValidator };
