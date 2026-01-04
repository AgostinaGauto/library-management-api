const User = require('../models/user'); // importamos el modelo User. Representa la tabla usuario en la BD.
// la utilizamos para buscar usuarios
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { successResponse, errorResponse } = require('../utils/responses');

exports.login = async (req, res) => {

    const { email, password } = req.body; // extrae el email y el password del cuerpo de la peticion

    const user = await User.findOne({ where: { email } }); // busca un usuario en la BD que coincida con el email obtenido anteriormente

    if (!user) { // si dicho usuario no existe, se notifica que las credenciales ingresadas son invalidas
        return errorResponse(res, 401, 'Credenciales inválidas');
    }

    const valid = await comparePassword(password, user.password); // compara la contraseña ingresada en texto plano
    // con la contraseña encriptada en la bd

    if (!valid) {
        return errorResponse(res, 401, 'Credenciales inválidas'); // si la contraseña es incorrecta se notifica
    }

    const token = generateToken({ id: user.id });

    return successResponse(res, 200, { token }); // devuelve el token al frontend y el frontend lo guarda en una cookie
};


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body; // obtiene el email y contraseña del cuerpo de la solicitud

        const existingUser = await User.findOne({ where: { email } }); // busca si existe un usuario registrado con diho email en la BD


        if (existingUser) { // evalua si existe el usuario con dicho email
            return errorResponse(res, 400, 'El usuario ya existe');
        }

        const hashedPassword = await hashPassword(password); // encriptamos la contraseña que ingresa el usuario

        await User.create({ // creamos el usuario en la BD 
            email,
            password: hashedPassword
        });

        return successResponse(res, 201, {
            message: 'Usuario registrado correctamente'
        });

    } catch (error) {
       return errorResponse(res, 500, 'Error interno del servidor');

    }
};


