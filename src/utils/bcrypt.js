const bcrypt = require('bcryptjs'); // importamos bcrypt para encriptar y comparar contraseñas en texto plano con contraseñas encriptadas

// define una funcion asincrona que recibe una contraseña en texto plano
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); // encripta la contraseña
};

// define una funcion asincrona que compara la contraseña en texto plano
// con la contraseña encriptada en la BD
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); // compara ambas contraseñas y devuelve un true o false
};

module.exports = {
  hashPassword,
  comparePassword
};