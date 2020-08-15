module.exports = (sequelize, Types) =>{
    const User = sequelize.define ('User',{
        id:{type: Types.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement:true,
            primaryKey: true},

        email: {type:Types.STRING(100),
             allowNull: false},

        password:{type:Types.STRING(100),
                allowNull: false},

        avatar:{type:Types.STRING(100),
                allowNull: false},

        name:{type:Types.STRING(45),
                allowNull: false},

        lastname:{type:Types.STRING(45),
            allowNull: false},

    },{
        tableName: "users",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
    User.associate = function(models){
        //hasOne, hasMany, belongsTo,belongsToMany
        User.hasOne(models.Cart,{
           as: "cart",
       })
       User.hasOne(models.Customer,{
        as: "customer",
    })
    }


    return User
    }