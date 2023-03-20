mostrarCarrito()
mostrarProductos()



function mostrarProductos() {
    let tarjetas = document.getElementById("verProductos");

    for (let item of fragancias) {
        let bontonComprar = item.codigo.concat("btnComprar");
        let idH4 = ("precio" + item.nombre + item.presentacion).replace(' ', '');

        tarjetas.innerHTML += `
    
        <div class="d-flex flex-column align-items-center tarjeta">
        <img src="./img/${item.img}.jpg" class="d-block w-100" alt="${item.nombre}">
        
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
    // mostrarCarrito()
}

function agregarAlCarrito(codigoPerfume) {
    // console.log(codigoPerfume);
    let existe = false;
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    for (let item of fragancias) {
        if (item.codigo == codigoPerfume) {
            existe = carrito.some(busca => busca.codigo == codigoPerfume);
            if (!existe) {
                carrito.push(item);
                // let cantidad = document.querySelector(`#cantidad${item.codigo}`);
                // cantidad.value = parseInt(cantidad.value) + 1;
                // console.log(cantidad)

            } else {
                //si ya tenes 1 le agrega otro
                //sumarle cantidad al producto
                alert("el producto ya fue agregado al carrito");
            }
            // carrito.push(item);
            // const mostrarCarro = carrito.map(item => item.marca + " " + item.nombre + item.presentacion + " $" + item.precio);
            // alert("Se agrego " mostrarCarro " al carrito")
            // console.log(carritoDeCompras)

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
function mostrarCarrito() {

    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    // if (carrito = []) {
    //     let titulo = document.getElementById('estadoDeCarrito');
    //     titulo.innerhtml = "Sin Productos en el carrito"
    // } 

        let itemDecompra = document.getElementById("itemCompra");
        itemDecompra.innerHTML = ""; // Limpiar contenido previo
        console.log(carrito);
        for (let item of carrito) {

            itemDecompra.innerHTML += `
    <div id="div${item.codigo}"class="d-flex itemCarrito justify-content-evenly align-items-center">
        <img src="../img/${item.img}.jpg" class="imgCarrito" alt="">
                    
        <div class="d-flex flex-column align-items-center justify-content-center ">
            <span>${item.marca + " " + item.nombre + " " + item.presentacion}</span>
                        
            <div class="unidades d-flex">
                <i class="bi bi-cart-dash-fill "></i>
                <input id="cantidad${item.codigo}"type="text" class="cantidad" value="0">
                <i class="bi bi-cart-plus-fill"></i>
            </div>
                    
            </div>
                    
                <div class="d-flex flex-column align-items-center justify-content-center">
                        
                    <i id="eliminar${item.codigo}" onclick="eliminarProductosDeCarrito(${item.codigo})"  class="bi bi-trash3-fill"></i>
                </div>
        </div>
    </div>
    `
            //let botonborrar = document.querySelector(`#eliminar${item.codigo}`);
            // console.log(botonborrar.id);
            // document.querySelector(`#eliminar${item.codigo}`).addEventListener("click", () => {
            //     console.log("hizo click en borrar");
            //     eliminarProductosDeCarrito(item.codigo);
            //     // console.log(item.codigo);
            //     document.querySelector(`#div${item.codigo}`).remove();

            // })

        }

    }



