var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

var multer = require ('multer')
let path = require('path')
var productController = require('../controllers/productController')

var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'..','public/images/productos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', adminController.list)
router.get('/clients', adminController.clients);


module.exports = router;

