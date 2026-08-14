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


const catalogoIframe =
    document.getElementById(
        "catalogoIframe"
    );


window.addEventListener(
    "message",
    event => {

        if (
            !catalogoIframe ||
            event.source !==
                catalogoIframe.contentWindow
        ) {

            return;

        }


        if (
            !event.data ||
            event.data.tipo !==
                "catalogo-altura"
        ) {

            return;

        }


        const altura =
            Number(
                event.data.altura
            );


        if (
            !Number.isFinite(
                altura
            )
        ) {

            return;

        }


        catalogoIframe.style.height =
            `${altura}px`;

    }
);