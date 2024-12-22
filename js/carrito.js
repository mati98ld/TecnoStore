let bodyCarrito = document.getElementById("carrito");

const dibujarCarrito = () => {
  bodyCarrito.innerHTML = "";
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    bodyCarrito.innerHTML += `<tr>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>
      <input type="number" value="${
        producto.cantidad
      }" min="1" class="form-control cantidad-producto" style="max-width: 60px;" data-codigo="${
      producto.codigo
    }">
      </td>
      <td>$${(producto.precio * producto.cantidad).toLocaleString()}</td>
      <td>
      <button class="btn btn-danger" id="btnEliminar" name="${producto.codigo}">
      Eliminar
      </button>
      </td>
    </tr>`;
  });
  document.getElementById("total").innerText = total.toLocaleString();
};

const mostrarMensajeCarritoVacio = () => {
  document.getElementById("container").innerHTML = `
  <div class="text-center m-5">
  <h1 class="m-5">El carrito está vacío :(</h1>
  <a href="/index.html" class="btn btn-primary m-5">Volver a la página principal</a>
  </div>`;
};

bodyCarrito.addEventListener("click", (e) => {
  if (e.target.id === "btnEliminar") {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let producto = carrito.find(
      (producto) => producto.codigo === e.target.name
    );
    let index = carrito.indexOf(producto);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito();
    if (carrito.length === 0) {
      mostrarMensajeCarritoVacio();
    }
  }
});

let btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  dibujarCarrito();
};

btnVaciarCarrito.addEventListener("click", () => {
  vaciarCarrito();
  mostrarMensajeCarritoVacio();
});

// modificar cantidad en el carrito
bodyCarrito.addEventListener("change", (e) => {
  if (e.target.classList.contains("cantidad-producto")) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let producto = carrito.find(
      (producto) => producto.codigo === e.target.dataset.codigo
    );
    producto.cantidad = e.target.value;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito();
  }
});

let btnComprar = document.getElementById("btnComprar");

let bodyModal = document.getElementById("modalBody");

btnComprar.addEventListener("click", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  bodyModal.innerHTML = `
  <h4 class="text-center text-primary mb-3">Ingrese sus datos para finalizar</h4>
  <form action="https://formspree.io/f/manyepzg" method="POST">
  <input type="text" name="message" value="Compra realizada" hidden>
  ${carrito
    .map((producto) => {
      return `<input type="text" name="productos" value="${producto.codigo} x ${
        producto.cantidad
      } : ${producto.precio * producto.cantidad}" hidden>`;
    })
    .join("")}
    <input type="text" name="total" value="${total.toLocaleString()}" hidden>
    <div class="mb-3">
    <label for="nombre" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="nombre" name="nombre" required>
    </div>
    <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="mb-3">
    <label for="telefono" class="form-label">Telefono</label>
    <input type="tel" class="form-control" id="telefono" name="telefono" required>
    </div>
    <div class="mb-3">
    <label for="direccion" class="form-label">Direccion</label>
    <input type="text" class="form-control" id="direccion" name="direccion" required>
    </div>
    <h4 class="text-center text-success">Total a pagar: $${total.toLocaleString()}</h4>
    <div class="m-3 text-center border p-3">
    <h5>¿Confirmar compra?</h5>
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
    <button type="submit" class="btn btn-success" onClick="vaciarCarrito()">Confirmar compra</button>
    </div>
  </form>`;
});

document.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("carrito") &&
    JSON.parse(localStorage.getItem("carrito")).length > 0
  ) {
    dibujarCarrito();
  } else {
    mostrarMensajeCarritoVacio();
  }
});
