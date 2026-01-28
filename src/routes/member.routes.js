const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

// -------------- Ruta registrar socio --------------
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Registrar un nuevo socio
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Socio registrado correctamente
 *       400:
 *         description: Error de validación o socio duplicado
 *       401:
 *         description: Token inválido
 */
router.post('/', memberController.register);

// -------------- Ruta de listado ---------------
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Obtener listado de socios
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de socios
 *       401:
 *         description: Token inválido
 */
router.get('/', memberController.getAll);

// -------------- Ruta para obtener un socio --------------
/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Obtener un socio por ID
 *     tags: [Members]
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
 *         description: Socio encontrado
 *       404:
 *         description: Socio no encontrado
 *       401:
 *         description: Token inválido
 */
router.get('/:id', memberController.getById);

// -------------- Ruta para actualizar socio --------------
/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Actualizar un socio
 *     tags: [Members]
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
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Socio actualizado correctamente
 *       404:
 *         description: Socio no encontrado
 *       401:
 *         description: Token inválido
 */
router.put('/:id', memberController.update);

// ------------- Ruta para eliminar un socio --------------
/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Eliminar un socio
 *     tags: [Members]
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
 *         description: Socio eliminado correctamente
 *       404:
 *         description: Socio no encontrado
 *       401:
 *         description: Token inválido
 */
router.delete('/:id', memberController.remove);

module.exports = router;