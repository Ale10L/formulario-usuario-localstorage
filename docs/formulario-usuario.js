const form = document.querySelector('.form');
const nombreCompletoInput = document.querySelector('.nombre_completo');
const fechaNacimientoInput = document.querySelector('.fecha_nacimiento');
const correoElectronicoInput = document.querySelector('.correo_electronico');
const contraseñaInput = document.querySelector('.contraseña');
const confirmacionInput = document.querySelector('.confirmacion');
const generoSelect = document.querySelector('.genero');
const nuevoGeneroInput = document.querySelector('input[name="nuevo_genero"]');
const paisSelect = document.querySelector('.pais');
const nuevoPaisInput = document.querySelector('input[name="nuevo_pais"]');
const btnAceptar = document.getElementById('btnAceptar');

btnAceptar.addEventListener('click', guardarUsuario);

let fechaValida = false;
let correoValido = false;
let contraseñasCoinciden = false;
let generoValido = false;
let paisValido = false;

function controlBtnAceptar() {
  generoValido = generoSelect.value === 'seleccione_genero' ? false : true;
  paisValido = paisSelect.value === 'seleccione_pais' ? false : true;
  const controles = fechaValida && correoValido && contraseñasCoinciden ? true : false
  const camposIncompletos = (nombreCompletoInput.value === '' ||
    fechaNacimientoInput.value === '' ||
    correoElectronicoInput.value === '' ||
    contraseñaInput.value === '' ||
    confirmacionInput.value === '' ||
    (generoValido &&
      paisValido)) && controles;

  const formularioCompleto = camposIncompletos;
  if (formularioCompleto) {
    btnAceptar.disabled = false;
  } else {
    btnAceptar.disabled = true;
  }
}

function controlFecha() {
  const fechaNacimiento = new Date(fechaNacimientoInput.value)
  const fechaActual = new Date()
  fechaNacimiento.setDate(fechaNacimiento.getDate() + 1)
  const edad = parseInt((fechaActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365))
  if (edad < 18) {
    document.getElementById('lbl_edad').style.display = 'inline'
    fechaValida = false;
  } else {
    document.getElementById('lbl_edad').style.display = 'none'
    fechaValida = true
  }
}

function controlEmail() {
  const regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (regexp.test(correoElectronicoInput.value)) {
    document.getElementById('lbl_email').style.display = 'none'
    correoValido = true;
  } else {
    document.getElementById('lbl_email').style.display = 'inline'
    correoValido = false;
  }
}

function controlContraseña() {
  if ((contraseñaInput.value !== confirmacionInput.value) || ((contraseñaInput.value === '') && (confirmacionInput.value === ''))) {
    document.getElementById('lbl_coincidencia').style.display = 'inline'
    contraseñasCoinciden = false;
  } else {
    document.getElementById('lbl_coincidencia').style.display = 'none'
    contraseñasCoinciden = true;
  }
}

function controlGenero() {
  if (generoSelect.value !== 'otro_genero' || generoSelect.value === 'seleccione_genero') {
    document.getElementById('otroGeneroInput').style.display = 'none'
  } else {
    document.getElementById('otroGeneroInput').style.display = 'inline'
  }
}
function controlPais() {
  if (paisSelect.value !== 'otro_pais' || paisSelect.value === 'seleccione_pais') {
    document.getElementById('otroPaisInput').style.display = 'none'
  } else {
    document.getElementById('otroPaisInput').style.display = 'inline'
  }
}

controlGenero()
controlPais()

function guardarUsuario(event) {
  event.preventDefault();

  const nombreCompleto = nombreCompletoInput.value;
  const fechaNacimiento = fechaNacimientoInput.value;
  const correoElectronico = correoElectronicoInput.value;
  const contraseña = contraseñaInput.value;
  const genero = generoSelect.value === 'otro_genero' ? nuevoGeneroInput.value : generoSelect.value;
  const pais = paisSelect.value === 'otro_pais' ? nuevoPaisInput.value : paisSelect.value;

  const usuario = {
    nombreCompleto,
    fechaNacimiento,
    correoElectronico,
    contraseña,
    genero,
    pais,
  };

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.push(usuario);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  form.reset();

  alert('Usuario guardado correctamente');

  window.location.reload()
}