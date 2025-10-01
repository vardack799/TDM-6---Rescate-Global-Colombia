document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("selectChannel");

  try {
    // Trae mensajes desde la API
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

    //Crea botones de las emergencias
    emergencies.forEach(em => {
      const button = document.createElement("button");
      button.type = "button"; 
      button.classList.add("emergency-btn"); 
      button.textContent = em;

      //Acción al hacer click en la emergencia
      button.addEventListener("click", () => {
        openModal(em, messages.filter(m => `${m.typeEmergency} - ${m.location}` === em));
      });

      form.appendChild(button);
    });

    //Modal
    function openModal(emergencyTitle, filteredMessages) {

      //Crea overlay
      const modalOverlay = document.createElement("div");
      modalOverlay.classList.add("modal-overlay");

      //Crea modal
      const modal = document.createElement("div");
      modal.classList.add("modal");

      modal.innerHTML = `
        <div class="modal-header">
          <h2>${emergencyTitle}</h2>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
          ${filteredMessages.map(m => `
            <div class="message-card">
              <p><strong>${m.user}</strong> (${m.time})</p>
              <p>${m.text}</p>
            </div>
          `).join("")}
        </div>
      `;

      modalOverlay.appendChild(modal);
      document.body.appendChild(modalOverlay);

      //Cierra el modal
      modal.querySelector(".modal-close").addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
      });

      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          document.body.removeChild(modalOverlay);
        }
      });
    }

  } catch (err) {
    console.error("Error cargando emergencias:", err);
  }
});