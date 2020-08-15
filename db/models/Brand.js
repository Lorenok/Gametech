module.exports = (sequelize, Types) =>{
    const Brand = sequelize.define ('Brand',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
        autoIncrement:true,
        primaryKey: true},

        name:{type:Types.STRING(45)},

    },{
        tableName: "brands",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

// Brand.associate = function(models){
//     //hasOne, hasMany, belongsTo,belongsToMany
//         Brand.hasOne(models.Product,{
//         as: "products",
//     })

// }

    return Brand
    }