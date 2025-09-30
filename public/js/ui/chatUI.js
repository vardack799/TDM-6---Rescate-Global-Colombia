const messagesDiv = document.getElementById("messages"); 
import { getMessages } from "../services/api.js";

const messages = await getMessages()
console.log(JSON.stringify(messages, null, 2) + "Mensajes de backend a front por API")

// Set para rastrear IDs de mensajes ya cargados
const loadedMessageIds = new Set()

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
    if (isSelf) msgEl.classList.add("self");
    msgEl.innerHTML = `<strong>${user}: </strong><br>${text}
    <br> <small>${time}</small>`;
    messagesDiv.appendChild(msgEl);
    messagesDiv.scrollIntoView({behavior: "smooth", block: "end"})
}

export function loadMessages(name, emergency, location){
    let msgArray = []

    messages.forEach(m => {
        if (JSON.stringify(m.location) === location && JSON.stringify(m.typeEmergency) === emergency) {
            msgArray.push(m)
        }
    });

    if (msgArray.length != 0) {
        msgArray.forEach(mA => {
            // Crear un identificador único para el mensaje
            const messageId = `${mA.user}-${mA.time}-${mA.text}`
            
            // Solo cargar si no ha sido cargado antes
            if (!loadedMessageIds.has(messageId)) {
                const msgEl = document.createElement("div");
                msgEl.classList.add("message");
                
                if (name === mA.user) msgEl.classList.add("self");
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

// export function updateUserList(users) {
//     userList.innerHTML = "";
//     users.forEach(u => {
//         const li = document.createElement("li");
//         li.classList.add("user-item");

//         li.innerHTML = `
//             <div class="user-avatar">
//                 <img src="${u.img}" alt="${u.name}" class="avatar-img">
//                 <span class="status ${u.connected ? "online" : "offline"}"></span>
//             </div>
//             <div class="user-info">
//                 <span class="user-name">${u.name}</span>
//                 <small class="user-role">${u.rol}</small>
//             </div>
//         `;

//         userList.appendChild(li);
//     });
// }

// export function showUserList(list, show) {
//     if (show) {
//         list.classList.add("active");
//     } else {
//         list.classList.remove("active");
//     }
// }

// export function clearUser() {
//     localStorage.removeItem("username");
// }

// export function redirectToLogin() {
//     window.location.href = "/login.html";
// }
