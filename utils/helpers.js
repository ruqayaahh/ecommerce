const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const salt = bcrypt.genSaltSync(10);

const jwtSecret = process.env.JWT_SECRET;

const convertDataToToken = (data) => jwt.sign(data, jwtSecret, { expiresIn: '1h' });

const verifyToken = (token) => jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

const hashPassword = (password) => bcrypt.hashSync(password, salt);

const comparePassword = (plainPassword, hashedPassword) => (
  bcrypt.compareSync(plainPassword, hashedPassword)
);

const generateUUID = () => uuidv4();

module.exports = {
  convertDataToToken, verifyToken, hashPassword, comparePassword, generateUUID,
};
