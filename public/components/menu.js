// document.addEventListener("DOMContentLoaded", () => {
//   const observer = new MutationObserver(() => {
//     const btnHome = document.querySelector(".menu .home");
//     const btnAdvertencias = document.querySelector(".menu .warning");

//     if (btnHome && btnAdvertencias) {
//       // Evento: ir a inicio
//       btnHome.addEventListener("click", () => {
//         window.location.href = "./main.html"; 
//       });

//       // Evento: ir a advertencias
//       btnAdvertencias.addEventListener("click", () => {
//         window.location.href = "./warningsChannel.html";
//       });

//       // Dejamos de observar una vez cargado el footer
//       observer.disconnect();
//     }
//   });

//   observer.observe(document.getElementById("global-footer"), {
//     childList: true,
//   });
// });

class MenuComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <div class="menu">
            <button class="home">🏠</button>
            <button class="warning">⚠</button>
          </div>
        `;
    }
}

customElements.define('menu-component', MenuComponent);