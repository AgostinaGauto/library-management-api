const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repair.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

// -------------- Ruta para crear una reparacion --------------
router.post('/', repairController.start);
// ------------- Ruta para actualizar reparacion --------------
router.put('/:id', repairController.update);
// ------------- Ruta para eliminar una reparacion --------------
router.delete('/:id', repairController.remove);
// ------------- Ruta para obtener las reparaciones activas --------------
router.get('/active', repairController.getActive);

module.exports = router;