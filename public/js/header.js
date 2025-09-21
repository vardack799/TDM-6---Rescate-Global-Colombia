//menu toggle para el sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}
