module.exports = (sequelize, Types) =>{
    const Customer = sequelize.define ('Customer',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        birthdate:{type:Types.DATE},

        adresses_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},

        users_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},

       
    },{
        tableName: "customers",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })

     Customer.associate = function(models){
        //hasOne, hasMany, belongsTo,belongsToMany
         Customer.belongsTo(models.User,{
            as: "user",
            foreignKey:"users_id"
         })
         Customer.belongsTo(models.Adress,{
            as: "address",
            foreignKey:"adresses_id"
         })
        }


    return Customer
    }