const carrito=[];

let tarjetas = document.getElementById("resultado");

for (let item of fragancias) {
    let bontonComprar=item.codigo.concat("btnComprar");
    let idH4=("precio"+ item.nombre+item.presentacion).replace(' ','');
    
        
    
    tarjetas.innerHTML += `
    
        <div class="d-flex flex-column align-items-center tarjeta">
        <img src="./img/${item.img}.jpg" class="d-block w-100" alt="${item.nombre}">
        
            <h2 class="card-title">${item.marca}</h2>
            <h3 class="card-text">${item.nombre}</h3>
            
            <div class="btn-group-sm p-1" role="group" aria-label="Basic example">
                <span type="button" class="btn btn-primary">${item.presentacion}</span>
            </div>
            <h4 id="${idH4}" class="classPrecio">$${item.precio}</h4>
            <button id=${bontonComprar}" type="button" onclick="agregarAlCarrito(${item.codigo})"
                        class="bontonComprar btn btn-primary border-0">Comprar</button>
        
        </div>

    `
    }


function agregarAlCarrito(codigoPerfume) {
    console.log(codigoPerfume);
    
    for (let item of fragancias) {
        if (item.codigo == codigoPerfume) {
            carrito.push(item);
            // const mostrarCarro = carrito.map(item => item.marca + " " + item.nombre + item.presentacion + " $" + item.precio);
            // alert("Se agrego " mostrarCarro " al carrito")
            console.log(carrito)
        } else {
            console.log("no esta en la lista de productos")
        }
    }

}
