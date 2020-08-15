module.exports = (sequelize, Types) =>{
    const Products = sequelize.define ('Product',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        price:{type:Types.FLOAT(9,2).UNSIGNED,
            allowNull: false},

        brands_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: true},

        categories_id1:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: true},

        short_description:{type:Types.TEXT,
                allowNull: true},

        long_description:{type:Types.TEXT,
                    allowNull: true},
        image :{type:Types.STRING(100),
                        allowNull: true},






    },{
        tableName: "products",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
     Products.associate = function(models){
         //hasOne, hasMany, belongsTo,belongsToMany
         Products.belongsTo(models.Brand,{
             as: "brand",
             foreignKey:"brands_id"
         })
         Products.belongsTo(models.Category,{
             as: "category",
             foreignKey:"categories_id1"
         })
          Products.hasOne(models.Cart_has_product,{
              as: "products_id",
          })

     }


    return Products
    }