// Función para agregar un producto al carrito
const agregarAlCarrito = (codigo) => {
  const producto = productos.find((producto) => producto.codigo === codigo);
  console.log(producto);
  // Obtener el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  // fijarse si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(
    (productoCarrito) => productoCarrito.codigo === producto.codigo
  );
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
    return;
  }
  producto.cantidad = 1;
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
};

const btnAdd = document.getElementById("addBtn");
btnAdd.addEventListener("click", () => {
  agregarAlCarrito(btnAdd.name);
});
