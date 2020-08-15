var db = require('../../db/models');


const controller = {
    list: function (req, res) {
        db.Product.findAll({
            include: [
                {
                    association: "brand"
                }, {
                    association: "category"
                }
            ]
        }).then(function (productos) {;
            categoria = [];

            var contadorCategorias = [];
            for (i = 0; i < productos.length; i ++) {
                var tipoCategoria = productos[i].category.dataValues.name
                if (categoria.indexOf(tipoCategoria) == -1) {
                    categoria.push(tipoCategoria)
                    contadorCategorias.push(1)
                } else {
                    contadorCategorias[categoria.indexOf(tipoCategoria)] = contadorCategorias[categoria.indexOf(tipoCategoria)] + 1;
                }
            }

            var contador = [];
            for (i = 0; i < categoria.length; i ++) {

                let categoryName = categoria[i];
                let categoryCantidad = contadorCategorias[i];

                var newValues = {
                    name: categoryName,
                    total: categoryCantidad
                }
                contador.push(newValues)

            }


            var products = [];
            for (i = 0; i < productos.length; i ++) {

                let idProduct = productos[i].id;
                let imagen = productos[i].image;
                let nameProduct = productos[i].short_description;
                let descriptionProduct = productos[i].long_description;
                let categorias = productos[i].category.dataValues.name;
                let detailProduct = 'http://localhost:3000/api/products/' + idProduct;

                var newProducts = {
                    'id': idProduct,
                    'name': nameProduct,
                    'description': descriptionProduct,
                    'categories': categorias,
                    'detail': detailProduct,
                    'image': 'http://localhost:3000/Images/productos/' + imagen
                }
                products.push(newProducts)

            }


            let respuesta = {

                count: productos.length,
                countByCategory: contador,
                productos: products

            }

            res.json(respuesta)
        },)
    },
    detail: function (req, res) {

        db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: "brand"
                }, {
                    association: "category"
                }
            ]
        }).then(function (products) {
            res.json(products)

        })

    },
    'image': function (req, res) {
        db.Product.findByPk(req.params.id).then(function (products) {
            res.send('<img src="/Images/productos/' + products.image + '" height="auto" width="500">')

        })


    }
}

module.exports = controller;
