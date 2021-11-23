const bcrypt = require("bcryptjs");

exports.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

exports.decryptPassword = async (password, passwordToCompare) => {
  return await bcrypt.compare(password, passwordToCompare);
};
