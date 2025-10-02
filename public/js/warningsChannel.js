document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("selectChannel");

  // Extraemos la info de localStorage
  const userData = JSON.parse(localStorage.getItem("emergencyData") || "{}");
  const isLoggedIn = userData.loggedIn === true;

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
    if (emergencies.length != 0) {
      emergencies.forEach(em => {
        const button = document.createElement("button");
        button.type = "button"; 
        button.classList.add("emergency-btn"); 
        button.textContent = em;

        //Acción al hacer click en la emergencia
        button.addEventListener("click", () => {
          if (isLoggedIn) {
            //Si está logueado: redirige al chat
            localStorage.setItem("emergencyData", JSON.stringify({
              ...userData,
              emergency: em.split(" - ")[0],
              location: em.split(" - ")[1]
            }));
            window.location.href = "chat.html";
          } else {
            //Si no está logueado: abre el modal 
            openModal(em, messages.filter(m => `${m.typeEmergency} - ${m.location}` === em));
          }
        });

        form.appendChild(button);
      });
    } else {
      const message = document.createElement("div");
        message.classList.add("noItemsMessage"); 
        message.textContent = "¡No hay emergencias!";
        form.appendChild(message);
    }

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
