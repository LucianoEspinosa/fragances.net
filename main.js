let fragancias = [];
let arrayFiltro = [];
let arrayOrden = [];
let arrayPresentacion = [];

fetch('productos.json')
    .then(respuesta => respuesta.json())
    .then(prodImport => {
        fragancias = [...prodImport];
        arrayFiltro = [...fragancias];
        arrayPresentacion = [...arrayFiltro];
        arrayOrden = [...arrayFiltro];
        mostrarCarrito();
        renderFiltroMarca(fragancias);
        document.addEventListener("DOMContentLoaded", renderFiltropresentacion(fragancias));
        mostrarProductos(fragancias);
    })
    .catch(error => { swal({ title: "Error", text: "Error en la conxion con el servidor.", icon: "error", button: "Cerrar", }); });

const filtroPorMarca = document.getElementById('filtroMarca');
filtroPorMarca.addEventListener('change', () => {
    filtroPorPresentacion.value = "";
    ordenPorPrecio.value = "";
    arrayFiltro = filtroPorMarca.value ? fragancias.filter(p => p.marca === filtroPorMarca.value) : [...fragancias];
    arrayOrden = [...arrayFiltro]
    mostrarProductos(arrayFiltro);
    renderFiltropresentacion(arrayFiltro)
    console.log(arrayFiltro);
});

const filtroPorPresentacion = document.getElementById("idPresentacion");
filtroPorPresentacion.addEventListener('change', () => {
    ordenPorPrecio.value = "";
    arrayPresentacion = filtroPorPresentacion.value ? arrayFiltro.filter(p => p.presentacion === filtroPorPresentacion.value) : [...arrayFiltro];
    arrayOrden = [...arrayPresentacion];
    mostrarProductos(arrayPresentacion);
    console.log(arrayPresentacion);
});
const ordenPorPrecio = document.getElementById("ordenPorPrecio");
ordenPorPrecio.addEventListener("change", () => {
    arrayOrden = ordenPorPrecio.value === "menor" ? arrayFiltro.sort((a, b) => a.precio - b.precio) : ordenPorPrecio.value === "mayor" ? arrayOrden.sort((a, b) => b.precio - a.precio) : [...arrayFiltro];
    mostrarProductos(arrayOrden);
})
function renderFiltroMarca(array) {
    let marcas = [];
    for (let item of array) {
        marcas.indexOf(item.marca) === -1 && marcas.push(item.marca);
    }
    marcas.sort();
    const filtroPorMarca = document.getElementById("filtroMarca")
    for (let item in marcas) {
        let optionItem = document.createElement('option');
        optionItem.value = marcas[item];
        optionItem.textContent = marcas[item];
        filtroPorMarca.appendChild(optionItem);
    }
}
function renderFiltropresentacion(array) {
    let ml = [];
    for (let item of array) {
        ml.indexOf(item.presentacion) === -1 && ml.push(item.presentacion);
    }
    ml.sort((a, b) => parseInt(a) - parseInt(b));
    const filtroPorPresentacion = document.getElementById("idPresentacion")
    filtroPorPresentacion.innerHTML = `<option value="" selected>Todas</option>`;
    for (let item in ml) {
        let optionItem = document.createElement('option');
        optionItem.value = ml[item];
        optionItem.textContent = ml[item];
        filtroPorPresentacion.appendChild(optionItem);
    }
}
function mostrarProductos(array) {
    const tarjetas = document.getElementById("verProductos");
    tarjetas.innerHTML = "";
    for (let item of array) {
        const { codigo, marca, nombre, img, presentacion, precio } = item;
        let botonComprar = item.codigo.concat("btnComprar");
        let idH4 = ("precio" + nombre + presentacion).replace(' ', '');

        tarjetas.innerHTML += `
    
        <div class="d-flex flex-column align-items-center tarjeta">
        <img src="./img/${img}" class="d-block w-50" alt="${nombre}">
        
            <h2 class="card-title">${marca}</h2>
            <h3 class="card-text">${nombre}</h3>
            
            <div class="estiloPresentacion d-flex justify-content-center align-items-center">
                <span>${presentacion}</span>
            </div>
            <h4 id="${idH4}" class="classPrecio">$${precio}</h4>
            <button id="${botonComprar}" type="button" onclick="agregarAlCarrito(${codigo},true)" class="bontonComprar btn btn-primary border-0">Comprar</button>
            `
    }
}

function agregarAlCarrito(codigoPerfume, popUp) {
    popUp && swal({ title: "Felicitaciones!", text: "El Producto fue agregado al carrito.", icon: "success", button: "Seguir comprando", })

    let existe = false;
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    for (let item of fragancias) {
        if (item.codigo == codigoPerfume) {
            existe = carrito.some(busca => busca.codigo == codigoPerfume);
            if (existe) {
                Toastify({ text: "Producto Agregado", duration: 1000, style: { background: "#0d6efd" } }).showToast();
                const productos = carrito.map(producto => {
                    if (producto.codigo === item.codigo) {
                        let cantidad = parseInt(producto.cantidad) + 1;
                        producto.cantidad = cantidad;
                        return producto;
                    } else {
                        return producto;
                    }
                });
                carrito = [...productos];
            } else {
                item.cantidad = 1;
                carrito = [...carrito, item]
            }
        }
    }

    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito))

    mostrarCarrito()
}
function vaciarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    carrito = [];
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    cantidadDeProductos()
    mostrarCarrito();
}
function eliminarProductosDeCarrito(codigoPerfume) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    for (let i = 0; i < carrito.length; i++) {
        carrito[i].codigo == codigoPerfume && carrito.splice(i, 1);
    }
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    cantidadDeProductos()
    mostrarCarrito();
}
function restarUnidades(codigoPerfume) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].codigo == codigoPerfume) {
            carrito[i].cantidad = carrito[i].cantidad - 1;
            if (carrito[i].cantidad < 1) {
                carrito.splice(i, 1);
            }
        }
    }

    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    cantidadDeProductos()
    mostrarCarrito();
}
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    let itemDecompra = document.getElementById("itemCompra");
    itemDecompra.innerHTML = "";
    for (let item of carrito) {
        const { codigo, marca, nombre, img, presentacion, precio, cantidad } = item;
        itemDecompra.innerHTML += `
        <div id="div${codigo}" class="d-flex itemCarrito justify-content-evenly align-items-center">
        <img src="../img/${img}" class="imgCarrito" alt="">


        <div class="d-flex flex-column align-items-center justify-content-center itemCarrito_nombre ">
            <span>${marca}</span>
            <span class="text-center">${nombre} ${presentacion}</span>
        </div>
        <div class="itemCarrito_unidades d-flex">
            <i class="bi bi-cart-dash-fill iconCant" id="restar${codigo}" onclick="restarUnidades(${codigo})"></i>
            <span id="cantidad${codigo}"  class="itemCarrito_cantidad">${cantidad}</span>
            <i class="bi bi-cart-plus-fill iconCant" id="sumar${codigo}" onclick="agregarAlCarrito(${codigo})"></i>
        </div>

        <span class="itemCarrito_precio">$${precio * cantidad}</span>
        <i id="eliminar${codigo}" onclick="eliminarProductosDeCarrito(${codigo})"
            class="bi bi-trash3-fill iconTrash"></i>
    </div>`
        MontoTotal();
        cantidadDeProductos();

    }
    let precio = localStorage.getItem("precioTotal");
    let cantidad = localStorage.getItem("cantidadProductos");
    let mostrarCantidad = document.getElementById("changuito");
    if (cantidad > 0) {
        mostrarCantidad.innerText = cantidad;
        mostrarCantidad.className = ("changuito");
    } else {
        mostrarCantidad.innerText = "";
        mostrarCantidad.classList.remove("changuito")
    }
    if (itemDecompra.innerHTML != "") {
        itemDecompra.innerHTML += `
    <div class="d-flex itemCarrito justify-content-evenly align-items-center">
        <img class="imgCarrito" src="../img/fragances.net.png" class="img-fluid" alt="">
        <div class="d-flex flex-column align-items-center justify-content-center itemCarrito_nombre ">
            <span>Total</span>
        </div>
        <div class="itemCarrito_unidades d-flex justify-content-center">
            <span class="itemCarrito_cantidad">${cantidad}</span>
        </div>

        <span class="itemCarrito_precio">$${precio}</span>
        <i  onclick="vaciarCarrito()"
            class="bi bi-trash3-fill iconTrash"></i>
    </div>
    <span class="text-end d-block text-white"><button onclick="finalizarCompra()" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar Compra</button></span>
    `
    }
}
function MontoTotal() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    let precio = carrito.reduce((total, i) => total + i.precio * i.cantidad, 0);
    localStorage.setItem("precioTotal", (precio));
}
function cantidadDeProductos() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    let cantidad = carrito.reduce((cantidad, item) => cantidad + item.cantidad, 0);
    localStorage.setItem("cantidadProductos", (cantidad));
}
function finalizarCompra() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras'));
    let tb = document.getElementById('tablaCarrito');

    tb.innerHTML = ""
    for (let item of carrito) {

        tb.innerHTML += `
    <tr>
    <td scope="row">${item.marca}</td>
    <td >${item.nombre}</td>
    <td >${item.presentacion}</td>
    <td >${item.cantidad}</td>
    <td >$${item.cantidad * item.precio}</td>
    </tr>`
    }
    let total = localStorage.getItem("precioTotal")
    let suma = document.getElementById("tablaTotal");
    suma.innerHTML = "$" + total;
    vaciarCarrito();
}