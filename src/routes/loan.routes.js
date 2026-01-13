const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/loan.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// todas las rutas de prestamo son privadas
router.use(authMiddleware);

// --------------- Ruta libros disponibles ----------------
router.get('/available-books', LoanController.getBooks);
// --------------- Ruta crear prestamo ----------------
router.post('/', LoanController.create);
// --------------- Ruta para devolver presdtamo ---------------
router.put('/:id/return', LoanController.returnLoan);
// --------------- Ruta eliminar prestamo ----------------
router.delete('/:id', LoanController.remove);

module.exports = router;