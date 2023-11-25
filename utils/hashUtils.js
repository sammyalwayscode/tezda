const bcrypt = require("bcrypt");

// Hash password
exports.hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare passwords
exports.comparePasswords = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
