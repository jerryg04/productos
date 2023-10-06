const pool = require('./../../config/db');
const bcrypt = require('bcrypt');
const jwtTokens = require('../utils/jwt-helpers');

async function register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre,email,password) VALUES ($1,$2,$3) RETURNING *'
      , [user.nombre, user.email, hashedPassword]);
    
    return jwtTokens(newUser.rows[0]);
}

async function findUserByEmail(email) {
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    return user.rows[0];
}

module.exports = {
    register,
    findUserByEmail
}