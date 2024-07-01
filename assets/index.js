import {productos} from './productos.js'

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesNav = document.querySelectorAll(".boton-nav");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosSeleccionados) { //recorre mi array de productos

 contenedorProductos.innerHTML = ""; //empieza como contenedor vacio

    productosSeleccionados.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="contenedor-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

     actualizarBotonesAgregar();
}

cargarProductos(productos);

    botonesNav.forEach(boton => {
    boton.addEventListener("click", (e) => {
       
        botonesNav.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

     if (e.currentTarget.id != "todos") {

       const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
       tituloPrincipal.innerText = productoCategoria.categoria.nombre; //cambia el nombre de categoria

       const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
       cargarProductos(productosBoton);

    } else {

       tituloPrincipal.innerText = "Todos los Productos";
       cargarProductos(productos);
       
    }

    })
});

function actualizarBotonesAgregar() {
     botonesAgregar = document.querySelectorAll(".producto-agregar");

     botonesAgregar.forEach(boton => {
     boton.addEventListener("click", agregarAlCarrito);

     });
}



let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



function agregarAlCarrito(e) {

    const  idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

   localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  
  }

  function actualizarNumerito() {
   try { let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} catch (error) {
    mostrarError("No se pudo actualizar el número de productos en el carrito.");
} finally {
  // Código que se ejecutará siempre, independientemente de si hubo un error o no
}
};


function mostrarError(mensaje) {
    const errorElement = document.getElementById("error-message");
    errorElement.innerText = mensaje;
    errorElement.style.display = "block";
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 3000); // Oculta el mensaje de error después de 3 segundos
  }

   
