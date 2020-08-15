// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para conectar con la base de datos definida en los modelos:

const db = require('../db/models')


// Para tomar los valores de los errores que se presenten en la validación usada
// con express validator en la ruta

const { check, validationResult, body } = require('express-validator');


// Inicio del controlador

const loginController = {



  'ingreso': function (req, res, next) {
    res.render('login', { pageCss: 'register.css', statusRegistracion: '' });
  },


  'validation': function (req, res, next) {


    // let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
    // let usersJSON = JSON.parse(users);

    // Se define una variable con los errores de express validator que se encuentren, con la validación
    // definida en la ruta


    // valida si los datos ingresados por el usuario son válidos o no

    let errors = validationResult(req);

    // res.send(errors);

    if (errors.isEmpty()) {

      db.User.findOne({
        where: {
          email: req.body.email,
        }

      })
        .then(function (user) {

          if (bcrypt.compareSync(req.body.password, user.password)) {
            //console.log(user.email)
            // let usuarioALoguear = user.email;
            let usuarioALoguear = user.name;

            // req.session.usuarioLogueado = usuarioALoguear;
            req.cookies.usuarioLogueado = usuarioALoguear;

            if (req.body.recordame != undefined) {
              res.cookie('recordame', usuarioALoguear, {maxAge: 6000000})
            }

            // res.redirect('/users/check');
            res.redirect('/');


          }
          else {
            res.render('register', { errors: errors.errors, pageCss: 'register.css', statusRegistracion: 'Usuario existente pero contraseña incorrecta' });

          }

        })
        .catch(function (err) {

          res.render('register', { errors: errors.errors, pageCss: 'register.css', statusRegistracion: 'Usuario Inexistente, presione (Sign Up) en caso de querer registrar un usuario nuevo.' });

          throw err;
        })

    } else {

      res.render('register', { errors: errors.errors, pageCss: 'register.css', statusRegistracion: 'Error en los datos de ingreso.' });

    }

  },


  //   En caso que el usuario o contraseña ingresados no sean correctos, notifica y pide nuevamente los datos

  'status': function (req, res, next) {

    let statusRegistroUsuario = req.params.id;

    //   Si viene de un usuario que intentó registrarse anteriormente pero con algún dato erróneo lo remarca.
    //   Status 1 para usuarios que ingresaron erróneamente previamente.

    if (statusRegistroUsuario) {

      res.render('register', { errors: [], pageCss: 'register.css', statusRegistracion: 'Usuario o Contraseña incorrecta.' });

      //   Si un usuario llega por primera vez a la página de registro
      //   Status ''

    } else {
      res.render('register', { errors: [], pageCss: 'register.css', statusRegistracion: '' });

    }

  }

}

module.exports = loginController
