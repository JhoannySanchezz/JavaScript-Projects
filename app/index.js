let productos = [
// Abrigos
{
    id: "sweater-01",
    titulo: "Sweater 01",
    imagen: "./images/sweaters/sweater-01.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-02",
    titulo: "Sweater 02",
    imagen: "./images/sweaters/sweater-02.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-03",
    titulo: "Sweater 03",
    imagen: "./images/sweaters/sweater-03.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-04",
    titulo: "Sweater 04",
    imagen: "./images/sweaters/sweater-04.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-05",
    titulo: "Sweater 05",
    imagen: "./images/sweaters/sweater-05.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-06",
    titulo: "Sweater 06",
    imagen: "./images/sweaters/sweater-06.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-07",
    titulo: "Sweater 07",
    imagen: "./images/sweaters/sweater-07.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-08",
    titulo: "Sweater 08",
    imagen: "./images/sweaters/sweater-08.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-09",
    titulo: "Sweater 09",
    imagen: "./images/sweaters/sweater-09.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-10",
    titulo: "Sweater 10",
    imagen: "./images/sweaters/sweater-10.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-11",
    titulo: "Sweater 11",
    imagen: "./images/sweaters/sweater-11.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
{
    id: "sweater-12",
    titulo: "Sweater 12",
    imagen: "./images/sweaters/sweater-12.jpg",
    categoria: {
        nombre: "Sweater",
        id:"sweaters"
    },
    precio: 1000
},
//CAMISAS
{
    id: "camisa-01",
    titulo: "Camisa 01",
    imagen: "./images/camisas/camisa-01.jpg",
    categoria: {
        nombre: "Camisa",
        id:"camisas"
    },
    precio: 1000
},
{
    id: "camisa-02",
    titulo: "Camisa 02",
    imagen: "./images/camisas/camisa-02.jpg",
    categoria: {
        nombre: "Camisa",
        id:"camisas"
    },
    precio: 1000
},
//PANTALONES
{
    id: "pantalon-01",
    titulo: "Pantalon 01",
    imagen: "./images/pantalones/pantalon-01.jpg",
    categoria: {
        nombre: "Pantalon",
        id:"pantalones"
    },
    precio: 1000
},
{
    id: "pantalon-02",
    titulo: "Pantalon 02",
    imagen: "./images/pantalones/pantalon-02.jpg",
    categoria: {
        nombre: "Pantalon",
        id:"pantalones"
    },
    precio: 1000
},
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesNav = document.querySelectorAll(".boton-nav");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.getElementById("#numerito");

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
            <button class="producto-agregar">${producto.id}</button>
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
//let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
/*if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); 
    actualizarNumerito();
} else {
    productosEnCarrito =[];
}*/

const productosEnCarrito = [];


function agregarAlCarrito(e) {

    const  id = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    console.log(id);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

  //  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}