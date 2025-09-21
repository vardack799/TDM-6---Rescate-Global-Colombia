

function selectEmergency(type) {
    const emergencyNames = {
        'flood': 'Inundacion',
        'earthquake': 'Terremoto',
        'fire': 'Incendio',
        'other': 'Otra emergencia'


    };
    alert(`Has seleccionado: ${emergencyNames[type]}`);
    // Redirige a nombre.html con el nombre de la emergencia como parámetro
    window.location.href = `name.html?emergency=${type}`;
}

// Event listener para las tarjetas de emergencia
document.querySelectorAll('.emergency-card').forEach(card => {
    card.addEventListener('click', () => {
        const type = card.classList.contains('flood') ? 'flood' :
            card.classList.contains('earthquake') ? 'earthquake' :
                card.classList.contains('fire') ? 'fire' : 'other';
        selectEmergency(type);
    }

    );
});

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