module.exports = (sequelize, Types) =>{
    const Category = sequelize.define ('Category',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull:false,
        autoIncrement:true,
        primaryKey: true},

        name:{type:Types.STRING(45),
                allowNull:false},

    },{
        tableName: "categories",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)

// Category.associate = function(models){
//     //hasOne, hasMany, belongsTo,belongsToMany
//         Category.hasOne(models.Product,{
//         as: "products",
//     })

// }

    return Category
    }