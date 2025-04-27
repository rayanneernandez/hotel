// Função para abrir a lightbox
function openLightbox(img) {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'block';
}

// Função para fechar a lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Função para abrir o WhatsApp
function openWhatsApp() {
    window.location.href = "https://wa.me/seunumerodetelefone";
}

// Função para abrir o modal de reserva
function openModal() {
    document.getElementById('modal').style.display = 'flex';  // Exibe o modal
}

// Função para fechar o modal de reserva
function closeModal() {
    document.getElementById('modal').style.display = 'none';  // Oculta o modal
}

// Função para fechar o modal de confirmação
function closeConfirmacao() {
    document.getElementById('confirmacao').style.display = 'none';  // Oculta o modal de confirmação
}

// Adicionar evento de submit ao formulário de reserva
document.getElementById("reserva-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o envio do formulário
    closeModal();  // Fecha o modal de reserva
    document.getElementById("confirmacao").style.display = "flex";  // Mostra o modal de confirmação
});

// Garante que os modais estejam ocultos ao carregar a página
window.onload = function() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("confirmacao").style.display = "none";
};
