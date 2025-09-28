import { addMessage, addSystemMessage, loadMessages} from "../ui/chatUI.js";

let socket; 

export function connect(user) {  
    let wsUrl = location.hostname === "localhost" ? "ws://localhost:3000" : `wss://${location.host}`;

    socket = new WebSocket(wsUrl);

    // socket.addEventListener("open", () => {
    //     socket.send(JSON.stringify({
    //         type: "login",
    //         user
    //     }));
    // });

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
                //Muestra msg => modificar envío de datos y aplicar filtro.
                addMessage(data.user, data.text, data.time, data.user === user.name);
                
                break;
            case "system":
                addSystemMessage(data.text);
                break;
            case "msgD":
                 loadMessages(JSON.stringify(data.msgsD), user.name)
                 break;
            default:
                throw new Error("Tipo de mensaje desconocido: " + data.type);
        }
    });
}

//Envío de mensajes tipo chat al servidor
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
