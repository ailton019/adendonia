let letraSorteada = '';
let categorias = []; // Lista de categorias (padrão ou personalizadas)

// Categorias padrão
const categoriasPadrao = [
    "País", "Profissão", "Objeto", "Filme", "Música", "Time de Futebol",
    "Marca Famosa", "Esporte", "Nome de Celebridade", "Nome de Pessoa",
    "Parte do Corpo Humano", "Novelas", "Carro", "Comida", "Animal",
    "Cidade", "Fruta", "Cor"
];

// Função para reiniciar o jogo
function reiniciarJogo() {
    letraSorteada = '';
    categorias = [];
    document.getElementById('letra').textContent = '';
    document.querySelector('#tabelaRespostas tbody').innerHTML = '';
    document.getElementById('resultado').textContent = '';
    document.getElementById('desistir').style.display = 'none';
    document.getElementById('escolhaCategorias').style.display = 'block';
    document.getElementById('adicionarCategoria').style.display = 'none';
    document.getElementById('novaCategoria').value = '';
}

// Função para sortear uma letra
document.getElementById('sortearLetra').addEventListener('click', () => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letraSorteada = letras[Math.floor(Math.random() * letras.length)];
    document.getElementById('letra').textContent = letraSorteada;

    // Verifica a escolha do usuário
    const escolha = document.querySelector('input[name="categorias"]:checked').value;

    if (escolha === 'padrao') {
        categorias = [...categoriasPadrao]; // Usa as categorias padrão
    } else if (escolha === 'personalizado' && categorias.length === 0) {
        alert('Adicione pelo menos uma categoria antes de sortear a letra.');
        return;
    }

    // Limpa as respostas anteriores
    const tbody = document.querySelector('#tabelaRespostas tbody');
    tbody.innerHTML = '';

    // Adiciona as categorias à tabela
    categorias.forEach(categoria => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${categoria}</td>
            <td><input type="text" class="resposta"></td>
        `;
        tbody.appendChild(row);
    });

    // Mostra o botão "Desistir"
    document.getElementById('desistir').style.display = 'inline-block';
    // Oculta a escolha de categorias
    document.getElementById('escolhaCategorias').style.display = 'none';
});

// Função para adicionar uma nova categoria
document.getElementById('adicionar').addEventListener('click', () => {
    const novaCategoria = document.getElementById('novaCategoria').value.trim();

    if (novaCategoria && !categorias.includes(novaCategoria)) {
        categorias.push(novaCategoria); // Adiciona a nova categoria à lista
        document.getElementById('novaCategoria').value = ''; // Limpa o campo de entrada

        // Atualiza a tabela se a letra já foi sorteada
        if (letraSorteada) {
            const tbody = document.querySelector('#tabelaRespostas tbody');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${novaCategoria}</td>
                <td><input type="text" class="resposta"></td>
            `;
            tbody.appendChild(row);
        }
    } else {
        alert('Por favor, insira uma categoria válida ou que ainda não foi adicionada.');
    }
});

// Função para verificar as respostas
document.getElementById('verificarRespostas').addEventListener('click', () => {
    const respostas = document.querySelectorAll('.resposta');
    let pontuacao = 0;

    respostas.forEach(resposta => {
        if (resposta.value.toUpperCase().startsWith(letraSorteada)) {
            pontuacao++;
        }
    });

    document.getElementById('resultado').textContent = `Pontuação: ${pontuacao} de ${categorias.length}`;
});

// Evento para o botão "Desistir"
document.getElementById('desistir').addEventListener('click', reiniciarJogo);

// Mostra ou oculta o campo de adicionar categorias com base na escolha do usuário
document.querySelectorAll('input[name="categorias"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const adicionarCategoriaDiv = document.getElementById('adicionarCategoria');
        if (radio.value === 'personalizado') {
            adicionarCategoriaDiv.style.display = 'block';
            categorias = []; // Limpa as categorias ao escolher personalizado
        } else {
            adicionarCategoriaDiv.style.display = 'none';
            categorias = [...categoriasPadrao]; // Restaura as categorias padrão
        }
    });
});