const button_encriptar = document.getElementById('button-encriptar');
const button_desencriptar = document.getElementById('button-desencriptar');
const button_copiar = document.getElementById('button-copiar');

const mensaje_usuario = document.getElementById('mensaje-usuario');
const mensaje_resultado = document.getElementById('mensaje-resultado');
const contenedor_mensaje_resultado_idle = document.getElementById('contenedor-mensaje-resultado-idle');
const contenedor_mensaje_resultado = document.getElementById('contenedor-resultado');

let conversion = ['enter', 'imes', 'ai', 'ober', 'ufat'];
let letra = ['e', 'i', 'a', 'o', 'u'];

async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
}

function desactivar_idle(){
    contenedor_mensaje_resultado_idle.classList.add('deactive')
    contenedor_mensaje_resultado.classList.remove('deactive')
    button_copiar.classList.remove('deactive')
}

function activar_idle(){
    contenedor_mensaje_resultado_idle.classList.remove('deactive')
    contenedor_mensaje_resultado.classList.add('deactive')
    button_copiar.classList.add('deactive')
}

function reemplazar(reemplazar, reemplazo, mensaje){

    for(let i = 0; i < reemplazar.length; i++){
    
        const regex = RegExp(reemplazar[i], "g");
        mensaje = mensaje.replace(regex, reemplazo[i])
    }

    return mensaje;
}

function encriptacion_click(tipo){
    let mensaje = mensaje_usuario.value;

    if(mensaje == ""){
        activar_idle();
    }else{
        desactivar_idle();
        if(tipo == 'encriptar') mensaje = reemplazar(letra, conversion, mensaje);
        else if(tipo == 'desencriptar') mensaje = reemplazar(conversion, letra, mensaje);
        mensaje_resultado.innerHTML = mensaje;
        mensaje_usuario.value = "";
    }
}

button_encriptar.addEventListener('click', function() {
    encriptacion_click('encriptar');
  });
button_desencriptar.addEventListener('click', function() {
    encriptacion_click('desencriptar');
  });
button_copiar.addEventListener('click', function() {
    copyToClipboard(mensaje_resultado.innerHTML)
  });
