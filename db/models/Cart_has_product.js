module.exports = (sequelize, Types) =>{
    const Cart_has_product = sequelize.define ('Cart_has_product',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        carts_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},
        
        products_id:{type:Types.BIGINT(20).UNSIGNED,
                allowNull: false},

        price:{type:Types.FLOAT(9,2).UNSIGNED,
            allowNull: false},

        qty:{type:Types.BIGINT(5).UNSIGNED,
                allowNull: false,
                defaultValue: 1},

        

    },{
        tableName: "carts_has_products",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
     Cart_has_product.associate = function(models){
        // hasOne, hasMany, belongsTo,belongsToMany
        //  Cart_has_product.belongsTo(models.Product,{
        //      as: "product",
        //      foreignKey:"products_id"
        //  })
         Cart_has_product.belongsTo(models.Cart,{
            as: "cart",
            foreignKey:"carts_id"
        })

     }


    return Cart_has_product
    }