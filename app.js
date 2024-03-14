const button_encriptar = document.getElementById('button-encriptar');
const button_desencriptar = document.getElementById('button-desencriptar');
const button_copiar = document.getElementById('button-copiar');

const contacto = document.querySelector('.contacto');
const mensaje_usuario = document.getElementById('mensaje-usuario');
const mensaje_resultado = document.getElementById('mensaje-resultado');
const contenedor_mensaje_resultado_idle = document.getElementById('contenedor-mensaje-resultado-idle');
const contenedor_mensaje_resultado = document.getElementById('contenedor-resultado');

const ventanaGlobo = document.querySelector('.ventana-globo')
const swalConfetti = document.querySelector('.confetti')

let conversion = ['enter', 'imes', 'ai', 'ober', 'ufat'];
let letra = ['e', 'i', 'a', 'o', 'u'];

// ############################### FUNCTIONS ##################################

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

    let encriptado = {'e': 'enter', 'i': 'imes','a': 'ai', 'o': 'ober', 'u': 'ufat'};
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

// ############################### EVENTS ##################################

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

document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
        title: "Bienvenido al Encriptador",
        icon: "info",
        html: `
          <ul>
            <li>1. La app funciona para cifrar o descifrar mensajes.</li>
            <li>2. El texto original se borrará en cuanto lo cifres o descifres.</li>
            <li>3. No se aceptarán mayúsculas, acentos ni caracteres especiales.</li>
          </ul>
          <span class="pie-swal">Si te gusta mi proyecto, agradecería que le dieras una estrella en <a href="https://github.com/Manuelo247" target="_blank">GitHub</a></span>
          <span class="pie-swal">Desplaza hacia abajo para ver mis redes.</span>
        `,
        width: 700,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: `
        <span class="material-symbols-outlined">
        thumb_up
        </span> Entendido!
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        customClass: {
            icon: "swal2-icon-large", // Agrega una clase CSS personalizada al icono
            confirmButton: "swal-confirm-button"
        },
      });
});

swalConfetti.addEventListener('click', function() {

    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 300, zIndex: 1600 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    var particleCount = 100 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    Swal.fire({
        imageUrl: "https://media.tenor.com/zGIMaKCYD-EAAAAi/happy.gif",
        imageHeight: "200px",
        imageAlt: "bongoCat",
        title: "Gracias por usar mi pagina!",
        // icon: "info",
        html: `
        Te invito a darle una estrella en
        <a href="https://github.com/Manuelo247" target="_blank">GitHub</a>.
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: `
            <span class="material-symbols-outlined">
                star
            </span>Star
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
            <span class="material-symbols-outlined">
                sentiment_dissatisfied
            </span>No
        `,
        cancelButtonAriaLabel: "Thumbs down",
        customClass: {
            confirmButton: "swal-confirm-button",
            cancelButton: "swal-cancel-button"
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = "https://github.com/Manuelo247/decodificador";
        }
      });
});