const { body } = require('express-validator');
const { validateResult } = require('../utils/validateHelper');
const userService = require('../services/users');

const validateCreate = [ //TODO:name, age, email
    body('nombre')
        .exists()
        .withMessage("Nombre es requerido")
        .custom(async value => {
            if (value.length == 0) {
                // Will use the below as the error message
                throw new Error('El nombre es requerido');
            }
        }),
    body('email')
        .exists()
        .withMessage("Email requerido")
        .isEmail()
        .custom(async value => {
            const existingUser = await userService.findUserByEmail(value)
            if (existingUser) {
                // Will use the below as the error message
                throw new Error('El usuario ya existe con el email');
            }
        }),
    body('password')
        .exists()
        .withMessage("Password requerido")
]

module.exports = { validateCreate }