function selectEmergency(type) {
    const emergencyNames = {
        'flood': 'Inundacion',
        'earthquake': 'Terremoto',
        'fire': 'Incendio',
        'other': 'Otra emergencia'
    };

    alert(`Has seleccionado: ${emergencyNames[type]}`);
    // Redirige a nombre.html con el nombre de la emergencia como parámetro
    if (type != "other") {
        window.location.href = `name.html?emergency=${emergencyNames[type]}`;
    }else {
        window.location.href = `otherEmergency.html`
    }
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
