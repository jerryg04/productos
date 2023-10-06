const { body } = require('express-validator');
const brand = require('../services/brands');

const validateCreate = [ //TODO:name, age, email
    body('marca_id')
        .exists()
        .withMessage("Identificador de la marca es requerido")
        .custom(async value => {
            const existingBranch = await brand.getOneBrand(value);
            if (existingBranch == undefined) {
                throw new Error('El identificador no existe');
            }
        }),
    body('nombre')
        .exists()
        .withMessage("Nombre es requerido")
        .custom(async value => {
            if (value.length == 0) {
                throw new Error('Nombre es requerido');
            }
            if (value.length > 150) {
                throw new Error('Nombre no puede superar los 150 caracteres');
            }
        }),
    body('codigo_barras')
        .exists()
        .withMessage("Codigo barras es requerido")
        .custom(async value => {
            if (value.length == 0) {
                throw new Error('Codigo barras es requerido');
            }
            if (value.length > 150) {
                throw new Error('Codigo barras no puede superar los 30 caracteres');
            }
        })
]

module.exports = { validateCreate }