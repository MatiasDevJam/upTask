var express = require('express');
var router = express.Router();

const {cambiarEstadoTarea, eliminarTarea} = require('../controllers/tareasController');
const {usuarioAutenticado} = require('../controllers/authController')

//actualizar tarea
router.patch('/:id', usuarioAutenticado, cambiarEstadoTarea);

//Eliminar tarea
router.delete('/:id', usuarioAutenticado ,eliminarTarea);

module.exports = router;