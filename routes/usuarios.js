var express = require('express');
var router = express.Router();

const {formCrearCuenta, crearCuenta, formIniciarSesion, formReestablecerPass, confirmarCuenta} = 
require('../controllers/usuariosController');
const {autenticarUsuario, cerrarSesion, enviarToken, validarToken, actualizarPassword} = 
require('../controllers/authController')

//Crear cuenta
router.get('/crear-cuenta', formCrearCuenta);
router.post('/crear-cuenta',crearCuenta);
router.get('/confirmar/:correo', confirmarCuenta)

//Iniciar sesión
router.get('/iniciar-sesion', formIniciarSesion);
router.post('/iniciar-sesion', autenticarUsuario);

router.get('/cerrar-sesion', cerrarSesion);

//Reestablecer contraseña
router.get('/reestablecer', formReestablecerPass);
router.post('/reestablecer', enviarToken);
router.get('/reestablecer/:token', validarToken);
router.post('/reestablecer/:token', actualizarPassword);

module.exports = router;