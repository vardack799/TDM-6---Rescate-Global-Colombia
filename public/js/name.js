// Base de datos de ubicaciones de Colombia
// const LOCATIONS_DATABASE = [
//     "Bogotá, Cundinamarca",
//     "Medellín, Antioquia", 
//     "Cali, Valle del Cauca",
//     "Barranquilla, Atlántico",
//     "Cartagena, Bolívar",
//     "Bucaramanga, Santander",
//     "Pereira, Risaralda",
//     "Manizales, Caldas",
//     "Armenia, Quindío",
//     "Ibagué, Tolima",
//     "Villavicencio, Meta",
//     "Tunja, Boyacá",
//     "Neiva, Huila",
//     "Santa Marta, Magdalena",
//     "Montería, Córdoba",
//     "Sincelejo, Sucre",
//     "Popayán, Cauca",
//     "Pasto, Nariño",
//     "Valledupar, Cesar",
//     "Riohacha, La Guajira",
//     "Florencia, Caquetá",
//     "Yopal, Casanare",
//     "Mocoa, Putumayo",
//     "San Andrés, San Andrés y Providencia",
//     "Leticia, Amazonas"
// ];

const LOCATIONS_DATABASE = [
    "Los Muiscas, Tunja, Boyacá",
    "La Maria, Tunja, Boyacá",
    "Villa del Prado, Tunja, Boyacá",
    "El Bosque, Tunja, Boyacá",
    "La Candelaria, Tunja, Boyacá",
    "El Centro, Tunja, Boyacá",
];

// Mapa de emergencias
const emergencyNames = {
    'flood': 'Inundación',
    'earthquake': 'Terremoto',
    'fire': 'Incendio',
    'other': 'Otra emergencia'
};

// Función para generar ubicación aleatoria
function generateRandomLocation() {
    const randomIndex = Math.floor(Math.random() * LOCATIONS_DATABASE.length);
    return LOCATIONS_DATABASE[randomIndex];
}

// Leer parámetros de la URL
const params = new URLSearchParams(window.location.search);
const emergencyType = params.get('emergency');

// Mostrar el nombre (si tienes el elemento emergencyTitle)
if (emergencyType && emergencyNames[emergencyType]) {
    const titleElement = document.getElementById('emergencyTitle');
    if (titleElement) {
        titleElement.textContent = `Has seleccionado: ${emergencyNames[emergencyType]}`;
    }
} else {
    const titleElement = document.getElementById('emergencyTitle');
    if (titleElement) {
        titleElement.textContent = "No se seleccionó emergencia";
    }
}

// Función continuar adaptada
function continuar() {
    const nombre = document.getElementById('nombre').value;
    
    if (nombre.trim() === "") {
        alert("Por favor ingrese su nombre.");
        return;
    }
    
    // Generar ubicación aleatoria automáticamente
    const ubicacionAleatoria = generateRandomLocation();
    
    // Crear los parámetros para el chat
    const chatParams = new URLSearchParams({
        emergency: emergencyType,
        name: nombre.trim(),
        location: ubicacionAleatoria
    });
    
    // Opcional: mostrar mensaje de bienvenida con ubicación
    alert(`Bienvenido ${nombre}! Conectando desde ${ubicacionAleatoria}`);
    
    // Redirigir directamente al chat con todos los parámetros
    window.location.href = `chat.html?${chatParams.toString()}`;
}

// Permitir envío con Enter
document.getElementById('nombre').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        continuar();
    }
});