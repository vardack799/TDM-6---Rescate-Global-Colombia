// web/chatSocket.js
import { addMessage, addSystemMessage, loadMessages } from "../ui/chatUI.js";

let socket;

export function connect(user) {
    let wsUrl = location.hostname === "localhost" ? "ws://localhost:3000" : `wss://${location.host}`;

    socket = new WebSocket(wsUrl);

    socket.addEventListener("open", () => {
        socket.send(JSON.stringify({
            type: "formUser",
            user
        }));
    });

    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case "chat":
                // --- CÁLCULO ROBUSTO DE isSelf ---
                // Queremos considerar que el mensaje puede venir como:
                // "Nombre"  o  "Nombre Voluntario"
                function escapeRegExp(str) {
                    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                }
                const baseName = user?.name || "";
                const nameRegex = new RegExp("^" + escapeRegExp(baseName) + "(\\sVoluntario)?$");
                const isSelf = nameRegex.test(data.user);
                // ----------------------------------
                
                addMessage(data.user, data.text, data.time, isSelf);
                break;

            case "system":
                addSystemMessage(data.text);
                break;

            case "msgD":
                loadMessages(user.name, JSON.stringify(data.emergency), JSON.stringify(data.location));
                console.log("usuarios" + JSON.stringify(data.user));
                break;

            default:
                throw new Error("Tipo de mensaje desconocido: " + data.type);
        }
    });
}

export function sendMessage(userName, location, typeEmergency, text) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({
        type: "chat",
        user: userName,
        location: location,
        typeEmergency: typeEmergency,
        text
    }));
}
