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

let currentPopoutCard = null;
const allCards = document.querySelectorAll('.combined-card');

// Función para abrir el popout
function openPopout(button) {
    const card = button.closest('.combined-card');
    currentPopoutCard = card;
    
    const overlay = document.getElementById('popoutOverlay');
    updatePopoutContent(card);
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el popout
function closePopout() {
    const overlay = document.getElementById('popoutOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    currentPopoutCard = null;
}

// Función para actualizar el contenido del popout desde la tarjeta
function updatePopoutContent(card) {
    const body = document.getElementById('popoutBody');
    
    // Extraer datos de los atributos data-
    const title = card.dataset.title;
    const description = card.dataset.description;
    const price = card.dataset.price;
    const currency = card.dataset.currency;
    const period = card.dataset.period;
    const payment = card.dataset.payment;
    const includes = JSON.parse(card.dataset.includes);
    
    // Extraer ejemplos de las imágenes
    const demoLinks = card.querySelectorAll('.demo-link');
    let examplesHTML = '';
    if (demoLinks.length > 0) {
        examplesHTML = '<div class="popout-examples"><h4>Ejemplos disponibles:</h4><div class="popout-examples-grid">';
        demoLinks.forEach(link => {
            const img = link.querySelector('img');
            const h4 = link.querySelector('h4');
            const a = link.querySelector('a');
            
            examplesHTML += `
                <div class="popout-example-item">
                    <img src="${img.src}" alt="${img.alt}">
                    <div>
                        <strong>${h4.textContent}</strong>
                        <a href="${a.href}" target="_blank">Ver demo</a>
                    </div>
                </div>
            `;
        });
        examplesHTML += '</div></div>';
    }
    
    let includesHTML = '<h4>Qué incluye:</h4><ul>';
    includes.forEach(item => {
        includesHTML += `<li>✔️ ${item}</li>`;
    });
    includesHTML += '</ul>';
    
    body.innerHTML = `
        <h3>${title}</h3>
        <p class="popout-description">${description}</p>
        <div class="popout-price">
            <span class="price-amount">${price}</span>
            <span class="pricing-currency">${currency}</span>
        </div>
        <p>${period}</p>
        <p><strong>Método de pago:</strong> ${payment}</p>
        ${examplesHTML}
        ${includesHTML}
        <button class="btn-buy" onclick="window.open('https://wa.me/5492996100676?text=Hola!', '_blank')">
            Comprar
        </button>
    `;
    
    updateNavigationButtons();
}

// Función para actualizar los botones de navegación
function updateNavigationButtons() {
    const currentIndex = Array.from(allCards).indexOf(currentPopoutCard);
    const prevBtn = document.querySelector('.popout-nav-prev');
    const nextBtn = document.querySelector('.popout-nav-next');
    
    if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = currentIndex === allCards.length - 1 ? 'none' : 'flex';
}

// Función para navegar entre tarjetas en el popout
function navigatePopout(direction) {
    const currentIndex = Array.from(allCards).indexOf(currentPopoutCard);
    
    if (direction === 'prev' && currentIndex > 0) {
        currentPopoutCard = allCards[currentIndex - 1];
    } else if (direction === 'next' && currentIndex < allCards.length - 1) {
        currentPopoutCard = allCards[currentIndex + 1];
    }
    
    if (currentPopoutCard) {
        updatePopoutContent(currentPopoutCard);
    }
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