//menu toggle para el sidebar
// function toggleSidebar() {
//     const sidebar = document.querySelector('.sidebar');
//     const overlay = document.querySelector('.overlay');

//     sidebar.classList.toggle('active');
//     overlay.classList.toggle('active');
// }

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Header -->
            <header class="header">
                <h1>Rescate Global Colombia</h1>
                <button class="menu-btn" onclick="toggleSidebar()"></button>
            </header>

            <!-- Overlay -->
            <div class="overlay" onclick="toggleSidebar()"></div>

            <!-- Sidebar -->
            <nav class="sidebar">
                <a href="#" class="sidebar-item">Inicio</a>
                <a href="#" class="sidebar-item">Emergencias</a>
                <a href="#" class="sidebar-item">Recursos</a>
                <a href="#" class="sidebar-item">Contacto</a>
                <a href="#" class="sidebar-item">Sobre Nosotros</a>
            </nav>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
