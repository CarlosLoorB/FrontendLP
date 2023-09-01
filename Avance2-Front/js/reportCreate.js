  function submitForm(event) {
    console.log('esta bien enlazado');
    event.preventDefault(); // Prevent the default form submission

    let form = document.getElementById('signup-form');

    let fecha = form.querySelector('[id="fecha"]').value;
    let nombre = form.querySelector('[id="nombre"]').value;
    let descripcion = form.querySelector('[id="descricpion"]').value;
    let ubicacion = form.querySelector('[id="ubicacion"]').value;

    let formData = {
      fecha: fecha,
      nombre: nombre,
      descripcion: descripcion,
      ubicacion: ubicacion
    };
    console.log(formData);

    const jsonData = JSON.stringify(formData);

    fetch('http://localhost/LPPHP/LpBackend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }