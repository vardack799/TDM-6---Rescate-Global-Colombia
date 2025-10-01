class MenuComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <div class="menu">
            <button class="home"><i class="fa-regular fa-house"></i></button>
            <button class="warning"><i class="fa-solid fa-triangle-exclamation"></i></button>
          </div>
        `;

        
        this.querySelector(".home").addEventListener("click",() => {
            //Verifica si el voluntario está logueado
            const emergencyData = localStorage.getItem("emergencyData");
            
            if (emergencyData) {
                try {
                    const data = JSON.parse(emergencyData);
                    if (data.loggedIn) {
                        //Si está logueado va a warningsChannel.html
                        window.location.href = "warningsChannel.html";
                        return;
                    }
                } catch (error) {
                    console.error("Error al parsear emergencyData:", error);
                }
            }
            
            //Si no está logueado va a main.html
            window.location.href = "main.html";
        })
        
        this.querySelector(".warning").addEventListener("click",() => {
             window.location.href = "warningsChannel.html"
        })
    }
}

customElements.define('menu-component', MenuComponent);