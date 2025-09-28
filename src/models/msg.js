const { KeyObject } = require("crypto");
const fs = require("fs");
const path = require("path");

const MESSAGES_FILE = path.join(__dirname, "..", "data", "msgData.json");

function getMessages() {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
}

function saveMessages(msg) {
    let msgs = []
    
    if (fs.existsSync(MESSAGES_FILE)) {
        const data = fs.readFileSync(MESSAGES_FILE, "utf8")
        msgs = JSON.parse(data)
        console.log(Object.keys(msgs))
    } else {
        console.log("ERROR: Documento no encontrado :(")
    }

    msgs.push(msg)

    console.log(msgs)

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2));
}

module.exports = { getMessages, saveMessages };