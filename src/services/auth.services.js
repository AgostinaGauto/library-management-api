// este archivo separa la logica de negocio del controlador
// no maneja req ni res
// los controladores llaman sus funciones para poder utilizarlas

const User = require('../models/user'); // importamos el modelo user. Representa la tabla de usuarios en la bd
const { hashPassword, comparePassword } = require('../utils/bcrypt'); // importamos helper de bcrypt. Encripta contraseñas  y compara
const { generateToken } = require('../utils/jwt'); // importamos el helper de jwt. Genera tokens de autenticacion

const loginUser = async (email, password) =>{ // define una funcion asincrona que recibe email y password

    const user = await User.findOne({ where: { email }}); // busca un usuario por email. Devuelve el usuario si existe y null si no existe

    if(!user){ // valida la existencia del usuario
        throw new Error('CREDENCIALES_INVALIDAS');

    }

    const valid = await comparePassword(password, user.password); // compara la contraseña ingresada con la contraseña encriptada en la bd

    if(!valid){ // si la contraseña es incorrecta, lanza un error
        throw new Error('CREDENCIALES_INVALIDAS');
    }

    const token = generateToken({ id: user.id }); // genera un token del usuario llamando al helper y le pasa el id del usuario

    return token; // devuelve el token y el controlador decide como enviarlo al cliente
};

const registerUser = async (email, password) =>{ // funcion asincrona que recibe email y contraseña

    const existingUser = await User.findOne({ where: { email }}); // verifica si ya existe un usuario con ese email

    if(existingUser){ // si ya existe lanza un error para evitar duplicados
        throw new Error('USUARIO_EXISTENTE');
    }

    const hashedPassword = await hashPassword(password); // llama al helper de bcrypt para encriptar la contraseña ingresada

    const user = await User.create({ // crea el usuario en la bd con el email ingresado y la contraseña encriptada
        email, 
        password: hashedPassword

    });

    return user; // devuelve el usuario. El controlador decide que campos delvolver, pero nunca la contraseña
};

module.exports = {
    loginUser,
    registerUser
}