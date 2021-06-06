const db = require('../database/models');
const {Sequelize} = require('sequelize');
const slug = require('slug');
const op = db.Sequelize.Op;


module.exports = {
    index: async(req,res)=>{
        const usuarioId = res.locals.usuario.id;
        const proyectos = await db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });

        res.render("index",{
        nombrePagina : 'Proyectos',
        proyectos})
    },
    
    formularioProyecto: async(req,res)=>{
        const usuarioId = res.locals.usuario.id;
        const proyectos = await db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });
        res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    })

    },
    
    nuevoProyecto: async(req, res)=> {
        const usuarioId = res.locals.usuario.id;
        const proyectos = await db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });
        //Validar que tengamos alogo en el body
        const {nombre, url} = req.body;

        let errores = [];

        if(!nombre) {
            errores.push({'texto' : 'Agregá un nombre al Proyecto'})
        }
        
        //Si hay errores
        if(errores.length > 0){
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto',
                errores,
                proyectos
            })
        }
        //Si no hay errores, insertamos en la base de datos
        else{
           const usuarioId = res.locals.usuario.id;
           await db.Proyecto.create({nombre , usuarioId})
           res.redirect('/')
        }
    },

    proyectoPorUrl: async(req,res,next) =>{
        const usuarioId = res.locals.usuario.id;
        const proyectosPromise = db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });
        const proyectoPromise = db.Proyecto.findOne({
            where:{
                url: req.params.url,
                usuarioId
            }
        });

        //Destructuring de proyecto y proyectos
        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        //Consultar tareas del proyecto actual
        const tareas = await db.Tarea.findAll({
            where:{
                proyectoId: proyecto.id
            },
            /* include: [
                {model: db.Proyecto, as: 'proyectos'}
            ] */
        });
        console.log(tareas)
        
        if(!proyecto) return next();

        res.render('tareas',{
            nombrePagina: 'Tareas del Proyecto',
            proyectos,
            proyecto,
            tareas
        })
    },

    formularioEditar: async(req, res)=>{
        
        const usuarioId = res.locals.usuario.id;
        const proyectosPromise = db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });
        const proyectoPromise = db.Proyecto.findOne({
            where:{
                id: req.params.id,
                usuarioId
            }
        });

        //Destructuring de proyecto y proyectos
        const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        res.render('nuevoProyecto',{
            nombrePagina : 'Editar Proyecto',
            proyectos,
            proyecto
    })
    },

    actualizarProyecto: async(req, res)=> {
        const usuarioId = res.locals.usuario.id;
        const proyectos = await db.Proyecto.findAll({
            where: {
                usuarioId
            }
        });
        //Validar que tengamos alogo en el body
        const {nombre, url} = req.body;

        let errores = [];

        if(!nombre) {
            errores.push({'texto' : 'Agregá un nombre al Proyecto'})
        }
        
        //Si hay errores
        if(errores.length > 0){
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto',
                errores,
                proyectos
            })
        }
        //Si no hay errores, insertamos en la base de datos
        else{
           
           await db.Proyecto.update({nombre: nombre},{
               where: {
                   id: req.params.id
               }}
            )
           res.redirect('/')
        }
    },

    eliminarProyecto: async(req,res,next)=>{
        const {urlProyecto} = req.query;

        const resultado =  await db.Proyecto.destroy({
            where: {url: urlProyecto}
        });

        if(!resultado){
            return next();
        }

        res.status(200).send('Poyecto eliminado correctamente')
    },
}