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

async function listProducts() {
    const rows = await pool.query(
        "SELECT p.id, p.nombre, m.id as marca_id, m.nombre as marca_nombre, p.codigo_barras, p.fecha_creacion, p.fecha_actualizacion, p.fecha_eliminacion " +
        "FROM productos p " +
        "INNER JOIN marcas m on m.id = p.marca_id " +
        "WHERE fecha_eliminacion IS NULL"
    );
    return rows.rows;
}

module.exports = {
    login
}