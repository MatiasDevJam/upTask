var express = require('express');
var router = express.Router();
const {index, formularioProyecto, nuevoProyecto, proyectoPorUrl, formularioEditar, actualizarProyecto,
    eliminarProyecto} = require("../controllers/proyectosController");
const {agregarTarea} = require('../controllers/tareasController');
const proyectoValidator = require('../validations/proyectoValidator');
const {usuarioAutenticado} = require('../controllers/authController')

router.get('/', usuarioAutenticado, index);
router.get('/nuevo-proyecto', usuarioAutenticado, formularioProyecto);
router.post('/nuevo-proyecto', usuarioAutenticado, proyectoValidator, nuevoProyecto);

//Listar proyecto
router.get('/proyectos/:url', usuarioAutenticado, proyectoPorUrl);

//Actualizar proyecto
router.get('/proyecto/editar/:id', usuarioAutenticado, formularioEditar);
router.post('/nuevo-proyecto/:id', usuarioAutenticado, proyectoValidator, actualizarProyecto);

//Eliminar proyecto
router.delete('/proyectos/:url', usuarioAutenticado, eliminarProyecto);
router.post('/proyectos/:url', usuarioAutenticado, agregarTarea);

module.exports = router;
