document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousedown', () => {
    card.style.transform = 'translateY(-5px) scale(0.98)';});
    card.addEventListener('mouseup', () => {
    card.style.transform = 'translateY(-10px) scale(1)';});});

document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mousedown', () => {
    card.style.transform = 'translateY(-5px) scale(0.98)';});
    card.addEventListener('mouseup', () => {
    card.style.transform = 'translateY(-8px) scale(1)';});});

document.querySelectorAll('.combined-card').forEach(card => {
    card.addEventListener('mousedown', () => {
    card.style.transform = 'translateY(-5px) scale(0.98)';});
    card.addEventListener('mouseup', () => {
    card.style.transform = 'translateY(-4px) scale(1)';});});

// Función para alternar condiciones y términos
function toggleTerms() {
    const termsContent = document.getElementById('termsContent');
    const btnTerms = document.querySelector('.btn-terms');
    
    termsContent.classList.toggle('open');
    btnTerms.classList.toggle('active');
}

// Datos para el popout
const popoutData = {
    'web-informativa': {
        title: 'Web Informativa para Profesionales',
        price: '$130.000 ARS',
        period: 'Primer año completo. Luego $40.000 ARS / año',
        payment: 'Transferencia bancaria',
        includes: [
            '✔️ Dominio oficial (.com.ar) registrado a tu nombre.',
            '✔️ Diseño moderno, profesional y personalizado.',
            '✔️ Monitoreamos y mantenemos tu sitio por un año.',
            '✔️ Optimización avanzada para buscadores con IA.',
            '✔️ Te ayudamos a gestionar la renovación de tu dominio.',
            '✔️ Soporte por WhatsApp.',
            '✔️ Certificado SSL de alta seguridad.',
            '✔️ Hosting administrado en Cloudflare.',
            '✔️ Se incluyen modificaciones menores sin cargo durante el primer mes.'
        ],
        examples: [
            { name: '⚖️ Abogado', link: './demo/abo/indexabo.html' },
            { name: '🩺 Salud', link: './demo/den/indexden.html' }
        ]
    },
    'web-editable': {
        title: 'Webs con Funciones Simples Editables',
        price: '$180.000 ARS',
        period: 'Primer año completo. Luego $50.000 ARS / año',
        payment: 'Transferencia bancaria',
        includes: [
            '✔️ Dominio oficial (.com.ar) registrado a tu nombre.',
            '✔️ Diseño moderno, profesional y personalizado.',
            '✔️ Panel de administración editable desde Google Drive.',
            '✔️ Monitoreamos y mantenemos tu sitio por un año.',
            '✔️ Optimización avanzada para buscadores con IA.',
            '✔️ Te ayudamos a gestionar la renovación de tu dominio.',
            '✔️ Soporte por WhatsApp.',
            '✔️ Certificado SSL de alta seguridad.',
            '✔️ Hosting administrado en Cloudflare.',
            '✔️ Se incluyen modificaciones menores sin cargo durante el primer mes.',
            '✔️ Integración con Google Drive para edición de contenido.'
        ],
        examples: [
            { name: '🛖 Cabaña', link: './demo/cab/indexcab.html' },
            { name: '🎨 Landing Page Artística', link: '#' }
        ]
    },
    'web-catalogo': {
        title: 'Webs con Catálogo',
        price: '$220.000 ARS',
        period: 'Primer año completo. Luego $60.000 ARS / año',
        payment: 'Transferencia bancaria',
        includes: [
            '✔️ Dominio oficial (.com.ar) registrado a tu nombre.',
            '✔️ Diseño moderno, profesional y personalizado.',
            '✔️ Catálogo de productos/servicios integrado.',
            '✔️ Sincronización con Google Drive.',
            '✔️ Conexión directa con WhatsApp para pedidos.',
            '✔️ Monitoreamos y mantenemos tu sitio por un año.',
            '✔️ Optimización avanzada para buscadores con IA.',
            '✔️ Te ayudamos a gestionar la renovación de tu dominio.',
            '✔️ Soporte por WhatsApp.',
            '✔️ Certificado SSL de alta seguridad.',
            '✔️ Hosting administrado en Cloudflare.',
            '✔️ Se incluyen modificaciones menores sin cargo durante el primer mes.'
        ],
        examples: [
            { name: '🛠️ Corralón', link: './demo/cor/indexcor.html' },
            { name: '🍽️ Restaurante', link: '#' }
        ]
    },
    'web-catalogo-detallado': {
        title: 'Web con Catálogo Detallado',
        price: '$280.000 ARS',
        period: 'Primer año completo. Luego $80.000 ARS / año',
        payment: 'Transferencia bancaria',
        includes: [
            '✔️ Dominio oficial (.com.ar) registrado a tu nombre.',
            '✔️ Diseño moderno, profesional y personalizado.',
            '✔️ Catálogo avanzado con filtros y búsqueda.',
            '✔️ Fichas de producto con características detalladas.',
            '✔️ Galería de imágenes por producto.',
            '✔️ Sincronización con Google Drive.',
            '✔️ Conexión directa con WhatsApp para consultas.',
            '✔️ Monitoreamos y mantenemos tu sitio por un año.',
            '✔️ Optimización avanzada para buscadores con IA.',
            '✔️ Te ayudamos a gestionar la renovación de tu dominio.',
            '✔️ Soporte por WhatsApp.',
            '✔️ Certificado SSL de alta seguridad.',
            '✔️ Hosting administrado en Cloudflare.',
            '✔️ Se incluyen modificaciones menores sin cargo durante el primer mes.'
        ],
        examples: [
            { name: '🚗 Automotores', link: '#' },
            { name: '🏠 Inmobiliaria', link: '#' }
        ]
    },
    'plataforma-video': {
        title: 'Plataforma de Video Curso',
        price: '$350.000 ARS',
        period: 'Primer año completo. Luego $100.000 ARS / año',
        payment: 'Transferencia bancaria',
        includes: [
            '✔️ Dominio oficial (.com.ar) registrado a tu nombre.',
            '✔️ Diseño moderno, profesional y personalizado.',
            '✔️ Plataforma completa de gestión de cursos.',
            '✔️ Sistema de carga y organización de videos.',
            '✔️ Panel de administración para gestión de contenido.',
            '✔️ Sistema de usuarios y acceso restringido.',
            '✔️ Integración con pasarelas de pago.',
            '✔️ Monitoreamos y mantenemos tu sitio por un año.',
            '✔️ Optimización avanzada para buscadores con IA.',
            '✔️ Te ayudamos a gestionar la renovación de tu dominio.',
            '✔️ Soporte por WhatsApp.',
            '✔️ Certificado SSL de alta seguridad.',
            '✔️ Hosting administrado en Cloudflare.',
            '✔️ Se incluyen modificaciones menores sin cargo durante el primer mes.'
        ],
        examples: [
            { name: '📚 Video Curso', link: '#' },
            { name: '🎓 Plataforma Educativa', link: '#' }
        ]
    }
};

let currentPopoutIndex = 0;
const popoutKeys = Object.keys(popoutData);

// Función para abrir el popout
function openPopout(serviceId) {
    const overlay = document.getElementById('popoutOverlay');
    const body = document.getElementById('popoutBody');
    
    currentPopoutIndex = popoutKeys.indexOf(serviceId);
    updatePopoutContent(serviceId);
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el popout
function closePopout() {
    const overlay = document.getElementById('popoutOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para actualizar el contenido del popout
function updatePopoutContent(serviceId) {
    const data = popoutData[serviceId];
    const body = document.getElementById('popoutBody');
    
    let examplesHTML = '';
    if (data.examples && data.examples.length > 0) {
        examplesHTML = '<h4>Ejemplos disponibles:</h4><ul>';
        data.examples.forEach(example => {
            examplesHTML += `<li><strong>${example.name}</strong> - <a href="${example.link}" target="_blank">Ver demo</a></li>`;
        });
        examplesHTML += '</ul>';
    }
    
    let includesHTML = '<h4>Qué incluye:</h4><ul>';
    data.includes.forEach(item => {
        includesHTML += `<li>${item}</li>`;
    });
    includesHTML += '</ul>';
    
    body.innerHTML = `
        <h3>${data.title}</h3>
        <div class="popout-price">
            <span class="price-amount">${data.price}</span>
        </div>
        <p>${data.period}</p>
        <p><strong>Método de pago:</strong> ${data.payment}</p>
        ${examplesHTML}
        ${includesHTML}
        <button class="btn-buy" style="margin-top: 1.5rem;" onclick="window.open('https://wa.me/5492996100676?text=Hola!', '_blank')">
            Comprar
        </button>
    `;
    
    updateNavigationButtons();
}

// Función para actualizar los botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.popout-nav-btn:first-child');
    const nextBtn = document.querySelector('.popout-nav-btn:last-child');
    
    prevBtn.disabled = currentPopoutIndex === 0;
    nextBtn.disabled = currentPopoutIndex === popoutKeys.length - 1;
}

// Función para navegar entre tarjetas en el popout
function navigatePopout(direction) {
    if (direction === 'prev' && currentPopoutIndex > 0) {
        currentPopoutIndex--;
    } else if (direction === 'next' && currentPopoutIndex < popoutKeys.length - 1) {
        currentPopoutIndex++;
    }
    
    updatePopoutContent(popoutKeys[currentPopoutIndex]);
}

// Cerrar popout con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopout();
    }
});

// Detección de sección activa en el menú
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {let current = '';
const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        // Retraso escalonado para evitar que todas las tarjetas se activen al mismo tiempo
                        const delay = Array.from(elementosARevelar).indexOf(entrada.target) * 100;
                        setTimeout(() => {
                            entrada.target.classList.add('active');
                        }, delay);
                        miObservador.unobserve(entrada.target);}});}, 
                        { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
            elementosARevelar.forEach(el => observador.observe(el));

// Activar sección inicial al cargar
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a');
            const scrollPosition = window.scrollY + 100;

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;}});

            navLinks.forEach(link => {link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');}});});        