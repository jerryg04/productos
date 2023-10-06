const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authorization');
const productController = require('../controllers/product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - marca_id
 *         - nombre
 *         - codigo_barras
 *       properties:
 *         id:
 *           type: integer
 *           description: Autoincrementable id de un producto
 *         nombre:
 *           type: string
 *           description: Nombre del producto
 *         marca_id:
 *           type: string
 *           description: Identificador de la marca
 *         codigo_barras:
 *           type: string
 *           description: Código de barras del producto
 *         fecha_creacion:
 *           type: string
 *           description: Fecha de alta del producto
 *         fecha_actualizacion:
 *           type: string
 *           description: Fecha de actualización del producto
 *       example:
 *         marca_id: 1
 *         nombre: Frijol a granel
 *         codigo_barras: 87876667
 */

// Obtener todos los productos
/**
 * @swagger
 * tags:
 *   name: Products
 * /api/v1/products:
 *   get:
 *     summary: Retorna todos los productos
 *     tag: [Products]
 *     parameters:
 *       - in: query
 *         name: clave
 *         type: integer
 *         description: Es identificador del producto
 *       - in: query
 *         name: nombre
 *         type: string
 *         description: Podra ser el nombre del producto o nombre de la marca
 *       - in: query
 *         name: fecha
 *         type: string
 *         description: Podra ser el nombre del producto o nombre de la marca con el formato YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', authenticateToken, productController.getProducts);

// Obtener un producto
/**
 * @swagger
 * tags:
 *   name: Products
 * /api/v1/products/{id}:
 *   get:
 *     summary: Retorna un producto
 *     tag: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Producto por id
 *     responses:
 *       200:
 *         description: Obtiene un producto creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encntrado
 */
router.get('/:id', authenticateToken, productController.getOneProduct);

// Crear producto
/**
 * @swagger
 * tags:
 *   name: Products
 * /api/v1/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Nuevo producto creado
 */
router.post('/', authenticateToken, productController.createProduct);

// Actualizar un producto mediante su id
router.patch('/:id', authenticateToken, productController.updateProduct);
/**
 * @swagger
 * tags:
 *   name: Products
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Actualiza un producto
 *     tag: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: el producto por id
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */

// Eliminar un producto mediante su id
/**
 * @swagger
 * tags:
 *   name: Products
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tag: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: el producto por id
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;