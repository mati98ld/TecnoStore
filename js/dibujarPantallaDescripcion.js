const dibujarPantalla = (dispositivo) => {
  let container = document.getElementById("container");
  let div = document.createElement("div");
  div.className = "d-flex flex-wrap justify-content-center gap-3 row";

  div.innerHTML = `
        <h5 class="text-start">${dispositivo.nombre}</h5>
        <div
          id="carouselExampleIndicators"
          class="carousel carousel-dark slide col-md"
        >
          <div class="carousel-indicators">
          </div>
          <div class="carousel-inner" id="imgs">
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`;
  let imgs = div.querySelector("#imgs");
  dispositivo.imagenes.forEach((imagen, index) => {
    let div = document.createElement("div");
    div.className = `carousel-item ${index === 0 ? "active" : ""}`;
    let img = document.createElement("img");
    img.src = imagen;
    img.className = "d-block w-100 img-thumbnail p-5 img-fluid";
    img.alt = "Imagen del dispositivo";
    div.appendChild(img);
    imgs.appendChild(div);
  });
  let carouselIndicators = div.querySelector(".carousel-indicators");
  dispositivo.imagenes.forEach((imagen, index) => {
    let button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-target", "#carouselExampleIndicators");
    button.setAttribute("data-bs-slide-to", index);
    button.className = `${index === 0 ? "active" : ""}`;
    carouselIndicators.appendChild(button);
  });

  div.innerHTML += `<div class="card col-lg">
          <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-text text-body-secondary">${dispositivo.marca}</h4>
            <div>
              <h2 class="card-title">${dispositivo.nombre}</h2>
              <p class="card-text">
                <strong>Codigo</strong> <mark> ${dispositivo.codigo}</mark>
              </p>
            </div>

            <h3 class="card-title text-success">$${dispositivo.precio.toLocaleString()}</h3>
            <div>
              <h4>Descripcion</h4>
              <p class="card-text">
                ${dispositivo.descripcion}
              </p>
            </div>
            <div class="d-grid">
              <a href="#" class="btn btn-primary btn-lg">Comprar</a>
            </div>
          </div>
        </div>`;
  container.appendChild(div);

  let relacionados = productos.filter(
    (producto) =>
      (producto.categoria == dispositivo.categoria ||
        producto.marca == dispositivo.marca) &&
      producto.codigo != dispositivo.codigo
  );

  let relacionadosContainer = document.createElement("div");
  relacionadosContainer.className = "container mt-5";
  let h2 = document.createElement("h2");
  h2.className = "text-center";
  h2.innerText = "Productos relacionados";
  relacionadosContainer.appendChild(h2);
  container.appendChild(relacionadosContainer);
  let row = document.createElement("div");
  row.className = "row d-flex justify-content-center gap-3";
  relacionados.forEach((relacionado) => {
    let col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
        <a class="card" href="${relacionado.ruta}" type="button">
          <img src="${relacionado.imagenes[0]}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title
            ">${relacionado.nombre}</h5>
            <p class="card-text text-success">$${relacionado.precio.toLocaleString()}</p>
          </div>
        </a>`;
    row.appendChild(col);
  });
  relacionadosContainer.appendChild(row);
  container.appendChild(relacionadosContainer);
};
