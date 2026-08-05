const URL = "http://localhost:3000/api/items";

let productos = [];

let categoriaActual = "todos";

async function cargarProductos(){

    const respuesta = await fetch(URL);

    const datos = await respuesta.json();

    productos = datos.items;

    actualizarEstadisticas();

    renderizar();

}

function actualizarEstadisticas(){

    document.getElementById("total").textContent = productos.length;

    document.getElementById("arroz").textContent =
        productos.filter(p=>p.categoria==="arroz").length;

    document.getElementById("papas").textContent =
        productos.filter(p=>p.categoria==="papas").length;

    document.getElementById("agua").textContent =
        productos.filter(p=>p.categoria==="agua").length;

    document.getElementById("galletas").textContent =
        productos.filter(p=>p.categoria==="galletas").length;

    document.getElementById("gaseosa").textContent =
        productos.filter(p=>p.categoria==="gaseosa").length;

}

function renderizar(){

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML="";

    let lista = productos;

    if(categoriaActual!="todos"){

        lista = productos.filter(

            p=>p.categoria===categoriaActual

        );

    }

    if(lista.length===0){

        contenedor.innerHTML="<h2>No existen productos.</h2>";

        return;

    }

    lista.forEach(producto=>{

        contenedor.innerHTML += `

        <div class="card">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p><strong>Categoría:</strong> ${producto.categoria}</p>

            <p><strong>Precio:</strong> ${producto.precio}</p>

            <p><strong>Precio lista:</strong> ${producto.precio_lista || "No disponible"}</p>

            <a href="${producto.url}" target="_blank">

                Ver producto

            </a>

        </div>

        `;

    });

}

document.getElementById("actualizar").addEventListener(

    "click",

    cargarProductos

);

document.querySelectorAll(".filtro").forEach(boton=>{

    boton.addEventListener("click",()=>{

        document.querySelectorAll(".filtro")

        .forEach(b=>b.classList.remove("activo"));

        boton.classList.add("activo");

        categoriaActual = boton.dataset.categoria;

        renderizar();

    });

});

cargarProductos();