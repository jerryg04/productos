const pool = require('./../../config/db');

async function listBrands() {
    const rows = await pool.query(
        "SELECT id, nombre, activo, fecha_creacion, fecha_actualizacion FROM marcas WHERE fecha_eliminacion IS NULL"
    );

    return rows.rows;
}

async function catalogBrands() {
    const rows = await pool.query(
        "SELECT id, nombre" +
        "FROM marcas " +
        "WHERE fecha_eliminacion IS NULL AND activo = 1"
    );
    return rows.rows[0];
}

async function getOneBrand(brandID) {
    const rows = await pool.query(
        "SELECT id, nombre, fecha_creacion, fecha_actualizacion " +
        "FROM marcas " +
        "WHERE id = $1 AND fecha_eliminacion IS NULL",
        [brandID]
    );
    return rows.rows[0];
}

async function create(brand) {
    // validateCreate(brand);

    const { nombre, activo } = brand;
    const newBranch = await pool.query(
        "INSERT INTO marcas (nombre, activo) VALUES($1, $2) RETURNING *",
        [nombre, activo]
    );
    let message = 'Error al intentar crear el marca';

    if (newBranch.length) {
        return {
            error: message
        };
    }
    return newBranch.rows[0];
}

async function update(brandID, brand) {
    const { nombre, activo } = brand;
    const updateBrand = await pool.query(
        "UPDATE marcas SET nombre = $1, activo = $2 WHERE id = $3", 
        [nombre, activo, brandID]
    );

    return { message: "Marca actualizado" };
}

async function active(brandID, active) {
    const updateBrand = await pool.query(
        "UPDATE marcas SET activo = $1 WHERE id = $2", 
        [active, brandID]
    );
    let message = '';
    if (active == 1) {
        message = "Marca activa";
    } else {
        message = "Marca desactivada";
    }

    return { message: message };
}

async function destroy(brandID) {
    const deleteBrand = await pool.query(
        "UPDATE marcas set fecha_eliminacion = now() WHERE id = $1", 
        [brandID]
    );

    return { message: "Marca eliminada" };
}
module.exports = {
    listBrands,
    catalogBrands,
    getOneBrand,
    create,
    update,
    active,
    destroy
}