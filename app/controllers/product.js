//const pool = require('./../../config/db');
const product = require('../services/products');
const url = require('url');
const querystring = require('querystring');

const getProducts = async (req, res) => {
    try {
        res.json(await product.listProducts(req.query))
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

const getOneProduct = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await product.getOneProduct(id))
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

const createProduct = async (req, res) => {
    try {
        res.json(await product.create(req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await product.update(id, req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await product.destroy(id));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

//Crear producto

// exports.createProduct = async(req, res) => {
//     try {
//         const {marca_id, codigo_barras, nombre} = req.body;
//         const newProduct = await pool.query(
//             "INSERT INTO productos (marca_id, codigo_barras, nombre) VALUES($1, $2, $3) RETURNING *",
//             [marca_id, codigo_barras, nombre]
//         )
//         res.json(newProduct.rows[0]);
//     } catch (err) {
//         console.log("Ocurreior un error");
//         console.log(err);
//     }
// }