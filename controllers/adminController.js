var express = require('express');
var db = require('../db/models');



module.exports={
  list: function (req, res) {
    db.Product.findAll({ include: [{ association: "brand" }, 
    { association: "category" }] }).then(function (resultados){
        db.Category.findAll().then(function(categorias){
            if(req.cookies.recordame == undefined){ 
             
            res.redirect ('login');
      }else {
            res.render ('admin',{errors:'',usuario: req.cookies.recordame, resultados,categorias});
      }
      })
    })
},

clients: function (req, res) {
  db.User.findAll().then(function (usuarios){
      db.Category.findAll().then(function(categorias){
          if(req.cookies.recordame == undefined){ 
            
            res.redirect ('login');
    }else {
          res.render ('clientList',{errors:'',usuario: req.cookies.recordame, usuarios,categorias});
    }
    })
  })
},



}

