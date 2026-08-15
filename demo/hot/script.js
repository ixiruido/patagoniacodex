document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousedown', () => {
        card.style.transform = 'translateY(-5px) scale(0.98)';});
    card.addEventListener('mouseup', () => {
        card.style.transform = 'translateY(-10px) scale(1)';});});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function updateSlider() {
        const translateX = -(currentSlide * 100);
        sliderWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-play (optional)
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Cargar alojamientos desde Google Sheets
    loadAccommodations();
});

// Cargar alojamientos manteniendo tu API existente
async function loadAccommodations() {
    const grid = document.getElementById('accommodations-grid');
    if (!grid) return;
    
    // URL actualizada de tu Google Apps Script
    const urlScript = "https://script.google.com/macros/s/AKfycbwSODsQoRFw3x2jYwDW3A3RdgvyxwbAvUU3jJtNlOpap7hiojNpHFX9hC4Pltpg1m_PMA/exec";
    
    try {
        // Agregar timestamp para evitar cache
        const urlWithTimestamp = `${urlScript}?t=${new Date().getTime()}`;
        
        const response = await fetch(urlWithTimestamp);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
        
        // Eliminar loader si existe
        const loader = grid.querySelector('.card-loader-container');
        if (loader) loader.remove();
        
        // Limpiar el grid antes de agregar nuevas cards (evitar duplicados)
        const existingCards = grid.querySelectorAll('.accommodation-card');
        existingCards.forEach(card => card.remove());
        
        // Si data es un array, procesar múltiples alojamientos
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(accommodation => {
                const card = createAccommodationCard(accommodation);
                grid.appendChild(card);
            });
        } 
        // Si data es un objeto (formato actual), crear una sola card
        else if (data && typeof data === 'object') {
            const card = createAccommodationCard(data);
            grid.appendChild(card);
        } else {
            grid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No hay alojamientos disponibles en este momento.</p>';
        }
    } catch (error) {
        console.error("Error cargando alojamientos:", error);
        
        // Eliminar loader y mostrar error
        const loader = grid.querySelector('.card-loader-container');
        if (loader) loader.remove();
        
        // Solo mostrar error si no hay cards existentes
        const existingCards = grid.querySelectorAll('.accommodation-card');
        if (existingCards.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Error al cargar los alojamientos. Por favor, intenta más tarde.</p>';
        }
    }
}

function createAccommodationCard(data) {
    console.log("Creando card con datos:", data); // Depuración
    
    const card = document.createElement('div');
    card.className = 'accommodation-card';
    
    // Mapeo según la estructura exacta del JSON
    const nombre = data.nombre || "Alojamiento";
    const precio = data.precioBase || "Consultar";
    const estado = data.estado || "-";
    const descuento = data.descuento || "";
    const aviso = data.aviso || "";
    const whatsappLink = data.whatsappLink || "#";
    const ultimaActualizacion = data.ultimaActualizacion || "-";
    
    console.log("Datos mapeados:", { nombre, precio, estado, descuento, aviso, whatsappLink, ultimaActualizacion }); // Depuración
    
    // Determinar clase de estado (case-insensitive)
    const estadoLower = estado.toLowerCase();
    const statusClass = estadoLower.includes("disponible") ? "status-disponible" : "status-reservado";
    
    // Determinar si el botón está habilitado (case-insensitive)
    const isAvailable = estadoLower.includes("disponible");
    const btnClass = isAvailable ? "btn-whatsapp" : "btn-whatsapp btn-disabled";
    const btnText = isAvailable ? "💬 Reservar por WhatsApp" : "❌ No disponible para reserva";
    const btnHref = isAvailable ? whatsappLink : "#";
    
    // Renderizar descuento si existe
    const discountHTML = (descuento && descuento.trim() !== "" && descuento !== "0" && descuento !== "0%") 
        ? `<span class="discount-tag">🔥 ¡Descuento! ${descuento}</span>` 
        : '';
    
    // Renderizar aviso si existe
    const noticeHTML = (aviso && aviso.trim() !== "") 
        ? `<div class="notice-box"><strong>⚠️ Aviso:</strong> ${aviso}</div>` 
        : '';
    
    card.innerHTML = `
        <div class="card-header">
            <h3>${nombre}</h3>
            <span class="status-badge ${statusClass}">${estado}</span>
        </div>
        
        <div class="price-section">
            <p class="price-label">Precio por día</p>
            <p class="price-value">${precio}</p>
            ${discountHTML}
        </div>
        
        ${noticeHTML}
        
        <a href="${btnHref}" class="${btnClass}" target="_blank" ${!isAvailable ? 'onclick="return false;"' : ''}>
            ${btnText}
        </a>
        
        <p class="update-text">Actualizado: ${ultimaActualizacion}</p>
    `;
    
    console.log("Card HTML generado:", card.innerHTML); // Depuración
    
    return card;
}

// Actualizar datos cada 30 segundos para reflejar cambios en Google Sheets
setInterval(loadAccommodations, 30000);

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
                    link.classList.add('active');}});});
