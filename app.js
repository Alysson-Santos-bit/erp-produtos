// ==========================================
// 1. O BANCO DE DADOS E O ESTADO (ATUALIZADO)
// ==========================================
const estoque = [
    { id: 1, nome: "Notebook Pro", preco: 4500, categoria: "Eletrônicos" },
    { id: 2, nome: "Cadeira Ergonômica", preco: 1200, categoria: "Móveis" },
    { id: 3, nome: "Mouse Sem Fio", preco: 150, categoria: "Eletrônicos" },
    { id: 4, nome: "Teclado Mecânico", preco: 350, categoria: "Eletrônicos" }
];

let meuCarrinho = [];

// ==========================================
// 2. O AGRUPADOR O(1) (NOVO MOTOR LÓGICO)
// ==========================================
// Criamos um dicionário vazio
let gavetasDeCategorias = {};

// Preenchemos as gavetas automaticamente lendo o estoque
for (let produto of estoque) {
    // Se a gaveta ainda não existe, crie uma lista vazia para ela
    if (gavetasDeCategorias[produto.categoria] === undefined) {
        gavetasDeCategorias[produto.categoria] = [];
    }
    // Jogue o produto dentro da gaveta correta
    gavetasDeCategorias[produto.categoria].push(produto);
}

// A função que o botão do HTML vai chamar
function filtrarCategoria(nomeDaCategoria) {
    if (nomeDaCategoria === 'Todas') {
        // Se clicou em 'Todas', manda o estoque inteiro para a tela
        renderizarVitrine(estoque, 'vitrine');
    } else {
        // Se clicou em uma específica, pega direto da gaveta na velocidade O(1)!
        let listaFiltrada = gavetasDeCategorias[nomeDaCategoria];
        renderizarVitrine(listaFiltrada, 'vitrine');
    }
}

function buscarProdutos(textoDigitado) {
    let textoMinusculo = textoDigitado.toLowerCase();
    let listaFiltrada = estoque.filter((produto)=>produto.nome.toLowerCase().includes(textoMinusculo));
    renderizarVitrine(listaFiltrada, 'vitrine');
   
    
}
function adicionarAoCarrinho(carrinho, produto) {
    let itemExistente = carrinho.find((item) => item.id === produto.id);
    if (itemExistente !== undefined) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({...produto, quantidade: 1});
    }
    return carrinho;
}

function removerDoCarrinho(carrinho, idDoProduto) {
    let indice = carrinho.findIndex((item) => item.id === idDoProduto);
    if (indice !== -1) {
        carrinho[indice].quantidade--;
        if (carrinho[indice].quantidade === 0) {
            carrinho.splice(indice, 1);
        }
    }
    return carrinho;
}

function calcularTotal(carrinho) {
    let total = 0;
    for (let item of carrinho) {
        total += item.preco * item.quantidade;
    }
    return total;
}

function salvarCarrinho() {
    // Transforma o array em texto e guarda na chave 'carrinhoERP'
    localStorage.setItem('carrinhoERP', JSON.stringify(meuCarrinho));
}

function carregarCarrinho() {
    const dadosGuardados = localStorage.getItem('carrinhoERP');
    
    if (dadosGuardados) {
        // Se houver dados, transforma o texto de volta em array
        meuCarrinho = JSON.parse(dadosGuardados);
        // Atualiza o ecrã para mostrar o que foi recuperado
        renderizarCarrinho(meuCarrinho, 'carrinho-lateral');
    }
}

// ==========================================
// 3. FÁBRICAS DE RENDERIZAÇÃO (INTERFACE)
// ==========================================
function renderizarVitrine(lista, idDoContainer) {
    let htmlCompleto = "";
    for (let produto of lista) {
        htmlCompleto += `
        <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col items-center border border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">${produto.nome}</h2>
            <p class="text-blue-600 font-semibold mt-2 text-xl">R$ ${produto.preco}</p>
            <button onclick="comprarProduto(${produto.id})" class="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 transition-colors">
                Comprar
            </button>
        </div>`;
    }
    document.getElementById(idDoContainer).innerHTML = htmlCompleto;
}

function renderizarCarrinho(carrinho, idDoContainer) {
    let container = document.getElementById(idDoContainer);
    
    // Se estiver vazio, mostra a mensagem
    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-gray-500 italic">O carrinho está vazio.</p>';
        document.getElementById('valor-total').innerText = "R$ 0";
        return;
    }

    let htmlCompleto = "";
    for (let item of carrinho) {
        htmlCompleto += `
        <div class="flex justify-between items-center border-b py-3">
            <div>
                <span class="font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded text-sm mr-2">${item.quantidade}x</span> 
                <span class="text-gray-700 font-medium">${item.nome}</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-semibold text-gray-900">R$ ${item.preco * item.quantidade}</span>
                <button onclick="cliqueRemover(${item.id})" class="text-red-500 hover:text-red-700 font-bold bg-red-50 px-2 py-1 rounded transition-colors">X</button>
            </div>
        </div>`;
    }
    
    container.innerHTML = htmlCompleto;
    document.getElementById('valor-total').innerText = `R$ ${calcularTotal(carrinho)}`;
}

// ==========================================
// 6. FERRAMENTAS DE UI (INTERFACE DO USUÁRIO)
// ==========================================
function mostrarNotificacao(mensagem) {
    let toast = document.createElement('div');
    toast.innerText = mensagem;
    toast.className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500";
    document.body.appendChild(toast);
    setTimeout(()=>{toast.remove()},3000);
    // 1. Crie a div na memória
    
    // 2. Coloque a mensagem dentro dela (innerText)
    
    // 3. Aplique as classes do Tailwind (className)
    
    // 4. Injete a div no final do body
    
    // 5. Configure o setTimeout para 3000ms (3 segundos)
    // 6. Dentro do setTimeout, mande a div se destruir (.remove())
    
}

// ==========================================
// Exemplo de como plugar no seu motor existente:
// ==========================================
function comprarProduto(idClicado) {
    let produtoAchado = estoque.find((item) => item.id === idClicado);
    adicionarAoCarrinho(meuCarrinho, produtoAchado);
    renderizarCarrinho(meuCarrinho, 'carrinho-lateral');
    
    // O Gatilho do Toast!
    mostrarNotificacao(`${produtoAchado.nome} adicionado ao carrinho!`);
    salvarCarrinho();
}

function cliqueRemover(idClicado) {
    removerDoCarrinho(meuCarrinho, idClicado);
    renderizarCarrinho(meuCarrinho, 'carrinho-lateral');
    
    salvarCarrinho(); // <-- E aqui também!
}

// ==========================================
// 5. IGNIÇÃO (O QUE RODA QUANDO A PÁGINA ABRE)
// ==========================================
// O que o sistema faz ao abrir
renderizarVitrine(estoque, 'vitrine');
carregarCarrinho(); // Verifica se o utilizador já tinha itens antes de recarregar