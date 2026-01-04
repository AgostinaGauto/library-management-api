const jwt = require('jsonwebtoken'); // importamos la libreria jsonwebtoken. Se usa para crear y verificar token jwt
                                     // el token sirve para identificar al usuario sin usar sesiones

// define una funcion que recibe un payload 
// el payload es la informacion que se guarda dentro del token
// por ejemplo, el id del usuario    
const generateToken = (payload) => { 
  return jwt.sign( // creacion del token
    payload, // id usuario
    process.env.COD_ENCRIPTACION, // clave secreta para firmar el token
    { expiresIn: '2h' } // duracion del token. Expira en 2hrs y hay que volver a loguearse
  );
};


// define una funcion que recibe el token
// lo usamos para validar tokens recibidos del cliente
const verifyToken = (token) => { // verifica que el token sea valido, no este vencido y que haya sido firmado con la clave correcta
  return jwt.verify(token, process.env.COD_ENCRIPTACION); // si el token es invalido lanza un error
};

module.exports = {
  generateToken,
  verifyToken
};