const fs = require("fs");
const path = require("path");
var multer = require("multer");
var express = require("express");
var db = require("../db/models");
const { check, validationResult, body } = require("express-validator");

const controller = {
  list: function (req, res) {
    db.Product.findAll(
      { include: [{ association: "brand" }, { association: "category" }] },
      {
        order: [("categories_id1", "DESC")],
      }
    ).then(function (resultados) {
      res.send(resultados);
    });
  },
  detailCategories: function (req, res) {
    var parametros = req.params.id;

    db.Category.findOne(
      {
        where: {
          id: parametros,
        }
      }
    ).
      then(function (categoria) {

        db.Category.findAll()

          .then(function (categorias) {


            db.Product.findAll(
              {
                where: {
                  categories_id1: parametros,
                },
              },
              { include: [{ association: "brand" }, { association: "category" }] }
            )
              .then(function (productos) {

                if (req.cookies.recordame == undefined) {
                  res.render('categories', { usuario: '', productos, categoria: categoria, categorias });
                } else {
                  res.render('categories', { usuario: req.cookies.recordame, productos, categoria: categoria, categorias });
                }
              });
          })

      })


  },

  detail: function (req, res) {
    var productNumber = req.params.id;
    db.Product.findByPk(req.params.id, {
      include: [{ association: "brand" }, { association: "category" }],
    }).then(function (producto) {
      db.Category.findAll().then(function (categorias) {
        if (req.cookies.recordame == undefined) {

          res.render("productDetail", {
            usuario: '',
            producto,
            categorias,
          });
          // res.redirect("/login");
        } else {
          res.render("productDetail", {
            usuario: req.cookies.recordame,
            producto,
            categorias,
          });
        }
      });
    });
  },

  create: function (req, res) {
    db.Category.findAll().then(function (categorias) {
      if (req.cookies.recordame == undefined) {
        res.redirect("/login");
      } else {
        res.render("productAdd", {
          errors: "",
          usuario: req.cookies.recordame,
          categorias,
        });
      }
    });
  },


  add: function (req, res) {
    if (req.cookies.recordame == undefined) {
      res.redirect("/login");
    } else {
      console.log(req.body)
      db.Product.create({
        short_description: req.body.name,
        price: req.body.price,
        long_description: req.body.description,
        image: req.files[0].filename,
        categories_id1:req.body.productCategory
      })
        .then(function (producto) {
          db.Category.findAll().then(function (categorias) {

            console.log(producto)
            res.render("productAdd", {
              errors: "",
              usuario: req.cookies.recordame,
              producto,
              categorias,
            })
              ;
          }).catch(function (err) {
            return res.status(400).json({ message: "issues trying to connect to database" });
          })

            ;
        });
    }
  },








  viewedit: function (req, res) {
    if (req.cookies.recordame == undefined) {
      res.redirect("/login");
    } else {
      db.Product.findByPk(req.params.id).then(function (producto) {
        db.Category.findAll().then(function (categorias) {

          console.log(producto)
          res.render("productEdit", {
            errors: "",
            usuario: req.cookies.recordame,
            producto,
            categorias,
          });
        });
      });
    }
  },

  edit: function (req, res) {
    if (req.cookies.recordame == undefined) {
      res.redirect("/login");
    } else {
      db.Product.update(
        {
          categories_id1: req.body.productCategory,
          image: req.files[0].filename,
          short_description: req.body.name,
          price: req.body.price,
          long_description: req.body.description,
        },
        { where: { id: req.body.productId } }
      ).then(function (result) {
        res.redirect("/admin");
      });
    }
  },

  destroy: function (req, res) {
    db.Product.destroy({ where: { id: req.params.id } }).then(function (
      result
    ) {
      res.redirect("/admin");
    });
  },

  adress: function (req, res) {
    db.Adress.findAll().then(function (resultados) {
      res.send(resultados);
    });
  },
};

module.exports = controller;
