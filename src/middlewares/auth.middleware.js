
// este middleware de autenticacion se usa antes de llegar a una ruta protegida. 
// verifica si el usuario esta autenticado. Valida el token JWT. 
// extrae el id del usuario y protege rutas privadas

const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/responses');

module.exports = (req, res, next) => { // 'next' permite continuar a la siguiente funcion

    const header = req.headers.authorization; // obtiene el header authorization

    if(!header){ // verifica si existe el token. Si no hay header, el usuario no esta logueado
                // lo notifica y corta la ejecucion (no llega a la ruta)
        return errorResponse(res, 401, 'No autenticado');
    }

    const token = header.split(' ')[1]; // extrae el token y obtiene solo el token, no todo el string que contiene el header

    try { // bloque para capturar errores si el token esta vencido, el falso o esta mal informado
        
        // verifica que el token sea valido y que haya sido firmado con la clave correcta
        const decoded = verifyToken(token);
        req.userId = decoded.id; // guarada el id del usuario dentro del request, asi las rutas pueden saber que usuario esta logueado

        next(); // continua a la ruta protegida. Pasa al controlador real.

    } catch (error) { // si el token es incorrecto o vencido, la ruta protegida no se ejecuta
       return errorResponse(res, 401, 'Token inválido');
        
    }
};