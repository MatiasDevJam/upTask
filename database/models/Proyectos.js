//Importamos slug para las formatear las url
const slug = require('slug')
//Importamos short id para crear un id único a la url
const shortid = require('shortid')

module.exports = (sequelize, DataTypes) => {

    let alias = 'Proyecto';

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(100),
        }, 
        usuarioId: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
        
    };

    let config = {
        tableName: "proyectos",
        timestamps : false,
    };


    const Proyecto = sequelize.define(alias, cols, config);

    Proyecto.addHook('beforeValidate', (proyecto) => {
        const url = slug(proyecto.nombre).toLowerCase();

        //Llamamos al metodo generate de shortid para crear un ID único
        proyecto.url = `${url}-${shortid.generate()}`;
      });
        

    return Proyecto;
}