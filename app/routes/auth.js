const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: gergi.gomez@gmail.com
 *         password: 09##
 */

//Loguin del usuario
/**
 * @swagger
 * tags:
 *   name: Auth
 * /api/v1/auth/login:
 *   post:
 *     summary: Login para acceso al sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Usuario logueado con exito
 */
router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;