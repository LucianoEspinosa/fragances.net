let arrayFiltro = [...fragancias];
const filtroPorMarca = document.getElementById('filtroMarca');

mostrarCarrito();
mostrarProductos();

filtroPorMarca.addEventListener('change', () => {
    //arrayFiltro = filtroPorMarca.value ? fragancias.filter(p => p.marca === filtroPorMarca.value) : fragancias; 
    if (filtroPorMarca.value) {
        arrayFiltro = fragancias.filter(p => p.marca === filtroPorMarca.value)
    } else {
        arrayFiltro = [...fragancias];
    }
    mostrarProductos();
});

function mostrarProductos() {

    let tarjetas = document.getElementById("verProductos");
    tarjetas.innerHTML = "";
    for (let item of arrayFiltro) {
        let bontonComprar = item.codigo.concat("btnComprar");
        let idH4 = ("precio" + item.nombre + item.presentacion).replace(' ', '');

        tarjetas.innerHTML += `
    
        <div class="d-flex flex-column align-items-center tarjeta">
        <img src="./img/${item.img}.jpg" class="d-block w-50" alt="${item.nombre}">
        
            <h2 class="card-title">${item.marca}</h2>
            <h3 class="card-text">${item.nombre}</h3>
            
            <div class="btn-group-sm p-1" role="group" aria-label="Basic example">
                <span type="button" class="btn btn-primary">${item.presentacion}</span>
            </div>
            <h4 id="${idH4}" class="classPrecio">$${item.precio}</h4>
            <button id="${bontonComprar}" type="button" onclick="agregarAlCarrito(${item.codigo})"
                        class="bontonComprar btn btn-primary border-0">Comprar</button>
        
        </div>
`
    }


}


function agregarAlCarrito(codigoPerfume) {
    // console.log(codigoPerfume);
    let existe = false;
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    for (let item of fragancias) {
        if (item.codigo == codigoPerfume) {
            existe = carrito.some(busca => busca.codigo == codigoPerfume);
            if (existe) {
                const productos = carrito.map(producto => {
                    if (producto.codigo === item.codigo) {
                        let cantidad = parseInt(producto.cantidad) + 1;
                        producto.cantidad = cantidad;
                        return producto;
                    } else {
                        return producto;
                    }
                });
                carrito = productos.slice();
            } else {
                item.cantidad = 1;
                carrito.push(item);
            }
        }
    }

    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito))

    mostrarCarrito()
}
function vaciarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    carrito = [];
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    cantidadDeProductos()
    mostrarCarrito();
}
function eliminarProductosDeCarrito(codigoPerfume) {
    console.log(codigoPerfume);
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].codigo == codigoPerfume) {
            console.log(carrito[i].codigo);
            carrito.splice(i, 1);

            break;
        }
    }
    cantidadDeProductos()
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    mostrarCarrito();
}
function restarUnidades(codigoPerfume) {
    console.log(codigoPerfume);
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].codigo == codigoPerfume) {
            console.log(carrito[i].codigo);
            carrito[i].cantidad = carrito[i].cantidad - 1;
            if (carrito[i].cantidad < 1) {
                carrito.splice(i, 1);
            }
            break;
        }
    }
    cantidadDeProductos()
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    mostrarCarrito();
}
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    let itemDecompra = document.getElementById("itemCompra");
    itemDecompra.innerHTML = "";
    for (let item of carrito) {

        itemDecompra.innerHTML += `
        <div id="div${item.codigo}" class="d-flex itemCarrito justify-content-evenly align-items-center">
        <img src="../img/${item.img}.jpg" class="imgCarrito" alt="">


        <div class="d-flex flex-column align-items-center justify-content-center itemCarrito_nombre ">
            <span>${item.marca}</span>
            <span class="text-center">${item.nombre} ${item.presentacion}</span>
        </div>
        <div class="itemCarrito_unidades d-flex">
            <i class="bi bi-cart-dash-fill " id="restar${item.codigo}" onclick="restarUnidades(${item.codigo})"></i>
            <input id="cantidad${item.codigo}" type="text" class="itemCarrito_cantidad" value="${item.cantidad}">
            <i class="bi bi-cart-plus-fill " id="sumar${item.codigo}" onclick="agregarAlCarrito(${item.codigo})"></i>
        </div>

        <span class="itemCarrito_precio">$${item.precio * item.cantidad}</span>
        <i id="eliminar${item.codigo}" onclick="eliminarProductosDeCarrito(${item.codigo})"
            class="bi bi-trash3-fill"></i>
    </div>`
        MontoTotal();
        cantidadDeProductos()

    }
    let precio = localStorage.getItem("precioTotal")
    let cantidad = localStorage.getItem("cantidadProductos")
    if (itemDecompra.innerHTML != "") {
        itemDecompra.innerHTML += `
    <div class="d-flex itemCarrito justify-content-evenly align-items-center">
        <img class="imgCarrito" src="../img/fragances.net.png" class="img-fluid" alt="">
        <div class="d-flex flex-column align-items-center justify-content-center itemCarrito_nombre ">
            <span>Total</span>
        </div>
        <div class="itemCarrito_unidades d-flex justify-content-center">
            <input type="text" class="itemCarrito_cantidad" value="${cantidad}">
        </div>

        <span class="itemCarrito_precio">$${precio}</span>
        <i  onclick="vaciarCarrito()"
            class="bi bi-trash3-fill"></i>
    </div>
    <span class="text-end d-block text-white"><button onclick="finalizarCompra()" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar Compra</button></span>
    `
    }
}

function MontoTotal() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let precio = carrito.reduce((total, i) => total + i.precio * i.cantidad, 0);
    localStorage.setItem("precioTotal", (precio));
}

function cantidadDeProductos() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let cantidad = carrito.reduce((cantidad, item) => cantidad + item.cantidad, 0);
    localStorage.setItem("cantidadProductos", (cantidad));
}
function finalizarCompra(){
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let tb = document.querySelector('#tablaCarrito');
    
    tb.innerHTML= ""
    for (let item of carrito) {
        
        tb.innerHTML += `
    <tr>
    <td scope="row">${item.marca}</td>
    <td >${item.nombre}</td>
    <td >${item.presentacion}</td>
    <td >${item.cantidad}</td>
    <td >$${item.cantidad* item.precio}</td>
    </tr>`
    }
    let total=localStorage.getItem("precioTotal")
    let suma=document.querySelector("#tablaTotal");
    suma.innerHTML="$" + total;

    
}