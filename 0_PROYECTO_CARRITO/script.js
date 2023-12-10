
const listaProductos = document.getElementById('listaproductos');
const carrito = document.getElementById('articulos');
const totalSpan = document.getElementById('total');
const editForm = document.getElementById('edit-form');
const editNameInput = document.getElementById('edit-name');
const editPriceInput = document.getElementById('edit-price');
const productEditForm = document.getElementById('product-edit-form');


listaProductos.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('añadir')) {
        agregarAlCarrito(target.parentElement);
    } else if (target.classList.contains('editar')) {
        mostrarFormularioEdicion(target.parentElement);
    }
});


productEditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editarProducto();
});


function agregarAlCarrito(producto) {
    const id = producto.getAttribute('data-id');
    const nombre = producto.getAttribute('data-name');
    const precio = parseFloat(producto.getAttribute('data-price'));

    const itemCarrito = document.createElement('li');
    itemCarrito.textContent = `${nombre} - $${precio.toFixed(2)}`;
    carrito.appendChild(itemCarrito);


    const total = calcularTotal();
    totalSpan.textContent = total.toFixed(2);
}


function calcularTotal() {
    let total = 0;
    carrito.childNodes.forEach((item) => {
        const precio = parseFloat(item.textContent.split(' - $')[1]);
        total += precio;
    });
    return total;
}


function mostrarFormularioEdicion(producto) {
    const nombre = producto.getAttribute('data-name');
    const precio = parseFloat(producto.getAttribute('data-price'));

    editNameInput.value = nombre;
    editPriceInput.value = precio;


    editForm.style.display = 'block';
}


function editarProducto() {
  
    const nuevoNombre = editNameInput.value;
    const nuevoPrecio = parseFloat(editPriceInput.value);

    
    const ultimoItemCarrito = carrito.lastChild;
    if (ultimoItemCarrito) {
 
        ultimoItemCarrito.textContent = `${nuevoNombre} - $${nuevoPrecio.toFixed(2)}`;
    }

    editForm.style.display = 'none';

   
    const total = calcularTotal();
    totalSpan.textContent = total.toFixed(2);
}
