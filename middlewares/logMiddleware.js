const fs = require('fs')

function adminLogs (req,res,next){
if ([].includes(req.params.name)){
res.send('El usuario existe')
}else{
    res.send('No existe el usuario')
}
}


module.exports = adminLogs;