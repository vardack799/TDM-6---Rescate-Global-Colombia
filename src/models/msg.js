const { KeyObject } = require("crypto");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const MESSAGES_FILE = path.join(__dirname, "..", "data", "msgData.json");

//retorna la data segun el lugar y emergencia del usuario actual
function getMessages(location, typeEmergency) {
    let messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"))
    let msgsReturn = []

    messages.forEach(u => {
        if (u.location === location && u.typeEmergency === typeEmergency) {
            msgsReturn.push(u)
        }else{
            console.log("Datos no encontrados...")
        }

    });
    return msgsReturn
}

function saveMessages(msg) {
    let msgs = []
    
    if (fs.existsSync(MESSAGES_FILE)) {
        const data = fs.readFileSync(MESSAGES_FILE, "utf8")
        msgs = JSON.parse(data)
    } else {
        console.log("ERROR: Documento no encontrado :(")
    }

    msgs.push(msg)

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2));
}

function deleteMessages(){
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

//Elimina la data de mensajes cada cierto intervalo de tiempo
const timeI = 3600000

const clearMsgs = setInterval(() => {
    deleteMessages()
    console.log("Mensajes eliminados")
}, timeI)

module.exports = { getMessages, saveMessages, deleteMessages};