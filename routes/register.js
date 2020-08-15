var express = require('express');
var router = express.Router();
var guestMiddleware = require ('../middlewares/guestMiddleware');


// Para requerir la ruta del controlador

let registerController = require('../controllers/registerController');

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




/* GET Creación de Usuario Nuevo */
/* Esta es la ruta que mostrará la vista con los campos para la creación de un nuevo usuario */

router.get('/', guestMiddleware, registerController.creacionUsuario);

/* POST Toma los datos enviados por Post del formulario de usuarios nuevos y los carga en la base de datos*/
router.post('/',upload.any(),[
    check('nombre').not().isEmpty().withMessage('El campo Nombre es Obligatorio.'),
    check('nombre').isLength({min:2}).withMessage('El campo Nombre debe contener al menos 2 caracteres'),
    check('apellido').not().isEmpty().withMessage('El campo Apellido es Obligatorio.'),
    check('apellido').isLength({min:2}).withMessage('El campo Apellido debe contener al menos 2 caracteres'),
    check('email').not().isEmpty().withMessage('El campo Email es Obligatorio.'),
    check('email').isLength({min:2}).withMessage('El campo Email debe contener al menos 2 caracteres'),
    check('password').not().isEmpty().withMessage('El campo Contraseña es Obligatorio.'),
    check('password').isLength({min:8}).withMessage('El campo Contraseña debe contener al menos 8 caracteres'),
    
  ],registerController.cargarDatosUsuario);
  


module.exports = router;