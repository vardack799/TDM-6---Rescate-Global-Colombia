function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function selectEmergency(type) {
    const emergencyNames = {
        'flood': 'Inundación',
        'earthquake': 'Terremoto',
        'fire': 'Incendio',
        'other': 'Otra emergencia'
    };

    alert(`Has seleccionado: ${emergencyNames[type]}`);
    // Aquí puedes agregar la lógica para manejar la selección de emergencia
}

// Close sidebar when clicking on a sidebar item
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        toggleSidebar();
    });
});

// Handle responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    }
});