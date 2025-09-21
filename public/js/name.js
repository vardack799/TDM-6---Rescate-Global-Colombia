function continuar() {
    const nombre = document.getElementById('nombre').value;
    if (nombre.trim() === "") {
        alert("Por favor ingrese su nombre.");
    } else {
        alert("Bienvenido " + nombre + "!");
    }
}

// Mapa de emergencias
const emergencyNames = {
    'flood': 'Inundación',
    'earthquake': 'Terremoto',
    'fire': 'Incendio',
    'other': 'Otra emergencia'
};

// Leer parámetros de la URL
const params = new URLSearchParams(window.location.search);
const emergencyType = params.get('emergency');

// Mostrar el nombre
if (emergencyType && emergencyNames[emergencyType]) {
    document.getElementById('emergencyTitle').textContent =
        `Has seleccionado: ${emergencyNames[emergencyType]}`;
} else {
    document.getElementById('emergencyTitle').textContent = "No se seleccionó emergencia";
}