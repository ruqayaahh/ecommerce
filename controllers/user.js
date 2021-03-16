const { addNewUser, getSingleUserByEmail } = require('../services');

const {
  convertDataToToken, hashPassword, comparePassword,
} = require('../utils');

const registerUser = async (req, res) => {
  try {
    const encryptedPassword = hashPassword(req.body.password);
    const userInfo = {
      ...req.body,
      password: encryptedPassword,
    };
    const updatedUserInfo = await addNewUser(userInfo);
    res.status(201).json({
      status: 'Success',
      message: 'Registration successful',
      data: updatedUserInfo,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getSingleUserByEmail(email);
    if (user && comparePassword(password, user.password)) {
      const token = convertDataToToken({ email, store_name: user.store_name, id: user.id });
      delete user.password;
      return res.status(201).json({
        status: 'Success',
        message: 'Login successful',
        data: { token, user },
      });
    }
    return res.status(401).json({
      status: 'Fail',
      message: 'Invalid login details',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

module.exports = { registerUser, loginUser };
