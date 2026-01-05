// este archivo es nuestro controlador de autenticacion. Concta HTTP (req, res)
// con la logica de negocio (services) y usa helpers de respuesta
const { loginUser, registerUser } = require('../services/auth.services'); 
const { successResponse, errorResponse } = require('../utils/responses'); 

exports.login = async (req, res) =>{ // exporta la funcion login

    try {
        const token = await loginUser(req.body.email, req.body.password); // llama al service loginUser, le pasa email y password
        return successResponse(res, 200, { token }); // si todo esta bien, devuelve un token utilizando un helper de respuesta
        
    } catch (error) {
        return errorResponse(res, 401, 'Credenciales invalidas');  
    }
};

exports.register = async (req, res) =>{ // exporta la funcion register

    try {
        await registerUser(req.body.email, req.body.password); // llama al service registerUser y le pasa email y password
        return successResponse(res, 201, {
            message: 'Usuario registrado correctamente'
        });
        
    } catch (error) {

        if(error.message === 'USUARIO_EXISTENTE' ){  // si el service lanzo ese error, se traduce a HTTP 400
            return errorResponse(res, 400, 'El usuario ya existe'); // devuelve error al cliente

        }

        return errorResponse(res, 500, 'Error interno del servidor'); // cualquier otro error inesperado
    }
};


