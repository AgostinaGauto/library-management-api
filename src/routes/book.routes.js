const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller.js');
const authMiddleware = require('../middlewares/auth.middleware');

// todas las rutas de libro son privadas
router.use(authMiddleware);

// ------------- Ruta crear libro -----------------
router.post('/', bookController.create);
// ------------ Ruta listado ----------------
router.get('/', bookController.getAll);
// ------------ Ruta para obetener un libro --------------
router.get('/:id', bookController.getById);
// ------------ Ruta para actualizar libro --------------
router.put('/:id', bookController.update);
// ------------ Ruta para eliminar libro ---------------
router.delete('/:id', bookController.remove);

module.exports = router;

