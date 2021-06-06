const db = require('../database/models');
const {Sequelize} = require('sequelize');

const op = db.Sequelize.Op;

module.exports = {
    agregarTarea: async(req,res,next)=> {
        //obtenemos el Proyecto actual
        const proyecto = await db.Proyecto.findOne({
            where:{
                url: req.params.url
            }
        })
        // Leer el valor del input
        const {tarea} = req.body;

        // Estado 0 = incompleto y ID del proyecto
        const estado = 0;
        const proyectoId = proyecto.id;

        //Insertar en la DB
        const resultado = await db.Tarea.create({tarea, estado, proyectoId});

        if(!resultado){
            return next();
        }

        // Redireccionar
        res.redirect(`/proyectos/${req.params.url}`)
    },

    cambiarEstadoTarea: async(req,res)=>{
        const {id} = req.params;
        const tarea = await db.Tarea.findOne({
            where: {id}
        });

        //cambiar el estado
        let estado = 0
        if(tarea.estado === estado){
            estado = 1;
        }
        tarea.estado = estado

        const resultado = await tarea.save();

        if(!resultado) return next();

        res.status(200).send('Actualizado');
    },

    eliminarTarea: async(req,res)=>{
      
        const {id} = req.params;
        
        const resultado = await db.Tarea.destroy({
                where: {id}
            })
        

        if(!resultado) return next();
        
        res.status(200).send('La tarea ha sido eliminada')
    }
}
