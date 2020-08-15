module.exports = (sequelize, Types) =>{
    const Store = sequelize.define ('Store',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        name:{type:Types.STRING(45)},


        adresses_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},

        
       
    },{
        tableName: "stores",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
    // Products.associate = function(models){
    //     //hasOne, hasMany, belongsTo,belongsToMany
    //     Products.belongsTo(models.Brand,{
    //         as: "brand",
    //         foreignKey:"brands_id"
    //     })

    // }


    return Store
    }