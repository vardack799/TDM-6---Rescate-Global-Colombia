const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html"; // si no hay sesión, vuelve al login
}

const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("✅ Conectado al servidor WebSocket");
  ws.send(JSON.stringify({ type: "login", user }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("📩 Mensaje recibido:", data);

  if (data.type === "chat") {
    const div = document.createElement("div");
    div.classList.add("message");
    if (data.user.username === user.username) {
      div.classList.add("self");
    } else {
      div.classList.add("other");
    }
    div.textContent = `${data.user.username}: ${data.message}`;
    document.getElementById("messages").appendChild(div);
    document.getElementById("messages").scrollTop =
      document.getElementById("messages").scrollHeight;
  }
};

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  if (input.value.trim() !== "") {
    const msg = {
      type: "chat",
      user,
      message: input.value
    };
    ws.send(JSON.stringify(msg));
    input.value = "";
  }
}