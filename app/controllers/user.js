const user = require('../services/users');

const register = async (req, res) => {
    try {
        res.json(await user.register(req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

module.exports = {
    register
}