// REEMPLAZA CON TU URL GENERADA EN DEPLOY DE APPS SCRIPT
const urlScript = "https://script.google.com/macros/s/AKfycbxZMWrhdybT5usjWRJ9xQdaBHNaGYAhCQxSq6O1WhE9TD_SUYGwc768JtNVQPUuYH4E-A/exec"; 

const testData = {
    "nombre": "Cabaña 1",
    "estado": "Disponible",
    "precioBase": "$45.000 x día",
    "descuento": "15% +2 días",
    "aviso": "Sin disponibilidad hasta marzo",
    "ultimaActualizacion": "9 de Agosto 2026",
    "whatsappLink": "https://wa.me/5492996100676?text=Hola!%20Estoy%20interesado%20en%20este%20alojamiento%3A%20%20Caba%C3%B1a%201"
};

async function loadCabinData() {
    const cardElement = document.getElementById("cabin-card");
    try {
        const response = await fetch(urlScript, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
        processCabinData(data);
    } catch (error) {
        console.error("Error cargando API, usando backup local:", error);
        processCabinData(testData);
    } finally {
        // Quitamos la pantalla de carga e iniciamos la animación de la tarjeta
        cardElement.classList.add("loaded");
    }
}

function processCabinData(data) {
    // 1. Asignar los textos básicos de las celdas
    document.getElementById("cabin-title").textContent = data.nombre || "Cabaña";
    document.getElementById("cabin-price").textContent = data.precioBase;
    document.getElementById("cabin-update").textContent = data.ultimaActualizacion;

    // 2. Control de Disponibilidad e Interfaz del Botón de WhatsApp
    const statusBadge = document.getElementById("cabin-status");
    const whatsappBtn = document.getElementById("whatsapp-btn");
    
    statusBadge.textContent = data.estado;

    if (data.estado && data.estado.toLowerCase() === "disponible") {
        statusBadge.className = "status-badge status-disponible";
        
        // CORRECCIÓN: Asignamos DIRECTAMENTE el link limpio que ya construyó tu API
        whatsappBtn.href = data.whatsappLink; 
        
        // Removemos la clase de deshabilitado si quedó guardada de un estado anterior
        whatsappBtn.classList.remove("btn-disabled");
        whatsappBtn.innerHTML = "💬 Reservar por WhatsApp";
    } else {
        statusBadge.className = "status-badge status-reservado";
        whatsappBtn.href = "#";
        whatsappBtn.classList.add("btn-disabled");
        whatsappBtn.innerHTML = "❌ No disponible para reserva";
    }

    // 3. Renderizado de Descuentos
    const discountTag = document.getElementById("cabin-discount");
    if (data.descuento && data.descuento.trim() !== "" && data.descuento !== "0" && data.descuento !== "0%") {
        discountTag.textContent = `🔥 ¡Descuento! ${data.descuento}`;
        discountTag.style.display = "inline-block";
    } else {
        discountTag.style.display = "none";
    }

    // 4. Renderizado de Avisos Especiales
    const noticeBox = document.getElementById("cabin-notice-box");
    if (data.aviso && data.aviso.trim() !== "") {
        document.getElementById("cabin-notice").textContent = data.aviso;
        noticeBox.style.display = "block";
    } else {
        noticeBox.style.display = "none";
    }
}


// Inicializar la app al cargar la web
document.addEventListener("DOMContentLoaded", loadCabinData);
