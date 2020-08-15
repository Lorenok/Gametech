var express = require('express');
var router = express.Router();
let path = require('path')
var apiProductController = require('../../controllers/api/apiProductController')
var app = express();


/* GET products listing. */
router.get('/', apiProductController.list);
router.get('/:id?', apiProductController.detail)
router.get('/:id/image', apiProductController.image)



module.exports = router;