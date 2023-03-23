mostrarCarrito()
mostrarProductos()



function mostrarProductos() {
    let tarjetas = document.getElementById("verProductos");

    for (let item of fragancias) {
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

    //  mostrarCarrito()
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
                console.log("aguante luchito");
                carrito.splice(i, 1);
                // eliminarProductosDeCarrito(codigoPerfume);
            }

            break;
        }
    }
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    mostrarCarrito();
}
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    let itemDecompra = document.getElementById("itemCompra");
    let tablaCarrito = document.getElementById("carritoDropDown");
    let totalCarrito= document.getElementById("carritoDropDown2");
    
    itemDecompra.innerHTML = "";
    tablaCarrito.innerHTML = "";
    totalCarrito.innerHTML = "";


    
    for (let item of carrito) {

        itemDecompra.innerHTML += `
        <div id="div${item.codigo}" class="d-flex itemCarrito justify-content-evenly align-items-center">
            <img src="../img/${item.img}.jpg" class="imgCarrito" alt="">

            <div class="d-flex flex-column align-items-center justify-content-around ">
                <span class="">${item.marca + " " + item.nombre + " " + item.presentacion}</span>
                <div class="unidades d-flex">
                    <i class="bi bi-cart-dash-fill " id="restar${item.codigo}" onclick="restarUnidades(${item.codigo})"></i>
                    <input id="cantidad${item.codigo}" type="text" class="cantidad" value="${item.cantidad}">
                    <i class="bi bi-cart-plus-fill " id="sumar${item.codigo}" onclick="agregarAlCarrito(${item.codigo})"></i>
                </div>
            </div>

            <div class="d-flex flex-column align-items-center justify-content-around ">
                <span>Precio</span>
            
                <div class="unidades" ><span>$${item.precio * item.cantidad}</span></div>
            </div>
    
            <i id="eliminar${item.codigo}" onclick="eliminarProductosDeCarrito(${item.codigo})"
            class="bi bi-trash3-fill"></i>
        </div>`

        tablaCarrito.innerHTML += `
    <tr class="text-center">
        <td class=""><img class="tableImg" src="../img/${item.img}.jpg"</td>
        <td>${item.marca}</td>
        <td>${item.nombre}</td>
        <td>${item.presentacion}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio}</td>
        <td><i id="eliminar${item.codigo}" onclick="eliminarProductosDeCarrito(${item.codigo})"
        class="bi bi-trash3-fill vaciarCarrito"></i></td>
    </tr>`
    }
    let precio=localStorage.getItem("precioTotal");
    let cantidad=JSON.parse(localStorage.getItem("CantidadProductos"));
    
    totalCarrito.innerHTML = `
    <tr class="text-center">
        <td colspan="7"><a>Finalizar Compra</a></td>
        <td>${cantidad}</td>
        <td>$${precio}</td>
        <td><i class="bi bi-trash3-fill vaciarCarrito"></i></td>
    </tr>
    
    `
    MontoTotal()
}


function MontoTotal() {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let precio = carrito.reduce((total, i) => total + i.precio * i.cantidad, 0);

    let cantidad = carrito.reduce((cantidad, item) => cantidad + item.cantidad, 0);


    localStorage.setItem("cantidadProductos", (cantidad));
    localStorage.setItem("precioTotal", (precio));
}