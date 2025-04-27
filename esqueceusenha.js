function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Limpa erros anteriores
    clearErrors();
    
    // Validação do email
    if (!isValidEmail(email)) {
        showError('email', 'E-mail inválido');
        return false;
    }
    
    // Aqui você pode adicionar sua lógica de recuperação de senha
    console.log('Solicitação de recuperação de senha para:', email);
    
    // Simula o envio bem-sucedido
    showSuccessMessage('As instruções de recuperação de senha foram enviadas para seu e-mail.');
    
    // Desabilita o formulário após o envio
    document.getElementById('forgotPasswordForm').style.display = 'none';
    
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const inputGroup = document.getElementById(fieldId).parentElement;
    inputGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    inputGroup.appendChild(errorMessage);
}

function clearErrors() {
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.display = 'block';
    successMessage.textContent = message;
    
    const form = document.getElementById('forgotPasswordForm');
    form.parentElement.insertBefore(successMessage, form);
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