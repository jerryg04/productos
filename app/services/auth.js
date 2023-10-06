const pool = require('./../../config/db');
const bcrypt = require('bcrypt');
const jwtTokens = require('../utils/jwt-helpers');
const userService = require('./users');

async function login(user) {
    const findUser = await userService.findUserByEmail(user.email);

    if (findUser === undefined) {
        return { error: "Email es incorrecto"};
    }
    const validPassword = await bcrypt.compare(user.password, findUser.password);
    if (!validPassword) return {error: "Contraseña incorrecta"};
    
    //JWT
    token = jwtTokens(findUser);
    
    return {
        nombre: findUser.nombre,
        access_token : token.access_token,
        refresh_token : token.refresh_token
    };
}

const register = async (user) => {
    return await userService.register(user)
}

module.exports = {
    login,
    register
}