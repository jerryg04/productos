const brand = require('../services/brands');


// Obtener todas las marcas
const getBrands = async (req, res) => {
    try {
        res.json(await brand.listBrands())
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Listara el catalogo de marcas activas
const getCatalogBrands = async (req, res) => {
    try {
        res.json(await brand.catalogBrands())
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Obtener una marca
const getOneBrand = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await brand.getOneBrand(id))
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Crea una marca
const createBrand = async (req, res) => {
    try {
        res.json(await brand.create(req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Actualiza una marca por id
const updateBrand = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await brand.update(id, req.body));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Activar o inactivar una marca por id
const activeBranch = async (req, res) => {
    console.log("active branch");
    try {
        res.json(await brand.active(req.params.id, req.params.active));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

// Elimina una marca por id
const deleteBrand = async (req, res) => {
    try {
        const {id} = req.params;
        res.json(await brand.destroy(id));
    } catch (err) {
        console.log("Ocurrio un error");
        console.log(err);
    }
}

module.exports = {
    getBrands,
    getCatalogBrands,
    getOneBrand,
    createBrand,
    updateBrand,
    activeBranch,
    deleteBrand
}