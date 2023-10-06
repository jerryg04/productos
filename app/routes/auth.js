const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const { validateCreate } = require('../validators/auth');

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
 *     NewAuth:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - password
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         nombre: Gerardo Gomez
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

// Registrar nuevo usuario
/**
 * @swagger
 * tags:
 *   name: Auth
 * /api/v1/auth/register:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAuth'
 *     responses:
 *       200:
 *         description: Nueva usuario creado
 */
router.post('/register', validateCreate, authController.register);

module.exports = router;