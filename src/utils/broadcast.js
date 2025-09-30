function broadcast(users, data) {
    const msg = JSON.stringify(data);
    users.forEach(u => {
        if (u.ws.readyState === 1 && u.typeEmergency === data.typeEmergency && u.location === data.location || data.type === "msgD") {

            u.ws.send(msg); 

        }
    }); 
} 

module.exports = broadcast; 