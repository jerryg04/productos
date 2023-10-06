const pool = require('./../../config/db');

function validateCreate(product) {
    let messages = [];
    console.log("product validate");
    console.log(product);
    if (Object.keys(product).length === 0) {
        // let error = new Error([{error: "No se proporciona ningun objeto"}]);
        messages.push("No se proporciona ningun objeto");
        // error.statusCode = 400;
        // throw error;
    }

    if (!product.marca_id) {
        messages.push("Campo vacío")
    }

    if (!product.nombre) {
        messages.push("Campo vacío");
    }

    if (!product.codigo_barras) {
        messages.push("Campo vacío");
    }

    if (product.nombre && product.nombre.length > 150) {
        messages.push('Campo nombre no puede superar los 150 caracteres');
    }

    if (product.codigo_barras && product.codigo_barras.length > 150) {
        messages.push('Campo nombre no puede superar los 150 caracteres');
    }

    if (messages.length) {
        let error = new Error(messages.join());
        error.statusCode = 400;

        throw error;
    }
}

async function listProducts(queryParameters) {

    let whereAND = ["p.fecha_eliminacion IS NULL"];
    let whereOR = [];
    let where = '';
    if (queryParameters.clave) {
        whereAND.push("p.id ="+queryParameters.clave);
    }

    if (queryParameters.nombre) {
        whereAND.push("(p.nombre ILIKE '%"+queryParameters.nombre+"%' OR m.nombre ILIKE '%"+queryParameters.nombre+"%')");
    }

    if (queryParameters.fecha) {
        whereAND.push("((TO_CHAR(p.fecha_creacion,'YYYY-MM-DD') = '"+queryParameters.fecha+"') OR (TO_CHAR(p.fecha_actualizacion,'YYYY-MM-DD') = '"+queryParameters.fecha+"'))");
    }

    if (whereAND.length > 0) {
        where = whereAND.join(" AND ");
    }

    const rows = await pool.query(
        "SELECT p.id, p.nombre, m.id as marca_id, m.nombre as marca_nombre, p.codigo_barras, p.fecha_creacion, p.fecha_actualizacion " +
        "FROM productos p " +
        "INNER JOIN marcas m on m.id = p.marca_id " +
        "WHERE " + where,
    );
    return rows.rows;
}

async function getOneProduct(productID) {
    const rows = await pool.query(
        "SELECT p.id, p.nombre, m.id as marca_id, m.nombre as marca_nombre, p.codigo_barras, p.fecha_creacion, p.fecha_actualizacion " +
        "FROM productos p " +
        "INNER JOIN marcas m on m.id = p.marca_id " +
        "WHERE p.id = $1 AND p.fecha_eliminacion IS NULL",
        [productID]
    );
    return rows.rows[0];
}

async function create(product) {
    validateCreate(product);

    const { marca_id, codigo_barras, nombre } = product;
    const newProduct = await pool.query(
        "INSERT INTO productos (marca_id, codigo_barras, nombre) VALUES($1, $2, $3) RETURNING *",
        [marca_id, codigo_barras, nombre]
    );
    let message = 'Error al intentar crear el producto';

    if (newProduct.length) {
        return {
            error: message
        };
    }
    return newProduct.rows[0];
}

async function update(productID, product) {
    const { marca_id, codigo_barras, nombre } = product;
    const updateProduct = await pool.query(
        "UPDATE productos SET marca_id = $1, codigo_barras = $2, nombre = $3 WHERE id = $4", 
        [marca_id, codigo_barras, nombre, productID]
    );

    return { message: "Producto actualizado" };
}

async function destroy(productID) {
    const deleteProduct = await pool.query(
        "UPDATE productos set fecha_eliminacion = now() WHERE id = $1", 
        [productID]
    );

    return { message: "Producto eliminado" };
}

module.exports = {
    listProducts,
    getOneProduct,
    create,
    update,
    destroy
}