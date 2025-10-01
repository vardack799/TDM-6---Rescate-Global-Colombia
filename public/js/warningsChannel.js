document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("selectChannel");

  try {
    //Trae mensajes desde la API
    const res = await fetch("/api/messages");
    const messages = await res.json();

    //Obtiene emergencias únicas (tipo + ubicación)
    const emergencies = [];
    messages.forEach(msg => {
      const key = `${msg.typeEmergency} - ${msg.location}`;
      if (!emergencies.includes(key)) {
        emergencies.push(key);
      }
    });

    //Crea botones de emergencias
    emergencies.forEach(em => {
      const button = document.createElement("button");
      button.type = "button"; 
      button.classList.add("emergency-btn"); 
      button.textContent = em;

      //Acción al hacer clic
      button.addEventListener("click", () => {
        alert(`Seleccionaste: ${em}`);
      });

      form.appendChild(button);
    });

  } catch (err) {
    console.error("Error cargando emergencias:", err);
  }
});