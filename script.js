// ========================================
// ARCOÍRIS CAFÉ - SCRIPT.JS
// ========================================


// ========================================
// PRODUCTOS
// ========================================

const productos = [
    {
        id: "cafe-americano",
        nombre: "Café Americano",
        precio: 10
    },
    {
        id: "cafe-con-leche",
        nombre: "Café con Leche",
        precio: 12
    },
    {
        id: "capuchino",
        nombre: "Capuchino",
        precio: 15
    },
    {
        id: "latte",
        nombre: "Latte",
        precio: 15
    },
    {
        id: "mocha",
        nombre: "Mocha",
        precio: 16
    },
    {
        id: "chocolate",
        nombre: "Chocolate Caliente",
        precio: 14
    },
    {
        id: "jugo-natural",
        nombre: "Jugo Natural",
        precio: 12
    },
    {
        id: "limonada",
        nombre: "Limonada",
        precio: 10
    },
    {
        id: "torta-chocolate",
        nombre: "Torta de Chocolate",
        precio: 18
    },
    {
        id: "cheesecake",
        nombre: "Cheesecake",
        precio: 18
    },
    {
        id: "brownie",
        nombre: "Brownie",
        precio: 12
    },
    {
        id: "galletas",
        nombre: "Galletas Caseras",
        precio: 8
    },
    {
        id: "sandwich",
        nombre: "Sandwich",
        precio: 18
    },
    {
        id: "desayuno",
        nombre: "Desayuno",
        precio: 25
    },
    {
        id: "combo-arcoiris",
        nombre: "Combo Arcoíris",
        precio: 30
    }
];


// ========================================
// CARRITO
// ========================================

const NOMBRE_CARRITO = "arcoiris_carrito";


// Obtener carrito
function obtenerCarrito() {

    const carritoGuardado =
        localStorage.getItem(NOMBRE_CARRITO);

    if (!carritoGuardado) {
        return [];
    }

    try {
        return JSON.parse(carritoGuardado);
    } catch (error) {
        return [];
    }
}


// Guardar carrito
function guardarCarrito(carrito) {

    localStorage.setItem(
        NOMBRE_CARRITO,
        JSON.stringify(carrito)
    );

}


// ========================================
// ACTUALIZAR CONTADOR
// ========================================

function actualizarContadorCarrito() {

    const contador =
        document.getElementById("cantidad-carrito");

    if (!contador) return;

    const carrito = obtenerCarrito();

    let cantidad = 0;

    carrito.forEach(producto => {
        cantidad += producto.cantidad;
    });

    contador.textContent = cantidad;
}


// ========================================
// AGREGAR PRODUCTO
// ========================================

function agregarAlCarrito(idProducto) {

    const producto =
        productos.find(item => item.id === idProducto);

    if (!producto) return;

    const carrito = obtenerCarrito();

    const productoExistente =
        carrito.find(item => item.id === idProducto);


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1

        });

    }


    guardarCarrito(carrito);

    actualizarContadorCarrito();

}


// ========================================
// BOTONES "COMPRAR"
// ========================================

const botonesComprar =
    document.querySelectorAll(".boton-comprar");


botonesComprar.forEach(boton => {

    boton.addEventListener("click", function(event) {

        event.preventDefault();


        const enlace =
            this.getAttribute("href");


        const url =
            new URL(enlace, window.location.href);


        const idProducto =
            url.searchParams.get("producto");


        if (idProducto) {

            agregarAlCarrito(idProducto);

        }


        // Ir al carrito

        window.location.href = "carrito.html";

    });

});


// ========================================
// FILTRO DEL MENÚ
// ========================================

const botonesFiltro =
    document.querySelectorAll(".filtro");

const tarjetasProducto =
    document.querySelectorAll(".producto");


botonesFiltro.forEach(boton => {

    boton.addEventListener("click", function() {


        // Quitar activo

        botonesFiltro.forEach(item => {

            item.classList.remove("activo");

        });


        // Activar botón seleccionado

        this.classList.add("activo");


        const categoria =
            this.getAttribute("data-categoria");


        tarjetasProducto.forEach(producto => {

            const categoriaProducto =
                producto.getAttribute("data-categoria");


            if (
                categoria === "todos" ||
                categoria === categoriaProducto
            ) {

                producto.style.display = "";

            } else {

                producto.style.display = "none";

            }

        });

    });

});


// ========================================
// MENÚ PARA CELULAR
// ========================================

const botonMenu =
    document.getElementById("boton-menu");

const nav =
    document.querySelector(".nav");


if (botonMenu && nav) {

    botonMenu.addEventListener("click", function() {

        nav.classList.toggle("mostrar");

    });


    // Cerrar menú al seleccionar una opción

    const enlacesNav =
        nav.querySelectorAll("a");


    enlacesNav.forEach(enlace => {

        enlace.addEventListener("click", function() {

            nav.classList.remove("mostrar");

        });

    });

}


// ========================================
// VOLVER ARRIBA
// ========================================

const botonArriba =
    document.getElementById("volver-arriba");


if (botonArriba) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 400) {

            botonArriba.classList.add("mostrar");

        } else {

            botonArriba.classList.remove("mostrar");

        }

    });


    botonArriba.addEventListener("click", function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ========================================
// DESPLAZAMIENTO SUAVE
// ========================================

const enlacesInternos =
    document.querySelectorAll('a[href^="#"]');


enlacesInternos.forEach(enlace => {

    enlace.addEventListener("click", function(event) {

        const destino =
            this.getAttribute("href");


        if (
            !destino ||
            destino === "#"
        ) {
            return;
        }


        const seccion =
            document.querySelector(destino);


        if (seccion) {

            event.preventDefault();


            seccion.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


// ========================================
// INICIAR CONTADOR
// ========================================

actualizarContadorCarrito();