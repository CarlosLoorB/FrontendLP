"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function irAEditar(boton,id){
  var fila= boton.parentNode.parentNode;
  var nombre = fila.cells[1].textContent;
  var descricpion = fila.cells[2].textContent;
  var urlDestino = "http://localhost/proyectos/proyectoPrueba/Avance2-Front/signin.html?nombre=" + encodeURIComponent(nombre) + "&descripcion=" + encodeURIComponent(descricpion) + "&id=" + encodeURIComponent(id);
  window.location.href=urlDestino;
}

function incrementarVotoEnPHP(id) {
  // Crear un objeto de datos con el ID que se va a enviar al servidor
  const data = { id: id };

  // Convertir el objeto de datos a una cadena JSON
  const jsonData = JSON.stringify(data);

  // Configurar la solicitud de fetch
  fetch('http://localhost/LPPHP/lpVotar.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: jsonData
  })
      .then(response => response.text())
      .then(result => {
          // Manejar la respuesta del servidor
          console.log(result);
          // Puedes realizar otras acciones aquí según la respuesta del servidor
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function obtenerDenuncias() {
  fetch('http://localhost/LPPHP/lpObtenerDenuncias.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Aquí almacenas los datos en un arreglo
      const denuncias = data;

      // Aquí puedes hacer lo que necesites con el arreglo de denuncias
      console.log('Denuncias:', denuncias);

      procesarDenuncias(denuncias);

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function procesarDenuncias(denunciasObj) {
  const tableBody = document.getElementById('tabla-denuncias');

  for (const key in denunciasObj) {
    if (denunciasObj.hasOwnProperty(key)) {
      const denuncia = denunciasObj[key];

      const row = document.createElement('tr');

      const fechaCell = document.createElement('td');
      fechaCell.textContent = denuncia.fecha;
      row.appendChild(fechaCell);

      const tituloCell = document.createElement('td');
      tituloCell.textContent = denuncia.nombre;
      row.appendChild(tituloCell);

      const descripcionCell = document.createElement('td');
      descripcionCell.textContent = denuncia.descripcion;
      row.appendChild(descripcionCell);

      const ubicacionCell = document.createElement('td');
      ubicacionCell.textContent = denuncia.ubicacion;
      row.appendChild(ubicacionCell);

      const estadoCell = document.createElement('td');
      const estadoSpan = document.createElement('span');
      estadoSpan.textContent = denuncia.estado;
      if (denuncia.estado === 'Activo') {
        estadoSpan.className = 'badge-active';
      } else if (denuncia.estado === 'Desestimado') {
        estadoSpan.className = 'badge-trashed';
      } else if (denuncia.estado === 'En Trabajo') {
        estadoSpan.className = 'badge-pending'; // Otra clase o ninguna clase
      }
    
      estadoCell.appendChild(estadoSpan);
      row.appendChild(estadoCell);

      const editarCell = document.createElement('td');
      const editarButton = document.createElement('button');
      editarButton.type = "button";
      editarButton.className = "botonesEdit";
      editarButton.textContent = "Editar";
      editarButton.id= denuncia.id;
      editarButton.setAttribute("onclick","irAEditar(this,this.id)");
      editarCell.appendChild(editarButton);
      row.appendChild(editarCell);

      const meGustaCell = document.createElement('td');
      const meGustaButton = document.createElement('button');
      meGustaButton.type = "button";
      meGustaButton.className = "botonesMegusta";
      meGustaButton.textContent = "Me gusta";
      meGustaButton.id = denuncia.id;
      meGustaCell.appendChild(meGustaButton);
      row.appendChild(meGustaCell);

      tableBody.appendChild(row);
    };
  }

  const meGustaButtons = document.getElementsByClassName("botonesMegusta");

  for (const button of meGustaButtons) {
    button.addEventListener("click", function () {
      // Aquí puedes agregar el código que deseas ejecutar cuando se haga clic en un botón "Me gusta"
      console.log("Se hizo clic en un botón Me gusta con ID:", this.id);
      // Puedes acceder al ID del botón haciendo referencia a 'this.id'
      incrementarVotoEnPHP(this.id);

    });
  }

};

function llenarLista() {
  fetch('http://localhost/LPPHP/lpRanking.php') // Reemplaza 'URL_DEL_PHP.php' con la URL real de tu PHP
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaRanking');

      // Recorre los datos y crea elementos <li> y <a> para cada entrada
      data.forEach((entry, index) => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        
        // Crear el div con la clase 'top-cat-list__title'
        const titleDiv = document.createElement('div');
        titleDiv.className = 'top-cat-list__title';
        titleDiv.textContent = entry.nombre;
        
        // Crear el span para los votos
        const votesSpan = document.createElement('span');
        votesSpan.textContent = ` ${entry.voto} votos`;
        
        // Crear el div con la clase 'top-cat-list__subtitle'
        const subtitleDiv = document.createElement('div');
        subtitleDiv.className = 'top-cat-list__subtitle';
        
        // Crear el span para el estado
        const stateSpan = document.createElement('span');
        stateSpan.textContent = entry.estado;
        
        // Cambiar la clase según el estado
        if (entry.estado === 'Activo') {
          stateSpan.className = 'success';
        } else if (entry.estado === 'Desestimado') {
          stateSpan.className = 'danger';
        } else if (entry.estado === 'En Trabajo') {
          stateSpan.className = 'warning'; // Otra clase o ninguna clase
        }

        // Construir la estructura de elementos
        titleDiv.appendChild(votesSpan);
        subtitleDiv.appendChild(stateSpan);
        anchor.appendChild(titleDiv);
        anchor.appendChild(subtitleDiv);
        listItem.appendChild(anchor);
        lista.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  feather.replace();
  obtenerDenuncias();
  llenarLista();
});