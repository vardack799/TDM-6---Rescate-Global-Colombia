document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        //Sanitización de datos
        const nombre = document.getElementById("nombre").value.trim();
        const contraseña = document.getElementById("contraseña").value.trim();

        const validName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!nombre && !contraseña) {
            alert("Por favor digite los campos vacíos");
            return
        } else  if (!nombre || !validName.test(nombre)) {
            alert("Ingrese un nombre valido...");
            return
        }else if (!contraseña) {
            alert("Ingrese una contraseña...");
            return
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

            //Se Guarda la sesión y se guarda el logueo
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
