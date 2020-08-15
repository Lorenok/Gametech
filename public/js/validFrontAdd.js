window.addEventListener('load', function() {
    let formulario = document.getElementById('addProductForms');
    formulario.addEventListener('submit', function(evento) {
       
  
    })
    
var buttonDelete = document.getElementById('borrarProducto');
buttonDelete.addEventListener('submit', function(evento) {
       
  
})
});



var form = document.getElementById('addProductForms')
var buttonSend = document.querySelector('#sendInformation');
var images = document.querySelector('#imagenPrevisualizacion')
buttonSend.disabled =true;
console.log(buttonSend)
console.log(images)




form.name.addEventListener('keyup', function(event){
    console.log(form.name)
    event.target.classList.add('is-invalid')
    buttonSend.disabled =true;
    // console.log(buttonSend.classList)
    
    let mensaje = event.target.value;
    
    
    if(mensaje.length <5){
        buttonSend.disabled =true;

}else {
    event.target.classList.replace('is-invalid','is-valid'),
    buttonSend.disabled =false;
    

}

});

form.description.addEventListener('keyup', function(event){
    let mensaje = event.target.value;
    buttonSend.disabled =true;

    event.target.classList.add('is-invalid')
    
    if(mensaje.length <20){
        event.target.classList.replace('is-valid','is-invalid');

}else {
    event.target.classList.replace('is-invalid','is-valid') ;
    buttonSend.disabled =false;
    

}

});

console.log(form.buttonDelete)

buttonDelete.addEventListener('click', function(event){
    console.log(form.name)

    // console.log(buttonSend.classList)
    
    let mensaje = 'Esta seguro que desea eliminar el producto?'
    
 promp (mensaje)

});
