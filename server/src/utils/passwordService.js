const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);
const checkPassword = async (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

module.exports = { hashPassword, checkPassword };