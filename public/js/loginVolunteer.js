// js/loginVolunteer.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        if (!nombre || !contraseña) {
            alert("Debe ingresar nombre y contraseña");
            return;
        }

        try {
            const res = await fetch("/api/users");
            const users = await res.json();

            const user = users.find(
                u => u.name === nombre && u.password === contraseña
            );

            if (!user) {
                alert("Usuario o contraseña incorrectos");
                return;
            }

            // Guardamos la sesión y marcamos logueo
            localStorage.setItem("emergencyData", JSON.stringify({
                id: user.id,
                name: user.name,
                location: "General",
                emergency: "Chat",
                loggedIn: true
            }));

            window.location.href = "warningsChannel.html";
        } catch (err) {
            console.error("Error al validar usuario:", err);
            alert("Error de conexión con el servidor");
        }
    });
});
