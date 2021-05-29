var express = require('express');
var router = express.Router();
const {index, formularioProyecto, nuevoProyecto, proyectoPorUrl} = require("../controllers/proyectosController");
const proyectoValidator = require('../validations/proyectoValidator')

router.get('/', index);
router.get('/nuevo-proyecto', formularioProyecto);
router.post('/nuevo-proyecto', proyectoValidator, nuevoProyecto);

//listar proyecto
router.get('/proyectos/:url', proyectoPorUrl)

module.exports = router;
