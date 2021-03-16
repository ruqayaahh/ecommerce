const { generateUUID } = require('../utils');
const db = require('../db/setup');
const { insertUser, getUserByEmail } = require('../db/queries/user');

const addNewUser = async (data) => {
  const id = generateUUID();
  const {
    email, firstName, lastName, password, storeName, phoneNumber,
  } = data;
  return db.one(insertUser, [id, email, firstName, lastName, storeName, phoneNumber, password]);
};

const getSingleUserByEmail = async (email) => db.oneOrNone(getUserByEmail, [email]);

module.exports = {
  addNewUser,
  getSingleUserByEmail,
};
