require('dotenv').config()
const jwt = require('jsonwebtoken');


//Genera un access token y un refresh token
//para el usuario de la base de datos
function jwtTokens({id, nombre, email}) {
    const user = {id, nombre, email};
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '80m' });
    return ({ access_token, refresh_token });
}

module.exports = jwtTokens;