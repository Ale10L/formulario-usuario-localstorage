// Obtener referencias a los elementos del formulario
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

// Agregar evento de clic al botón Aceptar
btnAceptar.addEventListener('click', guardarUsuario);
nombreCompletoInput.addEventListener('input', controlBtnAceptar);
fechaNacimientoInput.addEventListener('change', controlBtnAceptar);
correoElectronicoInput.addEventListener('input', controlBtnAceptar);
contraseñaInput.addEventListener('input', controlBtnAceptar);
confirmacionInput.addEventListener('input', controlBtnAceptar);
generoSelect.addEventListener('change', controlBtnAceptar);
nuevoGeneroInput.addEventListener('input', controlBtnAceptar);
paisSelect.addEventListener('change', controlBtnAceptar);
nuevoPaisInput.addEventListener('input', controlBtnAceptar);

controlBtnAceptar();

function controlBtnAceptar(){
  // Validar los campos (puedes agregar más validaciones según tus necesidades)
  const genero = generoSelect.value === 'otro_genero' ? nuevoGeneroInput.value : generoSelect.value;
  const pais = paisSelect.value === 'otro_pais' ? nuevoPaisInput.value : paisSelect.value;
  const camposIncompletos = !nombreCompletoInput.value || !fechaNacimientoInput.value || !correoElectronicoInput.value || !contraseñaInput.value || !confirmacionInput.value || !genero || !pais;
  const controles = !controlFecha() || !controlContraseña() || !controlEmail() || !controlGenero() || !controlPais();
  const formularioCompleto = camposIncompletos || controles;
  btnAceptar.disabled = formularioCompleto;
  console.log(btnAceptar.disabled)
}

function controlFecha() {
  const fechaNacimiento = new Date(fechaNacimientoInput.value).getUTCDate()
  const fechaActual = new Date().getUTCDate()
  const edad = fechaActual - fechaNacimiento
  if (edad < 0) {
    document.getElementById('lbl_edad').style.display = 'inline'
  } else {
    document.getElementById('lbl_edad').style.display = 'none'
  }
}

function controlEmail() {
  const regexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  //if(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correoElectronicoInput.value) ){
  if (regexp.test(correoElectronicoInput.value)) {
    document.getElementById('lbl_email').style.display = 'none'
  } else {
    document.getElementById('lbl_email').style.display = 'inline'
  }
}

function controlContraseña() {
  if ((contraseñaInput.value !== confirmacionInput.value) || ((contraseñaInput.value === '') && (confirmacionInput.value === ''))) {
    document.getElementById('lbl_coincidencia').style.display = 'inline'
  } else {
    document.getElementById('lbl_coincidencia').style.display = 'none'
  }
}

function controlGenero() {
  if(generoSelect.value !== 'otro_genero' || generoSelect.value === 'seleccione_genero'){
    document.getElementById('otroGeneroInput').style.display = 'none'
  } else {
    document.getElementById('otroGeneroInput').style.display = 'inline'
  }
}
function controlPais() {
  if(paisSelect.value !== 'otro_pais' || paisSelect.value === 'seleccione_pais'){
    document.getElementById('otroPaisInput').style.display = 'none'
  } else {
    document.getElementById('otroPaisInput').style.display = 'inline'
  }
}

controlGenero()
controlPais()

function guardarUsuario(event) {
  event.preventDefault(); // Evitar el envío del formulario
  controlBtnAceptar()
  // Obtener los valores ingresados por el usuario
  const nombreCompleto = nombreCompletoInput.value;
  const fechaNacimiento = fechaNacimientoInput.value;
  const correoElectronico = correoElectronicoInput.value;
  const contraseña = contraseñaInput.value;
  const genero = generoSelect.value === 'otro_genero' ? nuevoGeneroInput.value : generoSelect.value;
  const pais = paisSelect.value === 'otro_pais' ? nuevoPaisInput.value : paisSelect.value;
  
  // Crear un objeto con los datos del usuario
  const usuario = {
    nombreCompleto,
    fechaNacimiento,
    correoElectronico,
    contraseña,
    genero,
    pais,
  };

  // Obtener los usuarios existentes (si hay alguno) desde localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Agregar el nuevo usuario a la lista
  usuarios.push(usuario);

  // Guardar la lista actualizada en localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Limpiar el formulario
  form.reset();

  alert('Usuario guardado correctamente');
}
