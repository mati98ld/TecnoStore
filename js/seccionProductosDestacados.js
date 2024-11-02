window.onload = function () {
  const carouselInner = document.getElementById("productosDestacados");

  // Array de productos en grupos de 3

  let productosDestacados = productos.filter(
    (producto) => producto.destacado || producto.masVisto
  );
  let gruposDeProductos = [];
  let grupo = [];
  productosDestacados.forEach((producto, index) => {
    if (index % 3 == 0 && index != 0) {
      gruposDeProductos.push(grupo);
      grupo = [];
    }
    grupo.push(producto);
  });
  gruposDeProductos.push(grupo);

  gruposDeProductos.forEach((grupo, index) => {
    let carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
    let row = document.createElement("div");
    row.className = "row";
    grupo.forEach((producto) => {
      row.innerHTML += `
        <div class="col">
            <div class="card">
                <a href="${producto.ruta}" class="no-style-link">
                    <h4 class="${
                      producto.destacado ? "destacado" : "mas-visto"
                    }">${producto.destacado ? "DESTACADO" : "MAS VISITADO"}</h4>
                    <img src="${
                      producto.imagenes[0]
                    }" class="card-img-top" alt="Imagen 1">
                    <div class="card-body">
                        <h5 class="card-title
                        ">${producto.nombre}</h5>
                    </div>
                </a>
            </div>
        </div>`;
    });
    carouselItem.appendChild(row);
    carouselInner.appendChild(carouselItem);
  });
};
