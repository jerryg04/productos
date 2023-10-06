const auth = require('../services/auth');

const login = async (req, res) => {
    try {
        const authLogin = await auth.login(req.body);
        if (authLogin.error) {
            return res.status(401).json(await auth.login(authLogin))
        }
        res.json(await auth.login(req.body))
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

const register = async (req, res) => {
    try {
        res.json(await auth.register(req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

module.exports = {
    login,
    register
}