module.exports = (sequelize, Types) =>{
    const Address = sequelize.define ('Adress',{
        id:{type: Types.INTEGER(10).UNSIGNED,
        autoIncrement:true,
        primaryKey: true},

        street:{type:Types.STRING(45)},
        number:{type:Types.STRING(45)},
        zipcode:{type:Types.STRING(45) },
        

    },{
        tableName: "addresses",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)
    Address.associate = function(models){
    //hasOne, hasMany, belongsTo,belongsToMany
    Address.hasMany(models.Store,{
        as: "addresses_id",})

}
    Address.associate = function(models){
    //hasOne, hasMany, belongsTo,belongsToMany
    Address.hasMany(models.Customer,{
        as: "addresses_id",})

}

    return Address
    }