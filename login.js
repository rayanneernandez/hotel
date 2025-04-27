function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Aqui você pode adicionar sua lógica de autenticação
    console.log('Tentativa de login:', { email, password });
    
    // Exemplo de validação básica
    if (email && password) {
        // Simula um login bem-sucedido
        alert('Login realizado com sucesso!');
        // Redireciona para a página principal
        // window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
    
    return false;
}

// Adiciona classe para animação quando os inputs recebem foco
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});