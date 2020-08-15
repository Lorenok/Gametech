window.addEventListener('load', function() {
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento) {
        // console.log(formulario)
  
    })
});



var form = document.getElementById('addProductForm')
var buttonSend = document.querySelector('#sendInformation');
var images = document.querySelector('#imagen')
buttonSend.disabled =true;



form.name.addEventListener('keyup', function(event){
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