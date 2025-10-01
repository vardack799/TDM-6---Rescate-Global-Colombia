const broadcast = require("../utils/broadcast");
const { getUsers } = require("../models/users");
const { saveMessages, getMessages} = require("../models/msg"); 

let users = [];

function setupChat(wss) {  
    wss.on("connection", (ws, req) => { 
        let currentUser = null;
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

        ws.on("message", (msg) => { 
            const data = JSON.parse(msg);

            if (data.type === "formUser") {
                currentUser = { id: data.user.id, name: data.user.name, location: data.user.location, typeEmergency: data.user.emergency, ws};
                users.push(currentUser);

                console.log(`${new Date().toISOString()} - 🟢 Usuario conectado (${currentUser.name} | IP: ${ip} | Lugar: ${currentUser.location} | Emergencia: ${currentUser.typeEmergency})`);

                broadcast(users, { type: "system", typeEmergency: data.user.emergency, location: data.user.location, text: `¡Bienvenido ${currentUser.name}! :D` });
                
                // const allmsgs = getMessages()

                //Broadcats para enviar datos y filtrar mensajes mostrados
                broadcast(users, {
                    type: "msgD", 
                    user: data.user.name,
                    emergency: data.user.emergency,
                    location: data.user.location
                })

                // const allUsers = getUsers();
                // broadcast(users, {
                //     type: "users",
                //     users: allUsers.map(u => ({
                //         id: u.id,
                //         name: u.name,
                //         rol: u.rol,
                //         location: u.location,
                //         img: u.img,
                //         connected: users.some(c => c.id === u.id)
                //     }))
                // });
            }

            // if (data.type === "formUser"){
            //     currentUser = {name: data.user.name, ws}
            //     users.push(currentUser)
            //     console.log(`${new Date().toISOString()} - 🟢 Cliente conectado (${currentUser.name} | ${ip})`);
            //     broadcast(users, { type: "system", text: `${currentUser.name} se unió` });
            // }


 
            if (data.type === "chat") {
                
                broadcast(users, { type: "chat", user: data.user, location: data.location, typeEmergency: data.typeEmergency,
                    time: new Date().toLocaleTimeString("es-ES", {hour: "2-digit", minute: "2-digit"}), text: data.text});

                const msg = {
                    user: data.user, 
                    location: data.location, 
                    typeEmergency: data.typeEmergency,
                    time: new Date().toLocaleTimeString("es-ES", {hour: "2-digit", minute: "2-digit"}), text: data.text
                }

                saveMessages(msg)
            }
        });

        ws.on("close", () => {
            if (currentUser) {
                console.log(`${new Date().toISOString()} - 🔴 Usuario desconectado (${currentUser.name} | ${ip}, lugar: ${currentUser.location})`);
                users = users.filter(u => u !== currentUser);

                broadcast(users, { type: "system", text: `${currentUser.name} salió` });

                // const allUsers = getUsers();
                // broadcast(users, {
                //     type: "users",
                //     users: allUsers.map(u => ({
                //         id: u.id,
                //         name: u.name,
                //         rol: u.rol,
                //         img: u.img,
                //         connected: users.some(c => c.id === u.id)
                //     }))
                // });
            }
        });
    });
}

module.exports = setupChat;