const Pool = require('pg').Pool;

// const pool = new Pool({
//     connectionString: process.env.DB_POSTGRESQL_URL
// });
const pool = new Pool({
    user : process.env.DB_POSTGRESQL_USER,
    password: process.env.DB_POSTGRESQL_PASSWORD,
    host: process.env.DB_POSTGRESQL_HOST,
    port: process.env.DB_POSTGRESQL_PORT,
    database: process.env.DB_POSTGRESQL_NAME
});

module.exports = pool;