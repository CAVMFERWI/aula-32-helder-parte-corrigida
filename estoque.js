// Mostra os resultados no DOM (sem console.log), em formato de relatório
const conteudo = document.getElementById('conteudo');
document.getElementById('data').textContent = 'Gerado em: ' + new Date().toLocaleString('pt-BR');

function parte(titulo) {
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  conteudo.appendChild(h2);
}

// array de objetos vira tabela com colunas, array simples vira uma linha, o resto uma célula
function criarTabela(valor) {
  const tabela = document.createElement('table');
  if (Array.isArray(valor) && typeof valor[0] === 'object') {
    const colunas = Object.keys(valor[0]);
    const cab = tabela.insertRow();
    for (const c of colunas) {
      const th = document.createElement('th');
      th.textContent = c;
      cab.appendChild(th);
    }
    for (const obj of valor) {
      const tr = tabela.insertRow();
      for (const c of colunas) tr.insertCell().textContent = obj[c];
    }
  } else if (Array.isArray(valor)) {
    const tr = tabela.insertRow();
    for (const item of valor) tr.insertCell().textContent = item;
  } else if (typeof valor === 'object') {
    return criarTabela([valor]);
  } else {
    tabela.insertRow().insertCell().textContent = valor;
  }
  return tabela;
}

// linhas: lista de [rótulo, valor]; só o valor é exibido
function questao(titulo, linhas) {
  const div = document.createElement('div');
  div.className = 'questao';
  const h3 = document.createElement('h3');
  h3.textContent = titulo;
  div.appendChild(h3);
  for (const [, valor] of linhas) {
    div.appendChild(criarTabela(valor));
  }
  conteudo.appendChild(div);
}

// ===== Parte 1: Declaração e Modificação Básica =====
parte('Parte 1: Declaração e Modificação Básica');

const categorias = ['Eletrônicos', 'Vestuário', 'Alimentos'];
questao('Questão 1.1', [['categorias', categorias.slice()]]);

const codigosProdutos = [101, 102, 103, 104];
const fornecedores = new Array('TechSupply', 'ModaExpress', 'SuperFoods');
questao('Questão 1.2', [
  ['codigosProdutos', codigosProdutos],
  ['fornecedores', fornecedores]
]);

const primeiraCategoria = categorias[0];
categorias[1] = 'Calçados';
questao('Questão 1.3', [
  ['categorias[0]', primeiraCategoria],
  ['categorias atualizado', categorias.slice()]
]);

// ===== Parte 2: Inserção, Remoção e Pesquisa =====
parte('Parte 2: Inserção, Remoção e Pesquisa');

const passos = [];
categorias.push('Livros');
passos.push(["push('Livros')", categorias.slice()]);
categorias.pop();
passos.push(['pop()', categorias.slice()]);
categorias.unshift('Brinquedos');
passos.push(["unshift('Brinquedos')", categorias.slice()]);
categorias.shift();
passos.push(['shift()', categorias.slice()]);
questao('Questão 2.1', passos);

questao('Questão 2.2', [['categorias.length', categorias.length]]);

questao('Questão 2.3', [
  ["indexOf('Calçados')", categorias.indexOf('Calçados')],
  ["includes('Eletrônicos')", categorias.includes('Eletrônicos')]
]);

// ===== Parte 3: Iteração =====
parte('Parte 3: Iteração (Laços de Repetição)');

const linhasFor = [];
for (let i = 0; i < categorias.length; i++) {
  linhasFor.push(['categorias[' + i + ']', categorias[i]]);
}
questao('Questão 3.1', linhasFor);

const linhasForOf = [];
for (const categoria of categorias) {
  linhasForOf.push(['categoria', categoria]);
}
questao('Questão 3.2', linhasForOf);

// ===== Parte 4: Arrays de Objetos e Métodos Avançados =====
parte('Parte 4: Arrays de Objetos e Métodos Avançados');

const produtos = [
  { nome: 'Teclado Mecânico', preco: 250.00, estoque: 15 },
  { nome: 'Mouse Gamer', preco: 120.00, estoque: 8 },
  { nome: 'Monitor Ultrawide', preco: 1200.00, estoque: 4 }
];

questao('Questão 4.1', [['produtos[0].nome', produtos[0].nome]]);

const produtosBaratos = produtos.filter(p => p.preco < 300.00);
const precos = [50, 150, 200, 350, 400];
questao('Questão 4.2 (filter)', [
  ['produtosBaratos', produtosBaratos],
  ['múltiplos de 100', precos.filter(preco => preco % 100 === 0)]
]);

const quantidades = [2, 3, 5, 10];
questao('Questão 4.3 (reduce)', [
  ['total de itens', quantidades.reduce((acc, q) => acc + q, 0)],
  ['valor total em estoque (R$)', produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0)]
]);

const precosOriginais = [100, 200, 300];
const nomesProdutos = produtos.map(p => p.nome);
questao('Questão 4.4 (map)', [
  ['preços com desconto', precosOriginais.map(preco => preco * 0.9)],
  ['nomesProdutos', nomesProdutos]
]);

const ordenados = produtos.slice().sort((a, b) => a.preco - b.preco);
questao('Questão 4.5 (slice e sort)', [['produtos ordenados', ordenados]]);

const inventario = [
  { nome: 'Teclado', estoque: 15 },
  { nome: 'Mouse', estoque: 2 },
  { nome: 'Headset', estoque: 10 }
];
questao('Questão 4.6 (some e find)', [
  ['produtos: algum estoque < 5?', produtos.some(p => p.estoque < 5)],
  ['inventário: algum estoque < 5?', inventario.some(p => p.estoque < 5)],
  ['primeiro produto crítico', inventario.find(p => p.estoque < 5)]
]);
