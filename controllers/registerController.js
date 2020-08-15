// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para tomar los valores de los errores que se presenten en la validación usada 
// con express validator en la ruta

const {check,validationResult,body}=require('express-validator');

// Para conectar con la base de datos definida en los modelos:

const db = require('../db/models');
const { getMaxListeners } = require('process');


// Inicio del controlador

const registerController = {


    'creacionUsuario': function(req, res, next) {
  
        res.render('createuser',{pageCss: 'register.css',statusRegistracion: ''});
      
      },

    'cargarDatosUsuario': function(req, res, next) {

      const datosArchivo = req.files[0];

     
      // valida si los datos ingresados por el usuario son válidos o no

      let errors = validationResult(req);

      if(errors.isEmpty() && (datosArchivo.mimetype=='image/jpeg' || datosArchivo.mimetype=='image/jpg' || datosArchivo.mimetype=='image/png' || datosArchivo.mimetype=='image/gif')){

        // JPG, JPEG, PNG, GIF

        let password = bcrypt.hashSync(req.body.password,12);
      
        let newUser = {
        
          name: req.body.nombre,
          lastname: req.body.apellido,
          email: req.body.email,
          password: password,
          avatar: req.files[0].filename,
         
        };


        db.User.findAndCountAll({
          where: {
            email: newUser.email,
          },
        }).then((results) => {
          // console.log(results.count);

          if(results.count >= 1){

            // console.log('La cantidad de coincidencias de ' + newUser.email + ' son ' + results.count)

            res.render('createuser', {errors: errors.errors,pageCss: 'register.css',statusRegistracion: 'Usuario ya existente.'});


          }else{
            //  Para Crear un nuevo registro o usuario en la base de datos
              db.User.create({

                email: newUser.email,
                password:newUser.password,
                avatar: newUser.avatar,
                name: newUser.name,
                lastname: newUser.lastname

              });
              
              res.redirect('/');  
          }

          // console.log(results.rows);
        });



              
      }else{
        

        res.render('createuser', {errors: errors.errors,pageCss: 'register.css',statusRegistracion: 'Error en el ingreso de los datos.'});

      }
      
    }

}

module.exports = registerController