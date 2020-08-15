var express = require("express");
var db = require("../db/models");
var Sequelize = require("sequelize");
//const { notIn } = require('sequelize/types/lib/operators');
//var op = Sequelize.Op;

module.exports = {
  list: function (req, res) {
    db.Product.findAll(
      {
        where: {
          categories_id1: 4,
        },
      },
      { include: [{ association: "brand" }, { association: "category" }] }
    ).then(function (productos) {
      db.Category.findAll().then(function (categorias) {
        // console.log(productos)
        if (req.cookies.recordame == undefined) {
          res.render("index", {
            errors: "",
            usuario: "",
            productos,
            categorias,
            'total': productos.length
          });
        } else {
          res.render("index", {
            usuario: req.cookies.recordame,
            productos,
            categorias,
          });
        }
      });
    });
  },

  preguntas: function (req, res) {
    db.Product.findAll({
      include: [{ association: "brand" }, { association: "category" }],
    }).then(function (resultados) {
      db.Category.findAll().then(function (categorias) {
        let productos = resultados;
        if (req.cookies.recordame == undefined) {
          res.render("faq", { usuario: "", categorias, productos });
        } else {
          res.render("faq", {
            usuario: req.cookies.recordame,
            productos,
            categorias,
          });
        }
      });
    });
  },

  search: function (req, res) {
    var datoABuscar = req.query.query;
    // console.log(req.query.query)

    db.Product.findAll(
      {
        where: {
          short_description: { [db.Sequelize.Op.substring]: "%" + datoABuscar },
        },
      },
      { include: [{ association: "brand" }, { association: "category" }] }
    ).then(function (productos) {

      console.log('Estos son los productos coincidentes con la búsqueda')
      console.log(productos)

      if(productos.length != 0){
        db.Category.findAll({
          where: {
            name: { [db.Sequelize.Op.substring]: "%" + datoABuscar },
          },
        }).then(function (categorias1) {
          db.Brand.findAll({
            where: {
              name: { [db.Sequelize.Op.substring]: "%" + datoABuscar },
            },
          }).then(function (brand) {
            db.Category.findAll().then(function (categorias) {
              var resultados = [productos, brand, categorias1];
              if (req.cookies.recordame == undefined) {
                res.render("search", {
                  usuario: "",

                  categorias,
                  productos,
                  brand,
                  categorias1,
                  datoABuscar,
                });
              } else {
                res.render("search", {
                  usuario: req.cookies.recordame,
                  productos,
                  categorias,
                  categorias1,
                  brand,
                  datoABuscar,
                });
              }
            });
          });
        });

      }else{

        let categorias = {}

        db.Category.findAll()
        .then(function(categorias){

        })


        res.render("search", {
          usuario: "",
          categorias: categorias,
          productos: [{dataValues:''}],
          // brand,
          // categorias1,
          datoABuscar: datoABuscar,
        });

        
      }


    })
    // .catch(function (err) {

    //   res.send('Esto es un error.');

    //   throw err;
    // })

  }
};
