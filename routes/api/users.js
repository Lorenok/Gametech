var express = require('express');
var router = express.Router();
let path = require('path')
var apiUsersController = require('../../controllers/api/apiUsersController')
var app = express();


/* GET products listing. */
router.get('/', apiUsersController.list);
router.get('/:id?', apiUsersController.detail);



module.exports = router;