var params = new URLSearchParams(window.location.search);
var nombre = params.get("nombre");
var descripcion = params.get("descripcion");
var id = params.get("id");

// Llenar la tabla con los datos
document.getElementById("tituloboton").textContent = nombre;
document.getElementById("descripcionboton").textContent = descripcion;
document.getElementById("denunciaid").textContent = id;

var formulario = document.getElementById('formularioEstado');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    var datos = new FormData(formulario);
    estado= datos.get('estado');
    editarEstado(id, estado);
    window.location.href="http://localhost/proyectos/proyectoPrueba/Avance2-Front/index.html";

})

function editarEstado(id,estado) {
    const data = { id: id, estado: estado };
  
    const jsonData = JSON.stringify(data);
  
    fetch('http://localhost/LPPHP/funcionCambiarEstado.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }
