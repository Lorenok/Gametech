var express = require('express');
var router = express.Router();

// Para requerir la ruta del controlador

let loginController = require('../controllers/loginController');

// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para validar campos usando express validator
const {check,validationResult,body}=require('express-validator');



// Para cargar un archivo (imagen avatar):

let path = require('path');

const multer = require('multer');
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/Images/avatar-users');
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
  }
}); 

var upload = multer({storage:storage});


/* GET Register. */
/* Esta es la ruta que va presentar la vista para el ingreso de la información para el */
/* loggin del usuario */

router.get('/', loginController.ingreso);



/* GET Status Usuario */ 
/* Esta es la ruta para cuando el usuario ingresado NO está registrado o es incorrecto el email o contraseña */

// (Registrado o NO registrado o con errores de ingreso de usuario o clave) */
router.get('/:id', loginController.status);


/* POST Validation. */
// Esta es la ruta que valida los datos enviados en el formulario de login del usuario

router.post('/',[
  check('password').isLength({min:8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
],loginController.validation);




module.exports = router;