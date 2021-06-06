const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    let alias = 'Usuario';

    let cols = {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: {
                args: true,
                msg: 'El email ya se encuentra registrado'
            },
            validate:{
                isEmail:{
                    msg: 'Agregá un email válido'
                },
                notEmpty:{
                    msg:'Favor ingrese un email'
                }
            }
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg:'Favor ingrese una contraseña'
                }
            }
        }, 
        activo: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        token: {
            type: DataTypes.STRING
        },
        expiracion: {
            type: DataTypes.DATE
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps : false,

    };


    const Usuario = sequelize.define(alias, cols, config);
        
    //Hook para hashear la contraseña
    Usuario.addHook('beforeCreate', (usuario) => {
         usuario.password = bcrypt.hashSync(usuario.password, 10)
      });

    //Métodos personalizados
    Usuario.prototype.verificarPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }
    

    Usuario.associate = function(models){
        Usuario.hasMany(models.Proyecto,{
            as: 'proyectos',
            foreignKey: 'usuarioId'
        })
    }

    return Usuario;
}