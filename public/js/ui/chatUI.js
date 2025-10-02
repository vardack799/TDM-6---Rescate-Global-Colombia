const messagesDiv = document.getElementById("messages"); 
import { getMessages } from "../services/api.js";

const messages = await getMessages()
console.log(JSON.stringify(messages, null, 2) + "Mensajes de backend a front por API")

//Set para rastrear IDs de mensajes ya cargados
const loadedMessageIds = new Set();

//Extrae la data del usuario del localStorage
const dataStorage = localStorage.getItem("emergencyData")
const userD = JSON.parse(dataStorage)
let chatTitle = document.getElementById("chatTitle")
let chatBoxTitle = document.getElementById("chatBox-title")

//Sustituye el contenido del título de la página y del título del tema en chat.
chatTitle.innerText = userD.emergency + " en " + userD.location
chatBoxTitle.innerText = userD.emergency + " en " + userD.location

function fixChatHeight() {
    document.querySelector(".chat-container").style.height = window.innerHeight + "px";
}
window.addEventListener("resize", fixChatHeight);
fixChatHeight(); 

//Envío de msg
export function addMessage(user, text, time, isSelf = false) {
    const msgEl = document.createElement("div");
    msgEl.classList.add("message");

    if (isSelf) { 
        msgEl.classList.add("self");

        //Extrae datos del usuario logueado
        const userData = JSON.parse(localStorage.getItem("emergencyData") || "{}");
        if (userData.loggedIn && user.includes(userData.name)) {
            msgEl.classList.add("logged-self"); //Borde rojo
        }
    }

    msgEl.innerHTML = `<strong>${user}: </strong><br>${text}
    <br> <small>${time}</small>`;
    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollIntoView({behavior: "smooth", block: "end"})
}


export function loadMessages(name, emergency, location){
    let msgArray = []

    // Extrae la data del usuario del localStorage
    const userData = JSON.parse(localStorage.getItem("emergencyData") || "{}");

    messages.forEach((m, index) => {
        if (JSON.stringify(m.location) === location && JSON.stringify(m.typeEmergency) === emergency) {
            // Agregar el índice original del array como identificador único
            msgArray.push({...m, originalIndex: index})
        }
    });

    if (msgArray.length != 0) {
        msgArray.forEach(mA => {
            // Se usa el índice original del array de messages como ID único
            const messageId = mA.originalIndex;
            
            // Solo cargar si no ha sido cargado antes
            if (!loadedMessageIds.has(messageId)) {
                const msgEl = document.createElement("div");
                msgEl.classList.add("message"); 
                
                if (name === mA.user || mA.user === `${name} Voluntario`) {
                    // Si el mensaje pertenece al usuario actual, se marca como "self"
                    msgEl.classList.add("self");

                    // Si además el usuario está logueado como voluntario, se marca con borde rojo
                    if (userData.loggedIn) {
                        msgEl.classList.add("logged-self");
                    }
                }

                msgEl.innerHTML = `<strong>${mA.user}: </strong><br>${mA.text}
                <br> <small>${mA.time}</small>`;
                messagesDiv.appendChild(msgEl);
                messagesDiv.scrollIntoView({behavior: "smooth", block: "end"});
                
                // Marcar como cargado
                loadedMessageIds.add(messageId);
            }
        });
    }
}



export function addSystemMessage(text) {
    const msgEl = document.createElement("div");
    msgEl.classList.add("message", "system");
    msgEl.innerHTML = `<em>⚙️ ${text}</em>`;
    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
