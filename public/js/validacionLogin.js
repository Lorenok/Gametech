let inputEmail = document.querySelector('#campoEmail');
var buttonSend= document.querySelector('#buttonSend')

buttonSend.disabled=true;


inputEmail.addEventListener('keyup', function(event){
    event.target.classList.add('is-invalid')
    buttonSend.disabled =true;
    
    let valorCampo = event.target.value;
    
    
     if(valorCampo.length <4 || valorCampo.indexOf('@')==-1){
         buttonSend.disabled =true;

     }else {
     event.target.classList.replace('is-invalid','is-valid'),
     buttonSend.disabled =false;
 }

 });




 let formulario = document.querySelector('form.login');

    formulario.addEventListener('submit',function(e){
    let campoEmail = document.querySelector('input.email');
    let campoPassword = document.querySelector('input.password');
    let mensajeErrorEmail = document.querySelector('p.mensajeErrorEmail');
    let mensajeErrorPassword = document.querySelector('p.mensajeErrorPassword');

    if(campoEmail.value == ''){

        mensajeErrorEmail.innerText = 'Campo Email vacío. Debe ingresar un Correo Válido o Registrado.'
        mensajeErrorPassword.innerText = ''
        e.preventDefault();


    }else{

        if(campoPassword.value == '' || campoPassword.value.length <8){

    
            mensajeErrorPassword.innerText = 'Campo Password está vacío. Debe ingresar una contraseña válida de al menos 8 caracteres.'
            mensajeErrorEmail.innerText = ''

            e.preventDefault();
    
        }else{

        }
    }


})

let inputPassword =document.querySelector('#password')
inputPassword.addEventListener('keyup', function(event){

    event.target.classList.add('is-invalid')
    buttonSend.disabled =true;
    
    let valorCampo = event.target.value;
    
    
     if(valorCampo.length <8){
         buttonSend.disabled =true;

     }else {
     event.target.classList.replace('is-invalid','is-valid'),
     buttonSend.disabled =false;
 }

})