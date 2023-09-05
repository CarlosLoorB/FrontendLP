document.addEventListener("DOMContentLoaded", function () {
  const botonesMegusta = document.querySelectorAll(".botonesMegusta");

  botonesMegusta.forEach(function (button) {
      button.addEventListener("click", function () {
          // Obtén el ID de la denuncia desde el atributo data-id
          const denunciaId = button.getAttribute("id");

          // Realiza una solicitud AJAX para llamar al archivo PHP
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost/LPPHP/LpVotar.php", true);
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

          // Envía el ID de la denuncia como JSON en el cuerpo de la solicitud
          const data = JSON.stringify({ id: denunciaId });
          xhr.send(data);

          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      // La solicitud se completó correctamente
                      console.log(xhr.responseText);
                      // Puedes mostrar un mensaje de confirmación aquí
                  } else {
                      // Hubo un error en la solicitud
                      console.error("Error en la solicitud.");
                  }
              }
          };
      });
  });
});