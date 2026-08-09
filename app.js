const API_URL =
    "https://script.google.com/macros/s/AKfycbwEPSBc_MCTBRWMEDRrwW9ssIudg027t_5GhJVoDNowvihvP-UiinkHf7JzcOfyf6zZ/exec";


const productosContenedor =
    document.getElementById("productos");

const categoriasContenedor =
    document.getElementById("categorias");

const buscador =
    document.getElementById("buscador");

const ordenar =
    document.getElementById("ordenar");

const sinResultados =
    document.getElementById("sinResultados");

const contador =
    document.getElementById("contador");


let productos = [];

let categoriaActual = "Todas";

let ordenActual = "orden";


let numeroWhatsapp = "";

let mensajeWhatsapp = "";


// ============================
// CARGAR DATOS
// ============================

async function cargarProductos() {

    try {

        productosContenedor.innerHTML =
            "<p>Cargando productos...</p>";


        const respuesta =
            await fetch(API_URL);


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo conectar con la API"
            );

        }


        const datos =
            await respuesta.json();


        numeroWhatsapp =
            datos.whatsapp || "";


        mensajeWhatsapp =
            datos.mensajeWhatsapp || "";


        productos =
            (datos.productos || [])
                .filter(
                    producto =>
                        esVisible(producto)
                );


        crearCategorias();

        mostrarProductos();


    } catch (error) {

        console.error(error);


        productosContenedor.innerHTML = `
            <p>
                No se pudieron cargar los productos.
            </p>
        `;

    }

}


// ============================
// REGLAS DE CAMPOS
// ============================

function esVisible(producto) {

    return (
        normalizar(
            producto.visible
        ) !== "no"
    );

}


function esDestacado(producto) {

    return (
        normalizar(
            producto.destacado
        ) === "si"
    );

}


function tieneStock(producto) {

    return (
        normalizar(
            producto.stock
        ) !== "no"
    );

}


function normalizar(valor) {

    return String(
        valor ?? ""
    )
        .trim()
        .toLowerCase();

}


// ============================
// CATEGORIAS
// ============================

function crearCategorias() {

    const categorias =
        [
            ...new Set(
                productos
                    .map(
                        producto =>
                            producto.categoria
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    categoriasContenedor.innerHTML =
        "";


    crearBotonCategoria(
        "Todas"
    );


    categorias.forEach(
        categoria => {

            crearBotonCategoria(
                categoria
            );

        }
    );

}


function crearBotonCategoria(
    categoria
) {

    const boton =
        document.createElement(
            "button"
        );


    boton.type =
        "button";


    boton.className =
        "categoria-btn";


    if (
        categoria ===
        categoriaActual
    ) {

        boton.classList.add(
            "activa"
        );

    }


    boton.textContent =
        categoria;


    boton.addEventListener(
        "click",
        () => {

            categoriaActual =
                categoria;


            document
                .querySelectorAll(
                    ".categoria-btn"
                )
                .forEach(
                    btn =>
                        btn.classList.remove(
                            "activa"
                        )
                );


            boton.classList.add(
                "activa"
            );


            mostrarProductos();

        }
    );


    categoriasContenedor
        .appendChild(
            boton
        );

}


// ============================
// MOSTRAR PRODUCTOS
// ============================

function mostrarProductos() {

    const texto =
        buscador.value
            .trim()
            .toLowerCase();


    let filtrados =
        productos.filter(
            producto => {

                const coincideCategoria =
                    categoriaActual ===
                    "Todas" ||
                    producto.categoria ===
                    categoriaActual;


                const nombre =
                    String(
                        producto.nombre || ""
                    )
                    .toLowerCase();


                const descripcion =
                    String(
                        producto.descripcion || ""
                    )
                    .toLowerCase();


                return (
                    coincideCategoria &&
                    (
                        nombre.includes(texto) ||
                        descripcion.includes(texto)
                    )
                );

            }
        );


    ordenarProductos(
        filtrados
    );


    productosContenedor.innerHTML =
        "";


    contador.textContent =
        filtrados.length === 1
            ? "1 producto"
            : `${filtrados.length} productos`;


    sinResultados.classList.toggle(
        "oculto",
        filtrados.length > 0
    );


    filtrados.forEach(
        producto => {

            productosContenedor
                .appendChild(
                    crearProducto(
                        producto
                    )
                );

        }
    );

}


// ============================
// ORDENAMIENTO
// ============================

function ordenarProductos(
    lista
) {

    if (
        ordenActual ===
        "precio-asc"
    ) {

        lista.sort(
            (a, b) =>
                obtenerPrecio(
                    a.precio
                ) -
                obtenerPrecio(
                    b.precio
                )
        );

        return;

    }


    if (
        ordenActual ===
        "precio-desc"
    ) {

        lista.sort(
            (a, b) =>
                obtenerPrecio(
                    b.precio
                ) -
                obtenerPrecio(
                    a.precio
                )
        );

        return;

    }


    // Orden del catálogo

    lista.sort(
        (a, b) => {

            const ordenA =
                obtenerOrden(
                    a.orden
                );

            const ordenB =
                obtenerOrden(
                    b.orden
                );


            return ordenA - ordenB;

        }
    );

}


function obtenerOrden(valor) {

    if (
        valor === null ||
        valor === undefined ||
        String(valor).trim() === ""
    ) {
        return 999999;
    }

    const numero = parseInt(
        String(valor).trim(),
        10
    );

    if (Number.isNaN(numero)) {
        return 999999;
    }

    return numero;
}


// ============================
// CONVERTIR PRECIO
// ============================

function obtenerPrecio(
    precio
) {

    let texto =
        String(
            precio ?? ""
        );


    texto =
        texto.replace(
            /[^0-9,.-]/g,
            ""
        );


    // Precios argentinos:
    // 8.500 → 8500

    if (
        texto.includes(".") &&
        !texto.includes(",")
    ) {

        texto =
            texto.replace(
                /\./g,
                ""
            );

    }


    // 8500,50 → 8500.50

    texto =
        texto.replace(
            ",",
            "."
        );


    const numero =
        parseFloat(
            texto
        );


    return Number.isFinite(
        numero
    )
        ? numero
        : 0;

}


// ============================
// CREAR PRODUCTO
// ============================

function crearProducto(
    producto
) {

    const tarjeta =
        document.createElement(
            "article"
        );


    tarjeta.className =
        "producto";


    const destacado =
        esDestacado(
            producto
        );


    const stock =
        tieneStock(
            producto
        );


    if (destacado) {

        tarjeta.classList.add(
            "destacado"
        );

    }


    if (!stock) {

        tarjeta.classList.add(
            "sin-stock"
        );

    }


    // ============================
    // IMAGEN
    // ============================

    const imagenContenedor =
        document.createElement(
            "div"
        );


    imagenContenedor.className =
        "producto-imagen-contenedor";


    const imagen =
        document.createElement(
            "img"
        );


    imagen.className =
        "producto-imagen";


    imagen.alt =
        producto.nombre;


    imagen.loading =
        "lazy";


    if (producto.foto) {

        imagen.src =
            obtenerUrlImagen(
                producto.foto
            );

    }


    imagen.onerror =
        () => {

            imagen.style.display =
                "none";

        };


    imagenContenedor
        .appendChild(
            imagen
        );


    // ============================
    // INFORMACIÓN
    // ============================

    const info =
        document.createElement(
            "div"
        );


    info.className =
        "producto-info";


    if (destacado) {

        const etiqueta =
            document.createElement(
                "span"
            );


        etiqueta.className =
            "etiqueta-destacado";


        etiqueta.textContent =
            "DESTACADO";


        tarjeta.appendChild(
            etiqueta
        );

    }


    const categoria =
        producto.categoria
            ? `
                <div class="producto-categoria">
                    ${escaparHTML(
                        producto.categoria
                    )}
                </div>
            `
            : "";


    const descuento =
        producto.descuento
            ? `
                <div class="producto-descuento">
                    ${escaparHTML(
                        producto.descuento
                    )}
                </div>
            `
            : "";


    const estadoStock =
        stock
            ? ""
            : `
                <div class="sin-stock">
                    SIN STOCK
                </div>
            `;


    info.innerHTML = `

        ${categoria}

        <h2>
            ${escaparHTML(
                producto.nombre
            )}
        </h2>

        ${
            producto.descripcion
                ? `
                    <div class="producto-descripcion">
                        ${escaparHTML(
                            producto.descripcion
                        )}
                    </div>
                `
                : ""
        }

        <div class="producto-precio">
            ${escaparHTML(
                producto.precio
            )}
        </div>

        ${descuento}

        ${estadoStock}

        <a
            class="producto-boton"
            href="#"
        >
            Consultar por WhatsApp
        </a>

    `;


    // ============================
    // WHATSAPP
    // ============================

    const boton =
        info.querySelector(
            ".producto-boton"
        );


    boton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            abrirWhatsApp(
                producto
            );

        }
    );


    tarjeta.appendChild(
        imagenContenedor
    );


    tarjeta.appendChild(
        info
    );


    return tarjeta;

}


// ============================
// IMAGEN
// ============================

function obtenerUrlImagen(
    foto
) {

    const texto =
        String(
            foto
        );


    // Markdown:
    // [texto](URL)

    const markdown =
        texto.match(
            /\((https?:\/\/[^)]+)\)/
        );


    if (markdown) {

        return markdown[1];

    }


    // Buscar directamente HTTPS

    const inicio =
        texto.indexOf(
            "https://"
        );


    if (inicio >= 0) {

        return texto.substring(
            inicio
        );

    }


    return texto;

}


// ============================
// WHATSAPP
// ============================

function abrirWhatsApp(
    producto
) {

    if (!numeroWhatsapp) {

        alert(
            "No hay un número de WhatsApp configurado."
        );

        return;

    }


    let mensaje =
        mensajeWhatsapp;


    if (mensaje) {

        mensaje += " ";

    }


    mensaje +=
        producto.nombre;


    mensaje +=
        " - " +
        producto.precio;


    const numero =
        String(
            numeroWhatsapp
        )
        .replace(
            /\D/g,
            ""
        );


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(
            mensaje
        );


    window.open(
        url,
        "_blank"
    );

}


// ============================
// SEGURIDAD
// ============================

function escaparHTML(
    texto
) {

    return String(
        texto ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ============================
// EVENTOS
// ============================

buscador.addEventListener(
    "input",
    mostrarProductos
);


ordenar.addEventListener(
    "change",
    () => {

        ordenActual =
            ordenar.value;

        mostrarProductos();

    }
);


// ============================
// INICIO
// ============================

cargarProductos();