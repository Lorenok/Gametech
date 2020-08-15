var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.list);
router.get('/search', indexController.search);
router.get('/faq', indexController.preguntas);


module.exports = router;






