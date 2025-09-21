let selectedCategory = null;

function selectCategory(cat) {
  selectedCategory = cat;
  document.getElementById("category").value = cat;
  alert("Categoría seleccionada: " + cat);
}

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