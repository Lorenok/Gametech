var express = require('express');
var router = express.Router();
const db = require('../db/models')

/* GET users listing. */
router.get('/',function(req,res){
    db.User.findAll()
        .then(function(users){
            res.json(users)
        })
});

module.exports = router;
