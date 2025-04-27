// Dados de exemplo
let reservas = [
    {
        codigo: 'R001',
        hospede: 'João Silva',
        acomodacao: 'Suíte Master',
        diaria: 450.00,
        adultos: 2,
        criancas: 1,
        checkIn: '2024-03-25',
        checkOut: '2024-03-28',
        status: 'ativo'
    }
];

let funcionarios = [
    {
        nome: 'Maria Santos',
        cargo: 'gerente',
        endereco: 'Rua das Flores, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        telefone: '(11) 98765-4321',
        dataNascimento: '1985-06-15'
    }
];

let consumos = [
    {
        quarto: 101,
        item: 'Água Mineral',
        quantidade: 2,
        valor: 5.00,
        data: '2024-03-25'
    }
];

// Preços das acomodações
const precosDiarias = {
    standard: 250.00,
    luxo: 350.00,
    suite: 450.00
};

// Navegação entre tabs
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Funções para os modais
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Gerenciamento de Reservas
function handleNovaReserva(event) {
    event.preventDefault();
    
    const novaReserva = {
        codigo: gerarCodigoReserva(),
        hospede: document.getElementById('nomeHospede').value,
        acomodacao: document.getElementById('acomodacao').value,
        diaria: precosDiarias[document.getElementById('acomodacao').value],
        adultos: parseInt(document.getElementById('adultos').value),
        criancas: parseInt(document.getElementById('criancas').value),
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        status: 'ativo'
    };
    
    reservas.push(novaReserva);
    atualizarTabelaReservas();
    closeModal('modalReserva');
    event.target.reset();
    
    return false;
}

function gerarCodigoReserva() {
    return 'R' + String(reservas.length + 1).padStart(3, '0');
}

function calcularTotalReserva(reserva) {
    const checkIn = new Date(reserva.checkIn);
    const checkOut = new Date(reserva.checkOut);
    const dias = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return dias * reserva.diaria;
}

function atualizarTabelaReservas() {
    const tbody = document.getElementById('reservasTable');
    tbody.innerHTML = '';
    
    reservas.forEach(reserva => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${reserva.codigo}</td>
            <td>${reserva.hospede}</td>
            <td>${reserva.acomodacao}</td>
            <td>R$ ${reserva.diaria.toFixed(2)}</td>
            <td>${reserva.adultos}</td>
            <td>${reserva.criancas}</td>
            <td>${formatarData(reserva.checkIn)}</td>
            <td>${formatarData(reserva.checkOut)}</td>
            <td>R$ ${calcularTotalReserva(reserva).toFixed(2)}</td>
            <td><span class="status-badge status-${reserva.status}">${reserva.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button onclick="finalizarReserva('${reserva.codigo}')" ${reserva.status === 'finalizado' ? 'disabled' : ''}>
                        Finalizar
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function finalizarReserva(codigo) {
    const reserva = reservas.find(r => r.codigo === codigo);
    if (reserva) {
        reserva.status = 'finalizado';
        atualizarTabelaReservas();
    }
}

// Gerenciamento de Funcionários
function handleNovoFuncionario(event) {
    event.preventDefault();
    
    const novoFuncionario = {
        nome: document.getElementById('nomeFuncionario').value,
        cargo: document.getElementById('cargo').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('dataNascimento').value
    };
    
    funcionarios.push(novoFuncionario);
    atualizarTabelaFuncionarios();
    closeModal('modalFuncionario');
    event.target.reset();
    
    return false;
}

function atualizarTabelaFuncionarios() {
    const tbody = document.getElementById('funcionariosTable');
    tbody.innerHTML = '';
    
    funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.endereco}</td>
            <td>${funcionario.cidade}</td>
            <td>${funcionario.estado}</td>
            <td>${funcionario.telefone}</td>
            <td>${formatarData(funcionario.dataNascimento)}</td>
            <td>
                <div class="action-buttons">
                    <button class="edit-button" onclick="editarFuncionario('${funcionario.nome}')">Editar</button>
                    <button class="delete-button" onclick="removerFuncionario('${funcionario.nome}')">Remover</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editarFuncionario(nome) {
    const funcionario = funcionarios.find(f => f.nome === nome);
    if (funcionario) {
        document.getElementById('nomeFuncionario').value = funcionario.nome;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('endereco').value = funcionario.endereco;
        document.getElementById('cidade').value = funcionario.cidade;
        document.getElementById('estado').value = funcionario.estado;
        document.getElementById('telefone').value = funcionario.telefone;
        document.getElementById('dataNascimento').value = funcionario.dataNascimento;
        
        showModal('modalFuncionario');
    }
}

function removerFuncionario(nome) {
    if (confirm('Tem certeza que deseja remover este funcionário?')) {
        funcionarios = funcionarios.filter(f => f.nome !== nome);
        atualizarTabelaFuncionarios();
    }
}

// Gerenciamento de Consumo (mantido do código anterior com pequenas adaptações)
function handleNovoConsumo(event) {
    event.preventDefault();
    
    const novoConsumo = {
        quarto: parseInt(document.getElementById('quartoConsumo').value),
        item: document.getElementById('item').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        valor: parseFloat(document.getElementById('valor').value),
        data: new Date().toISOString().split('T')[0]
    };
    
    consumos.push(novoConsumo);
    atualizarTabelaConsumo();
    closeModal('modalConsumo');
    event.target.reset();
    
    return false;
}

function atualizarTabelaConsumo() {
    const tbody = document.getElementById('consumoTable');
    tbody.innerHTML = '';
    
    consumos.forEach(consumo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${consumo.quarto}</td>
            <td>${consumo.item}</td>
            <td>${consumo.quantidade}</td>
            <td>R$ ${consumo.valor.toFixed(2)}</td>
            <td>${formatarData(consumo.data)}</td>
            <td>
                <button onclick="removerConsumo(${consumo.quarto}, '${consumo.item}')">
                    Remover
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function removerConsumo(quarto, item) {
    consumos = consumos.filter(c => !(c.quarto === quarto && c.item === item));
    atualizarTabelaConsumo();
}

// Geração de Relatórios
function gerarRelatorio() {
    const tipo = document.getElementById('tipoRelatorio').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Hotel Green Garden - Relatório', 14, 20);
    doc.setFontSize(12);
    doc.text(`Período: ${formatarData(dataInicio)} a ${formatarData(dataFim)}`, 14, 30);
    
    switch (tipo) {
        case 'reservas':
            gerarRelatorioReservas(doc, dataInicio, dataFim);
            break;
        case 'funcionarios':
            gerarRelatorioFuncionarios(doc);
            break;
        case 'consumo':
            gerarRelatorioConsumo(doc, dataInicio, dataFim);
            break;
    }
    
    doc.save(`relatorio-${tipo}-${dataInicio}-${dataFim}.pdf`);
}

function gerarRelatorioReservas(doc, dataInicio, dataFim) {
    const dados = reservas.filter(r => 
        r.checkIn >= dataInicio && r.checkIn <= dataFim
    ).map(r => [
        r.codigo,
        r.hospede,
        r.acomodacao,
        `R$ ${r.diaria.toFixed(2)}`,
        r.adultos,
        r.criancas,
        formatarData(r.checkIn),
        formatarData(r.checkOut),
        `R$ ${calcularTotalReserva(r).toFixed(2)}`,
        r.status
    ]);
    
    doc.autoTable({
        head: [['Código', 'Hóspede', 'Acomodação', 'Diária', 'Adultos', 'Crianças', 'Check-in', 'Check-out', 'Total', 'Status']],
        body: dados,
        startY: 40
    });
}

function gerarRelatorioFuncionarios(doc) {
    const dados = funcionarios.map(f => [
        f.nome,
        f.cargo,
        f.endereco,
        f.cidade,
        f.estado,
        f.telefone,
        formatarData(f.dataNascimento)
    ]);
    
    doc.autoTable({
        head: [['Nome', 'Cargo', 'Endereço', 'Cidade', 'Estado', 'Telefone', 'Data Nasc.']],
        body: dados,
        startY: 40
    });
}

function gerarRelatorioConsumo(doc, dataInicio, dataFim) {
    const dados = consumos.filter(c =>
        c.data >= dataInicio && c.data <= dataFim
    ).map(c => [
        c.quarto,
        c.item,
        c.quantidade,
        `R$ ${c.valor.toFixed(2)}`,
        formatarData(c.data)
    ]);
    
    doc.autoTable({
        head: [['Quarto', 'Item', 'Quantidade', 'Valor', 'Data']],
        body: dados,
        startY: 40
    });
}

// Funções Auxiliares
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Formatação do telefone
document.getElementById('telefone')?.addEventListener('input', function(e) {
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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabelaReservas();
    atualizarTabelaFuncionarios();
    atualizarTabelaConsumo();
});

// Fechar modais quando clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}