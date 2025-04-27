function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Limpa erros anteriores
    clearErrors();
    
    // Validações
    let hasError = false;
    
    if (!name || name.trim().length < 3) {
        showError('name', 'Nome deve ter pelo menos 3 caracteres');
        hasError = true;
    }
    
    if (!isValidEmail(email)) {
        showError('email', 'E-mail inválido');
        hasError = true;
    }
    
    if (!isValidPhone(phone)) {
        showError('phone', 'Telefone inválido');
        hasError = true;
    }
    
    if (password.length < 6) {
        showError('password', 'Senha deve ter pelo menos 6 caracteres');
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'As senhas não coincidem');
        hasError = true;
    }
    
    if (!hasError) {
        // Aqui você pode adicionar sua lógica de cadastro
        console.log('Dados do cadastro:', { name, email, phone, password });
        
        // Simula um cadastro bem-sucedido
        alert('Cadastro realizado com sucesso!');
        // Redireciona para a página de login
        // window.location.href = 'login.html';
    }
    
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
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

// Formatação do telefone
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    
    e.target.value = value;
});

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