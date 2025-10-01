class MenuComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
          <div class="menu">
            <button class="home"><i class="fa-regular fa-house"></i></button>
            <button class="warning"><i class="fa-solid fa-triangle-exclamation"></i></button>
          </div>
        `;

        
        this.querySelector(".home").addEventListener("click",() => {
             window.location.href = "main.html"
        })
        
        this.querySelector(".warning").addEventListener("click",() => {
             window.location.href = "warningsChannel.html"
        })
    }
}

customElements.define('menu-component', MenuComponent);