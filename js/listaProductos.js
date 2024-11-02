// Funcion que renderiza el listado de productos en productos.html
const container = document.querySelector(".productos-container");

function mostrarProductos(productos) {
  container.innerHTML = ""; // Limpia el contenido previo
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    card.innerHTML = `
      <a href="${producto.ruta}" class="card-link">
        <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio.toLocaleString()}</p>
        </div>
      </a>
    `;

    container.appendChild(card);
  });
}

function filtrarProductos(categoria) {
  if (categoria === "Mostrar todo") {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria
    );
    mostrarProductos(productosFiltrados);
  }
}

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);
