const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

// -------------- Ruta registrar socio --------------
router.post('/', memberController.register);
// -------------- Ruta de listado ---------------
router.get('/', memberController.getAll);
// -------------- Ruta para obtener un socio --------------
router.get('/:id', memberController.getById);
// -------------- Ruta para actualizar socio --------------
router.put('/:id', memberController.update);
// ------------- Ruta para eliminar un socio --------------
router.delete('/:id', memberController.remove);

module.exports = router;