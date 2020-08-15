const db = require('../db/models')

function recordameMiddleware(req, res, next){
    next();

    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
    
    db.User.findOne({
    where: {
      email: req.cookies.recordame,
    }
})
        let usuarioALoguear = user.email;
        req.session.usuarioLogueado = usuarioALoguear;
    }
}
    
module.exports = recordameMiddleware;