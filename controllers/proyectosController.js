module.exports = {
    index: (req,res)=>{
        res.render("index",{
        nombrePagina : 'Proyectos'})
    },

    formularioProyecto: (req,res)=>{
        res.render('nuevoProyecto',{
            nombrePagina : 'Nuevo Proyecto'
        })
    },

    nuevoProyecto: (req,res)=>{
        //Validamos el imput de nuevo proyecto

        const {nombre} = req.body;

        let errores = [];

        //Si nombre no existe agregmos el error a el array errores
        if(!nombre){
            errores.push({'texto': 'Agregá un Nombre al Proyecto'})
        }
        else{
            
        }

        //Si hay errores
        if(errores.length > 0){
            res.render('nuevoProyecto',{
                nombrePagina : 'Nuevo Proyecto',
                errores
            })
        }
    }

}