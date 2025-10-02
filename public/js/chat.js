import { connect, sendMessage } from "./web/chatSocket.js";

const dataStorage = localStorage.getItem("emergencyData"); //Toma los datos del localStorage
const user = JSON.parse(dataStorage)
 
// Sidebar y controles
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput"); 

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

