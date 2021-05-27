var express = require('express');
var router = express.Router();
const proyectosController = require("../controllers/proyectosController")

router.get('/', proyectosController.index);
router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);

module.exports = router;
