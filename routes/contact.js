var express = require('express');
var router = express.Router();
var db = require('../db/models');


/* GET home page. */
router.get('/', function (req,res,next){

    db.Category.findAll()
        .then(function(categorias){

            if(req.cookies.recordame == undefined){ 
                res.redirect ('/login');
            }else {
                res.render('contact',{errors: '', usuario: req.cookies.recordame,categorias});
            }
        
        })

});

module.exports = router;

