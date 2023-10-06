const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authorization');
const brandController = require('../controllers/brand');

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *       properties:
 *         id:
 *           type: integer
 *           description: Autoincrementable id de una marca
 *         nombre:
 *           type: string
 *           description: Nombre de un marca
 *         activo:
 *           type: integer
 *           description: Activación de una marca
 *       example:
 *         nombre: Donde
 *         activo: 1
 */

// Obtener todas las marcas
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands:
 *   get:
 *     summary: Retorda todas las marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Todas las marcas.
 */
router.get('/', authenticateToken, brandController.getBrands);

// Obtenie el catalogo de marcas activas
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands/catalog:
 *   get:
 *     summary: Retorda todas las marcas activas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Todas las marcas activas.
 */
router.get('/catalog', authenticateToken, brandController.getCatalogBrands);

// Obtener una marca
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands/{id}:
 *   get:
 *     summary: Retorna una marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Marca por id
 *     responses:
 *       200:
 *         description: Obtiene una marca creada
 */
router.get('/:id', authenticateToken, brandController.getOneBrand);

// Crear una marca
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands:
 *   post:
 *     summary: Crea una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Nueva marca creada
 */
router.post('/', authenticateToken, brandController.createBrand);

// Actualizar una marca por id
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands/{id}:
 *   patch:
 *     summary: Actualiza una nueva marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La marca por id
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Marca actualizada
 *       404:
 *         description: Marca no encontrada
 */
router.patch('/:id', authenticateToken, brandController.updateBrand);

// Activar o desactivar la marca por id
// Actualizar una marca por id
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands/{id}/{active}:
 *   patch:
 *     summary: Actualiza una nueva marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La marca por id
 *       - in: path
 *         name: active
 *         schema:
 *           type: string
 *         required: true
 *         description: Activa o desactiva la marca
 *     responses:
 *       200:
 *         description: Marca actualizada
 *       404:
 *         description: Marca no encontrada
 */
router.patch('/:id/:active', authenticateToken, brandController.activeBranch);

// Eliminar una marca por su id
/**
 * @swagger
 * tags:
 *   name: Brands
 * /api/v1/brands/{id}:
 *   delete:
 *     summary: Elimina una nueva marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: La marca por id
 *     responses:
 *       200:
 *         description: Marca actualizada
 *       404:
 *         description: Marca no encontrada
 */
router.delete('/:id', authenticateToken, brandController.deleteBrand);

module.exports = router;