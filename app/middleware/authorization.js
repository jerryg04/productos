require('dotenv').config()
const jwt = require('jsonwebtoken');

//Valida el usuario autentificado
function authenticateToken(req, res, next) {
    const authorization = req.headers['authorization']; //Bearer TOKEN
    const token = authorization && authorization.split(' ')[1];
    if (token == null) return res.status(401).json({ error: "No tiene autorización" });

    const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        //console.log("user verify");
        //console.log(user);
        if (error) return res.status(403).json({ error: error.message });
        //console.log("user con permiso");
        //console.log(user);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;