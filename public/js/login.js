let selectedCategory = null;

// Escuchar clic en cada botón de categoría
document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.cat;
    document.getElementById("category").value = selectedCategory;

    // Visual feedback
    document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    console.log("Categoría seleccionada:", selectedCategory);
  });
});

// Manejo del formulario de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!selectedCategory) {
    alert("Debes seleccionar una categoría antes de continuar");
    return;
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      category: selectedCategory,
      location: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    };

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "chat.html";
      })
      .catch((err) => console.error("Error en registro:", err));
  });
});