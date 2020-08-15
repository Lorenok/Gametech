module.exports = (sequelize, Types) =>{
    const Cart = sequelize.define ('Cart',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        purchased_at:{type:Types.DATE,
            allowNull: false},

        total:{type:Types.FLOAT(9,2).UNSIGNED,
            allowNull: false,
            defaultValue:0.00},

        users_id:{type:Types.BIGINT(20).UNSIGNED},

       
    },{
        tableName: "carts",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
     Cart.associate = function(models){
         //hasOne, hasMany, belongsTo,belongsToMany
         Cart.hasOne(models.Cart_has_product,{
            as: "carts",
        })
        Cart.belongsTo(models.User,{
            as: "user",
            foreignKey:"users_id"
        })
        
     }


    return Cart
    }