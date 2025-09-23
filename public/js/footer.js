document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const btnHome = document.querySelector(".menuFooter .home");
    const btnAdvertencias = document.querySelector(".menuFooter .advertencias");

    if (btnHome && btnAdvertencias) {
      // Evento: ir a inicio
      btnHome.addEventListener("click", () => {
        window.location.href = "./main.html"; 
      });

      // Evento: ir a advertencias
      btnAdvertencias.addEventListener("click", () => {
        window.location.href = "/advertencias.html";
      });

      // Dejamos de observar una vez cargado el footer
      observer.disconnect();
    }
  });

  observer.observe(document.getElementById("global-footer"), {
    childList: true,
  });
});
