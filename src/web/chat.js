const broadcast = require("../utils/broadcast");
const { getUsers } = require("../models/users");

let users = [];

function setupChat(wss) {
    wss.on("connection", (ws, req) => { 
        let currentUser = null;
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

        ws.on("message", (msg) => {
            const data = JSON.parse(msg);

            if (data.type === "login") {
                currentUser = { id: data.user.id, name: data.user.name, ws };
                users.push(currentUser);

                console.log(`${new Date().toISOString()} - 🟢 Cliente conectado (${currentUser.name} | ${ip})`);

                broadcast(users, { type: "system", text: `${currentUser.name} se unió` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        img: u.img,
                        connected: users.some(c => c.id === u.id)
                    }))
                });
            }

            // if (data.type === "formUser"){
            //     currentUser = {name: data.user.name, ws}
            //     users.push(currentUser)
            //     console.log(`${new Date().toISOString()} - 🟢 Cliente conectado (${currentUser.name} | ${ip})`);
            //     broadcast(users, { type: "system", text: `${currentUser.name} se unió` });
            // }



            if (data.type === "chat") {
                broadcast(users, { type: "chat", user: data.user, text: data.text });
            }
        });

        ws.on("close", () => {
            if (currentUser) {
                console.log(`${new Date().toISOString()} - 🔴 Cliente desconectado (${currentUser.name} | ${ip})`);
                users = users.filter(u => u !== currentUser);

                broadcast(users, { type: "system", text: `${currentUser.name} salió` });

                const allUsers = getUsers();
                broadcast(users, {
                    type: "users",
                    users: allUsers.map(u => ({
                        id: u.id,
                        name: u.name,
                        rol: u.rol,
                        img: u.img,
                        connected: users.some(c => c.id === u.id)
                    }))
                });
            }
        });
    });
}

module.exports = setupChat;