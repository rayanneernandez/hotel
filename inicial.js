// Menu de navegação com destaque para a página ativa
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const currentLocation = location.href;

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
});

// Função de reserva (simulação)
document.getElementById('reservaForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o envio do formulário
    alert('Reserva confirmada!'); // Exemplo de mensagem de confirmação
});