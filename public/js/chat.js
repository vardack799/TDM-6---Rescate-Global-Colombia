import { connect, sendMessage } from "./web/chatSocket.js";
// import { showUserList, clearUser, redirectToLogin } from "./ui/chatUI.js";
 
// // Verificar usuario
const dataStorage = localStorage.getItem("emergencyData"); //Toma los datos del localStorage
const user = JSON.parse(dataStorage)
// // if (!user) redirectToLogin();

// console.log(localStorage.getItem("emergencyData"))
// console.log(user.name) 

// document.getElementById("chat-username").textContent = "Bienvenido " + user.name;
 
// Sidebar y controles
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput"); 
// const logoutBtn = document.getElementById("logoutBtn"); 
// const sidebar = document.getElementById("userSidebar");
// const toggleBtn = document.getElementById("usersToggle");
// const closeBtn = document.getElementById("closeSidebar");

// Conectar al WebSocket
connect(user); 

// Eventos
chatForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (text) {
        
        //Si esta logueado le agraga "Voluntario" al nombre
        let displayName = user.name;
        if (user.loggedIn) {
            displayName = `${user.name} Voluntario`;
        }

        sendMessage(displayName, user.location, user.emergency, text);
        messageInput.value = "";
    }
});


// logoutBtn.addEventListener("click", function() {
//     clearUser();
//     redirectToLogin();
// });

// toggleBtn.addEventListener("click", () => {
//     showUserList(sidebar, true);
// });

// closeBtn.addEventListener("click", () => {
//     showUserList(sidebar, false);
// });
