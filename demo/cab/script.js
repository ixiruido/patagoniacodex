document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousedown', () => {
        card.style.transform = 'translateY(-5px) scale(0.98)';});
    card.addEventListener('mouseup', () => {
        card.style.transform = 'translateY(-10px) scale(1)';});});

// Detección de sección activa en el menú
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;}});

    navLinks.forEach(link => {link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');}});});

       document.addEventListener("DOMContentLoaded", function() {
            const elementosARevelar = document.querySelectorAll('.reveal');
            const observador = new IntersectionObserver((entradas, miObservador) => {
                entradas.forEach(entrada => {if (entrada.isIntersecting) {
                        // Retraso escalonado para evitar que todas las tarjetas se activen al mismo tiempo
                        const delay = Array.from(elementosARevelar).indexOf(entrada.target) * 100;
                        setTimeout(() => {entrada.target.classList.add('active');
                        }, delay); miObservador.unobserve(entrada.target);}});}, 
            { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
            elementosARevelar.forEach(el => observador.observe(el));

            // Activar sección inicial al cargar
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a');
            const scrollPosition = window.scrollY + 100;

            let current = '';sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;}});

            navLinks.forEach(link => {link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');}});

            // Inicializar tarjeta de cabaña
            loadCabinData();
        });

// ==================== CÓDIGO INTEGRADO DE CARDCABIN.JS ====================

// REEMPLAZA CON TU URL GENERADA EN DEPLOY DE APPS SCRIPT
const urlScript = "./cabanas.json";

async function loadCabinData() {
    const globalLoader = document.getElementById("global-loader");
    try {
        // Agregar timestamp para evitar cache
        const urlWithTimestamp = `${urlScript}?t=${new Date().getTime()}`;
        const response = await fetch(urlWithTimestamp);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
        processCabinData(data);
    } catch (error) {
        console.error("Error cargando API, usando backup local:", error);
        // Si no hay testData disponible, aún así cargamos la tarjeta
        if (typeof testData !== 'undefined') {
            processCabinData(testData);
        } else {
            // Datos de ejemplo por defecto
            processCabinData({
                cabanas: [{
                    nombre: "Cabaña del Bosque",
                    precioBase: "$150/noche",
                    estado: "Disponible",
                    ultimaActualizacion: "Hoy",
                    whatsappLink: "https://wa.me",
                    descuento: "",
                    aviso: ""
                }]
            });
        }
    } finally {
        // Quitamos la pantalla de carga global
        if (globalLoader) {
            globalLoader.style.display = "none";
        }
    }
}

function processCabinData(data) {
    // Verificar si data contiene un array de cabañas
    const cabanas = data.cabanas || (Array.isArray(data) ? data : [data]);
    
    // Obtener el contenedor de tarjetas
    const container = document.querySelector('.cabin-card-container');
    
    // Limpiar el contenedor actual
    container.innerHTML = '';
    
    // Generar tarjetas para cada cabaña
    cabanas.forEach((cabin, index) => {
        // Crear la tarjeta HTML
        const cardHTML = `
            <div class="cabin-card loading" id="cabin-card-${index}">
                <div class="card-content">
                    <div class="card-header">
                        <h3 id="cabin-title-${index}">${cabin.nombre || "Cabaña"}</h3>
                        <span class="status-badge" id="cabin-status-${index}">${cabin.estado || "-"}</span>
                    </div>
                    
                    <div class="card-body">
                        <div class="price-section">
                            <p class="price-label">Precio por día</p>
                            <p class="price-value" id="cabin-price-${index}">${cabin.precioBase || "-"}</p>
                            <p class="discount-tag" id="cabin-discount-${index}" style="display: none;"></p>
                        </div>
                        
                        <div class="notice-box" id="cabin-notice-box-${index}" style="display: none;">
                            <strong>⚠️ Aviso:</strong> <span id="cabin-notice-${index}">-</span>
                        </div>
                    </div>
                    
                    <div class="card-footer">
                        <a href="#" id="whatsapp-btn-${index}" class="btn-whatsapp" target="_blank">
                            💬 Reservar por WhatsApp
                        </a>
                        <p class="update-text">Actualizado: <span id="cabin-update-${index}">${cabin.ultimaActualizacion || "-"}</span></p>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar la tarjeta al contenedor
        container.innerHTML += cardHTML;
        
        // Configurar cada tarjeta individualmente
        const statusBadge = document.getElementById(`cabin-status-${index}`);
        const whatsappBtn = document.getElementById(`whatsapp-btn-${index}`);
        const discountTag = document.getElementById(`cabin-discount-${index}`);
        const noticeBox = document.getElementById(`cabin-notice-box-${index}`);
        
        // Control de Disponibilidad e Interfaz del Botón de WhatsApp
        if (cabin.estado && cabin.estado.toLowerCase() === "disponible") {
            statusBadge.className = "status-badge status-disponible";
            whatsappBtn.href = cabin.whatsappLink || "#";
            whatsappBtn.classList.remove("btn-disabled");
            whatsappBtn.innerHTML = "💬 Reservar por WhatsApp";
        } else {
            statusBadge.className = "status-badge status-reservado";
            whatsappBtn.href = "#";
            whatsappBtn.classList.add("btn-disabled");
            whatsappBtn.innerHTML = "❌ No disponible para reserva";
        }
        
        // Renderizado de Descuentos
        if (cabin.descuento && cabin.descuento.trim() !== "" && cabin.descuento !== "0" && cabin.descuento !== "0%") {
            discountTag.textContent = `🔥 ¡Descuento! ${cabin.descuento}`;
            discountTag.style.display = "inline-block";
        }
        
        // Renderizado de Avisos Especiales
        if (cabin.aviso && cabin.aviso.trim() !== "") {
            document.getElementById(`cabin-notice-${index}`).textContent = cabin.aviso;
            noticeBox.style.display = "block";
        }
        
        // Quitar la clase de carga
        setTimeout(() => {
            const cardElement = document.getElementById(`cabin-card-${index}`);
            if (cardElement) {
                cardElement.classList.remove("loading");
                cardElement.classList.add("loaded");
            }
        }, 100 + (index * 200));
    });
}

// Actualizar datos cada 30 segundos para reflejar cambios en Google Sheets
setInterval(loadCabinData, 30000);
