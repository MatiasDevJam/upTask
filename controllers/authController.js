const passport = require('passport');
const db = require('../database/models');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const enviarEmail = require('../handlers/email');

module.exports = {
    
    usuarioAutenticado: (req,res,next)=>{
        //si el usuario esta autenticado, adelante
        if(req.isAuthenticated()){
            return next();
        }
        //Si no esta autenticado, redirigir al formulario
        return res.redirect('/usuarios/iniciar-sesion')
    },

    cerrarSesion: (req,res)=> {
        req.session.destroy(()=>{
            res.redirect('/usuarios/iniciar-sesion');
        })
    },

    //Gereamos un token si el usuario es válido
    enviarToken: async(req,res)=>{
        const {email} = req.body;
        const usuario = await db.Usuario.findOne({
            where: { email}
        });

        //Si el usuario no existe
        if(!usuario){
            req.flash('error', 'No existe esa cuenta');
            res.redirect('/usuarios/reestablecer')
        }

        //Usuario existe
        usuario.token = crypto.randomBytes(20).toString('hex');
        usuario.expiracion = Date.now() + 3600000;

        //Guardamos en la DB
        await usuario.save();

        //URL de reset
        const resetUrl = `http://${req.headers.host}/usuarios/reestablecer/${usuario.token}`;

        //enviamos el correo con el Token
        await enviarEmail.enviar({
            usuario,
            subject: 'Password Reset',
            resetUrl,
            archivo: 'reestablecer-password'
        });

        //Terminar
        req.flash('correcto', 'Se envió un mensaje a tu dirección de e-mail');
        res.redirect('/usuarios/iniciar-sesion');
    },

    validarToken: async(req,res)=>{
        const usuario = await db.Usuario.findOne({
            where: {
                token: req.params.token
            }
        });

        //Si no encuentra el usuario
        if(!usuario){
            req.flash('error', 'No Válido');
            res.redirect('/usuarios/reestablecer');
        }

        //Formulario para generar el password
        res.render('resetPassword',{
            nombrePagina: 'Reestablecer Contraseña'
        })
    },

    actualizarPassword: async(req,res)=>{
        //Verifica el token válido y también la fecha de expiración
        const usuario = await db.Usuario.findOne({
            where:{
                token: req.params.token,
                expiracion: {
                    [Op.gte] : Date.now()
                }
            }
        });

        if(!usuario){
            req.flash('error', 'No Válido');
            res.redirect('/usuarios/reestablecer');
        }

        //Hashear el nuevo password
        usuario.password = bcrypt.hashSync(req.body.password, 10)
        usuario.token = null;
        usuario.expiracion = null;

        //guardamos el nuevo password
        await usuario.save();

        req.flash('correcto', 'Tu contraseña se ha reestablecido correctamente');
        res.redirect('/usuarios/iniciar-sesion');
    }

}

// autenticar el usuario
module.exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/usuarios/iniciar-sesion',
    failureFlash : true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});