const bcrypt = require('bcryptjs'); // importamos bcrypt para encriptar y comparar contraseñas en texto plano con contraseñas encriptadas

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};