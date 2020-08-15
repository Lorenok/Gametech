var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
var logMiddleware = require ('../middlewares/logMiddleware');


/* GET users listing. */
router.get('/', usersController.list);
router.get('/admin', usersController.admin);
router.post('/admin', usersController.products);

router.get('/check', function(req, res){
    if(req.session.usuarioLogueado == undefined){
        res.send ("No esta logueado");
    }else {
        res.send("el usuario logueado es " + req.session.usuarioLogueado);
    }
  })
module.exports = router;

