class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div id = "volunteer"><i class="far fa-user-circle"></i></div>
                <h1 id = "headerTitle">Rescate Global Colombia</h1>
                <div id = "logOut"><i class="fa-solid fa-right-from-bracket"></i></div>
            </header>    
        `;

        this.querySelector("#headerTitle").addEventListener("click",() => {
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
}

customElements.define('header-component', HeaderComponent)

