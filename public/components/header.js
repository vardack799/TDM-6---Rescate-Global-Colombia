class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div id = "volunteer"><i class="far fa-user-circle"></i><span>Ingresar</span></div>
                <h1 id = "headerTitle">Rescate Global Colombia</h1>
                <div id = "logOut" style="display: none;"><i class="fa-solid fa-right-from-bracket"></i></div>
            </header>    
        `;

        //Verifica si el voluntario está logueado
        this.checkLoginStatus();

        this.querySelector("#headerTitle").addEventListener("click",() => {
            //Verifica si el usuario está logueado
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
            
            // Si no está logueado va a main.html
            window.location.href = "main.html"
        }) 
        this.querySelector("#volunteer").addEventListener("click",() => {
             window.location.href = "loginVolunteer.html"
        }) 
        this.querySelector("#logOut").addEventListener("click",() => {
            localStorage.removeItem("emergencyData")
            window.location.href = "loginVolunteer.html"
        }) 
    }

    checkLoginStatus() {
        const emergencyData = localStorage.getItem("emergencyData");
        const logOutIcon = this.querySelector("#logOut");
        const volunteerIcon = this.querySelector("#volunteer");
        
        if (emergencyData) {
            try {
                const data = JSON.parse(emergencyData);
                // Si está logueado muestra el icono log out y oculta el icono de login del voluntario
                if (data.loggedIn) {
                    logOutIcon.style.display = "block";
                    volunteerIcon.style.display = "none";
                }
            } catch (error) {
                console.error("Error al parsear emergencyData:", error);
            }
        }
    }
}

customElements.define('header-component', HeaderComponent)