class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Header -->
            <header class="header">
                <h1>Rescate Global Colombia</h1>
                <div id = "volunteer">
            </header>

            
        `;
    }
}

customElements.define('header-component', HeaderComponent);
