const {getMessages} = require("../models/msg");

function handleMessagesRoutes(req, res) {
    if (req.url.startsWith("/api/messages")) {
        const method = req.method;
        const parts = req.url.split("/").filter(Boolean);

        // GET /api/users 
        if (method === "GET" && parts.length === 2) {
            const messages = getMessages();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(messages));
            return true;
        }

    }

    return false;
}

module.exports = handleMessagesRoutes;