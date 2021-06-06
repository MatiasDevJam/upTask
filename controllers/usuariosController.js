const db = require('../database/models');
const enviarEmail = require('../handlers/email');

module.exports = {
    formCrearCuenta: (req,res)=>{
        res.render('crearCuenta', {
            nombrePagina: 'Crear Cuenta en Uptask'
        })
    },

    formIniciarSesion: (req,res)=>{
        const {error} = res.locals.mensajes;
        res.render('iniciarSesion', {
            nombrePagina: 'Iniciar Sesión en Uptask',
            error
        })
    },

    crearCuenta: async (req,res)=>{
          // leer los datos
    const { email, password} = req.body;

    try {
        // crear el usuario
        await db.Usuario.create({
            email, 
            password
        });

        // crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/usuarios/confirmar/${email}`;

        // crear el objeto de usuario
        const usuario = {
            email
        }

        // enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask', 
            confirmarUrl, 
            archivo : 'confirmar-cuenta'
        });
        
        // redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
        res.redirect('/usuarios/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina : 'Crear Cuenta en Uptask', 
            email,
            password
        })
    }
        
        
    },

    formReestablecerPass: (req, res)=>{
        res.render('reestablecer',{
        nombrePagina: 'Reestablecer tu Contraseña'
    })
    },
    //Cambiamos el estado de la cuenta
    confirmarCuenta: async(req,res)=>{
        const usuario = await db.Usuario.findOne({
            where:{
                email: req.params.correo
            }
        });

        //Si no existe el usuario
        if(!usuario){
            req.flash('error', 'No Válido');
            res.redirect('/usuarios/crearCuenta');
        }

        usuario.activo = 1;
        await usuario.save();

        req.flash('correcto', 'Cuenta activada correctamente');
        res.redirect('/usuarios/iniciar-sesion');
    }
}