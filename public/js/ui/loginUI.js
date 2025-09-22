export function showError(message) {
    const errorEl = document.getElementById("loginError");
    errorEl.textContent = message;
}

export function clearError() {
    const errorEl = document.getElementById("loginError");
    errorEl.textContent = ""; 
}

export function saveUserV(userV) {
    localStorage.setItem("userV", JSON.stringify(userV));
}

export function redirectToChat() {
    window.location.href = "/chat.html";
}