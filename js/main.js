// Renderiza el navbar
document.addEventListener("DOMContentLoaded", function () {
  // Selecciono el div donde se debe cargar el navbar
  let navbar = document.getElementById("navbar");

  // Solicitud AJAX
  fetch("/partials/navbar.html")
    .then((response) => response.text()) // Convierto la respuesta a texto
    .then((data) => {
      // Cargo el contenido en el div
      navbar.innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el navbar: ", error));
});

// Renderiza el footer
document.addEventListener("DOMContentLoaded", function () {
  // Selecciono el div donde se debe cargar el navbar
  let footer = document.getElementById("footer");

  // Solicitud AJAX
  fetch("/partials/footer.html")
    .then((response) => response.text()) // Convierto la respuesta a texto
    .then((data) => {
      // Cargo el contenido en el div
      footer.innerHTML = data;
    })
    .catch((error) => console.error("Error al cargar el footer: ", error));
});
