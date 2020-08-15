var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController');
var multer = require ('multer')
let path = require('path')
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
router.get('/:id?', cartController.list);
router.post('/:id?', cartController.add);


module.exports = router;

