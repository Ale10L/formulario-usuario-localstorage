document.addEventListener("DOMContentLoaded", function () {
    var listadoUsuarios = document.getElementById("listado");
  
    // Obtener usuarios del localStorage
    var usuarios = obtenerUsuariosLocalStorage();
  
    // Mostrar usuarios en la tabla
    mostrarUsuarios(usuarios);
  
    function obtenerUsuariosLocalStorage() {
      var usuarios = localStorage.getItem("usuarios");
      if (usuarios) {
        return JSON.parse(usuarios);
      } else {
        return [];
      }
    }
  
    function mostrarUsuarios(usuarios) {
      var html = "";
      usuarios.forEach(function (usuario) {
        html += "<tr>";
        html += "<td class='text-center text-white'>" + usuario.nombreCompleto + "</td>";
        html += "<td class='text-center text-white'>" + usuario.correoElectronico + "</td>";
        html += "</tr>";
      });
      listadoUsuarios.innerHTML = html;
    }
  });
  