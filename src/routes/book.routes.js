const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller.js');
const authMiddleware = require('../middlewares/auth.middleware');

// todas las rutas de libro son privadas
router.use(authMiddleware);

// ------------- Ruta crear libro -----------------
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Crear un libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - editorial
 *               - editionDate
 *               - language
 *               - pages
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean Code
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *               editorial:
 *                 type: string
 *                 example: Pearson
 *               editionDate:
 *                 type: string
 *                 example: 2008-08-01
 *               language:
 *                 type: string
 *                 example: Español
 *               pages:
 *                 type: integer
 *                 example: 464
 *     responses:
 *       201:
 *         description: Libro creado
 *       400:
 *         description: Error de validación
 */
router.post('/', bookController.create);

// ------------ Ruta listado ----------------
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de libros
 *       401:
 *         description: No autorizado
 */
router.get('/', bookController.getAll);

// ------------ Ruta para obtener un libro --------------
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Libro encontrado
 *       404:
 *         description: Libro no encontrado
 */
router.get('/:id', bookController.getById);

// ------------ Ruta para actualizar libro --------------
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Actualizar un libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean Code (2nd Edition)
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *     responses:
 *       200:
 *         description: Libro actualizado
 *       404:
 *         description: Libro no encontrado
 */
router.put('/:id', bookController.update);

// ------------ Ruta para eliminar libro ---------------
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Libro eliminado
 *       404:
 *         description: Libro no encontrado
 */
router.delete('/:id', bookController.remove);

module.exports = router;

