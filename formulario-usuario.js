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

function guardarUsuario(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores ingresados por el usuario
  const nombreCompleto = nombreCompletoInput.value;
  const fechaNacimiento = fechaNacimientoInput.value;
  const correoElectronico = correoElectronicoInput.value;
  const contraseña = contraseñaInput.value;
  const confirmacion = confirmacionInput.value;
  const genero = generoSelect.value === 'otro_genero' ? nuevoGeneroInput.value : generoSelect.value;
  const pais = paisSelect.value === 'otro_pais' ? nuevoPaisInput.value : paisSelect.value;

  // Validar los campos (puedes agregar más validaciones según tus necesidades)
  if (!nombreCompleto || !fechaNacimiento || !correoElectronico || !contraseña || !confirmacion || !genero || !pais) {
    alert('Por favor, complete todos los campos');
    return;
  }

  if (contraseña !== confirmacion) {
    alert('Las contraseñas no coinciden');
    return;
  }

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
