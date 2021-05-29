const db = require('../database/models');
const {Sequelize} = require('sequelize');
const slug = require('slug');
const op = db.Sequelize.Op;


module.exports = {
    index: async(req,res)=>{
        const proyectos = await db.Proyecto.findAll(
            {
                order: [
                    ['nombre', 'ASC']
                ],
                limit: 10
            }
        
        );

        res.render("index",{
        nombrePagina : 'Proyectos',
        proyectos})
    },
    
    formularioProyecto: async(req,res)=>{
        const proyectos = await db.Proyecto.findAll();
        res.render('nuevoProyecto',{
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    })

    },
    
    nuevoProyecto: async(req, res)=> {
        const proyectos = await db.Proyecto.findAll();
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
           
           const proyecto = await db.Proyecto.create({nombre , url})
           res.redirect('/')
        }
    },

    proyectoPorUrl: async(req,res,next) =>{
        const proyectos = await db.Proyecto.findAll();
        const proyecto = await db.Proyecto.findOne({
            where: {
                url: req.params.url
            }
        });
        if(!proyecto) return next();

        res.render('tareas',{
            nombrePagina: 'Tareas del Proyecto',
            proyecto,
            proyectos
        })
    }
}