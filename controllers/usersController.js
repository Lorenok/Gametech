module.exports={

  list: function (req,res){
    res.send('Hola Usuario ')
    },
  create: function (req,res){
    res.render('register')
    },

  admin: function (req,res){
    res.render('admin')
  },
  products:function (req,res) {
    if (req.body.create == '1'){
    res.redirect('/products/create')}
    else{
      res.redirect('/')
    }
  }

}
