const button_encriptar = document.getElementById('button-encriptar');
const button_desencriptar = document.getElementById('button-desencriptar');
const button_copiar = document.getElementById('button-copiar');

const mensaje_usuario = document.getElementById('mensaje-usuario');
const mensaje_resultado = document.getElementById('mensaje-resultado');
const contenedor_mensaje_resultado_idle = document.getElementById('contenedor-mensaje-resultado-idle');
const contenedor_mensaje_resultado = document.getElementById('contenedor-resultado');
const ventanaGlobo = document.querySelector('.ventana-globo')

let conversion = ['enter', 'imes', 'ai', 'ober', 'ufat'];
let letra = ['e', 'i', 'a', 'o', 'u'];

async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
}

function ventana_copiado(){
    // Obtener la posición del botón en la pantalla
    const buttonCopiarParams = button_copiar.getBoundingClientRect();

    ventanaGlobo.style.display = 'block';

    // Establecer la posición de la ventanaGlobo en el centro del botón
    ventanaGlobo.style.left = buttonCopiarParams.left + ((buttonCopiarParams.width / 2) - (ventanaGlobo.clientWidth / 2)) + 'px'
    ventanaGlobo.style.top = buttonCopiarParams.top - 5 + 'px'

    setTimeout(function() {
        ventanaGlobo.classList.add('desaparecer')
    }, 1000)

    setTimeout(function() {
        ventanaGlobo.classList.remove('desaparecer')
        ventanaGlobo.style.display = 'None'
    }, 2000)
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

function reemplazar(tipo, mensaje){

    let encriptado = {'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat'};
    let desencriptado = {'ufat': 'u', 'ober': 'o', 'imes': 'i', 'enter': 'e', 'ai': 'a'}   
    
    let clave = tipo == 'encriptar' ? encriptado : desencriptado;

    console.log(tipo)
    console.log(clave)

    Object.entries(clave).forEach(([key, value]) => { 
        mensaje = mensaje.replaceAll(key, value);
    });
    
    return mensaje;
}

function encriptacion_click(tipo){
    let mensaje = mensaje_usuario.value;

    mensaje = mensaje.toLowerCase();
    mensaje = mensaje.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if(mensaje == ""){
        activar_idle();
    }else{
        desactivar_idle();
        mensaje = reemplazar(tipo, mensaje);
        mensaje_resultado.innerHTML = mensaje;
        mensaje_usuario.value = "";
    }
}

mensaje_usuario.addEventListener("input", function() {
    this.value = this.value.toLowerCase();
    this.value = this.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
});

button_encriptar.addEventListener('click', function() {
    encriptacion_click('encriptar');
  });

button_desencriptar.addEventListener('click', function() {
    encriptacion_click('desencriptar');
  });

button_copiar.addEventListener('click', function() {
    copyToClipboard(mensaje_resultado.innerHTML);
    ventana_copiado();
  });