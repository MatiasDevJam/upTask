module.exports = (sequelize, DataTypes) => {

    let alias = 'Tarea';

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        tarea: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        estado: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        }, 
        proyectoId: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
        
    };

    let config = {
        tableName: "tareas",
        timestamps : false,
    };


    const Tarea = sequelize.define(alias, cols, config);

    Tarea.associate = function(models){
        Tarea.belongsTo(models.Proyecto,{
            as: 'proyectos',
            foreignKey: 'proyectoId'
        })
    }
    return Tarea;

}