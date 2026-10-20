/*
 * Tela nova-receita.html: cria, edita ou mostra uma ficha.
 * ?id=... identifica uma receita. &modo=visualizar abre somente para leitura.
 */
const formularioReceita = document.getElementById("formulario-receita");
const listaIngredientesReceita = document.getElementById("ingredientes-receita");
const parametrosReceita = new URLSearchParams(window.location.search);
const identificadorReceita = parametrosReceita.get("id");
const somenteLeitura = parametrosReceita.get("modo") === "visualizar";
let ingredientesDaReceita = [];

function mostrarLinhasIngredientes() {
  let linhas = "";
  for (let indice = 0; indice < ingredientesDaReceita.length; indice++) {
    const item = ingredientesDaReceita[indice];
    const ingrediente = buscarIngrediente(item.ingredienteId);
    let opcoes = "";
    for (const opcao of dados.ingredientes) {
      const selecionado = opcao.id === item.ingredienteId ? "selected" : "";
      opcoes += `<option value="${escaparHtml(opcao.id)}" ${selecionado}>${escaparHtml(opcao.nome)}</option>`;
    }
    const quantidade = item.quantidade === 0 ? "" : item.quantidade;
    linhas += `
      <div class="linha-ingrediente" data-indice="${indice}">
        <div class="campo">
          <label for="item-ingrediente-${indice}">Ingrediente ${indice + 1}</label>
          <select id="item-ingrediente-${indice}" class="selecionar-ingrediente" required>${opcoes}</select>
        </div>
        <div class="campo">
          <label for="item-quantidade-${indice}">Quantidade (${escaparHtml(ingrediente ? ingrediente.unidade : "")})</label>
          <input id="item-quantidade-${indice}" class="quantidade-ingrediente" type="number" min="0.001" step="0.001" value="${quantidade}" required>
        </div>
        <button type="button" class="botao botao-perigo remover-ingrediente" aria-label="Remover ingrediente ${indice + 1}">Remover</button>
      </div>`;
  }
  listaIngredientesReceita.innerHTML = linhas || '<p class="estado-vazio">Adicione pelo menos um ingrediente.</p>';
  if (somenteLeitura) {
    for (const campo of listaIngredientesReceita.querySelectorAll("input, select, button")) {
      campo.disabled = true;
    }
  }
}

function lerValoresReceita() {
  return {
    nome: document.getElementById("receita-nome").value.trim(),
    rendimento: Number(document.getElementById("receita-rendimento").value),
    unidadeRendimento: document.getElementById("receita-unidade").value.trim(),
    precoVenda: Number(document.getElementById("receita-preco").value),
    custoTotal: calcularCustoIngredientes(ingredientesDaReceita)
  };
}

function mostrarPrecificacao(receita = lerValoresReceita()) {
  const indicadores = calcularIndicadoresReceita(receita);
  document.getElementById("receita-custo-total").textContent = formatarMoeda(receita.custoTotal);
  document.getElementById("receita-custo-unidade").textContent = formatarMoeda(indicadores.custoPorUnidade);
  document.getElementById("receita-margem").textContent = formatarPorcentagem(indicadores.margem);
  const lucro = document.getElementById("receita-lucro");
  lucro.textContent = formatarMoeda(indicadores.lucroPorUnidade);
  lucro.classList.toggle("texto-vermelho", indicadores.lucroPorUnidade < 0);
  lucro.classList.toggle("texto-verde", indicadores.lucroPorUnidade >= 0);
}

function adicionarIngrediente() {
  if (dados.ingredientes.length === 0) {
    mostrarMensagem("Cadastre um ingrediente na tela Ingredientes primeiro.", true);
    return;
  }
  ingredientesDaReceita.push({ ingredienteId: dados.ingredientes[0].id, quantidade: 0 });
  mostrarLinhasIngredientes();
  mostrarPrecificacao();
}

function atualizarIngrediente(evento) {
  const linha = evento.target.closest("[data-indice]");
  if (!linha) {
    return;
  }
  const item = ingredientesDaReceita[Number(linha.dataset.indice)];
  if (evento.target.classList.contains("selecionar-ingrediente")) {
    item.ingredienteId = evento.target.value;
    mostrarLinhasIngredientes();
  }
  if (evento.target.classList.contains("quantidade-ingrediente")) {
    item.quantidade = Number(evento.target.value);
  }
  mostrarPrecificacao();
}

function removerIngrediente(evento) {
  if (!evento.target.classList.contains("remover-ingrediente")) {
    return;
  }
  const linha = evento.target.closest("[data-indice]");
  ingredientesDaReceita.splice(Number(linha.dataset.indice), 1);
  mostrarLinhasIngredientes();
  mostrarPrecificacao();
}

function salvarReceita(evento) {
  evento.preventDefault();
  if (somenteLeitura) {
    return;
  }
  const valores = lerValoresReceita();
  if (!formularioReceita.reportValidity() || !valores.nome || !valores.unidadeRendimento || ingredientesDaReceita.length === 0) {
    mostrarMensagem("Preencha a ficha e adicione pelo menos um ingrediente.", true);
    return;
  }
  for (const item of ingredientesDaReceita) {
    if (!buscarIngrediente(item.ingredienteId) || !Number.isFinite(item.quantidade) || item.quantidade <= 0) {
      mostrarMensagem("Informe uma quantidade positiva para cada ingrediente.", true);
      return;
    }
  }
  if (!Number.isFinite(valores.custoTotal) || !Number.isInteger(valores.rendimento) || valores.rendimento <= 0 || valores.precoVenda <= 0) {
    mostrarMensagem("Confira o rendimento, o preço e as quantidades.", true);
    return;
  }
  const receita = {
    id: identificadorReceita || gerarIdentificador(),
    nome: valores.nome,
    rendimento: valores.rendimento,
    unidadeRendimento: valores.unidadeRendimento,
    precoVenda: valores.precoVenda,
    custoTotal: valores.custoTotal,
    ingredientes: agruparIngredientes(ingredientesDaReceita),
    dataAtualizacao: obterDataAtual()
  };
  if (identificadorReceita) {
    const indice = dados.receitas.findIndex(function (item) {
      return item.id === identificadorReceita;
    });
    if (indice === -1) {
      mostrarMensagem("Receita não encontrada. Volte para a lista de receitas.", true);
      return;
    }
    dados.receitas[indice] = receita;
  } else {
    dados.receitas.unshift(receita);
  }
  if (salvarDados()) {
    window.location.href = "receitas.html";
  }
}

function iniciarFormularioReceita() {
  const receita = buscarReceita(identificadorReceita);
  if (identificadorReceita && !receita) {
    mostrarMensagem("Receita não encontrada. Volte para a lista de receitas.", true);
    document.getElementById("salvar-receita").disabled = true;
    return;
  }
  if (receita) {
    document.getElementById("titulo-receita").textContent = somenteLeitura ? "Ficha da receita" : "Editar receita";
    document.getElementById("receita-nome").value = receita.nome;
    document.getElementById("receita-rendimento").value = receita.rendimento;
    document.getElementById("receita-unidade").value = receita.unidadeRendimento;
    document.getElementById("receita-preco").value = receita.precoVenda;
    // Copiamos a composição para não alterar a receita antes de clicar em Salvar.
    ingredientesDaReceita = JSON.parse(JSON.stringify(receita.ingredientes));
  }
  mostrarLinhasIngredientes();
  if (somenteLeitura && receita) {
    mostrarPrecificacao(receita); // Mostra o custo que estava salvo na ficha.
    for (const campo of formularioReceita.querySelectorAll("input, select, button")) {
      campo.disabled = true;
    }
    document.getElementById("salvar-receita").hidden = true;
    document.getElementById("adicionar-ingrediente").hidden = true;
  } else {
    mostrarPrecificacao();
  }
}

document.getElementById("adicionar-ingrediente").addEventListener("click", adicionarIngrediente);
listaIngredientesReceita.addEventListener("input", atualizarIngrediente);
listaIngredientesReceita.addEventListener("click", removerIngrediente);
document.getElementById("receita-rendimento").addEventListener("input", function () { mostrarPrecificacao(); });
document.getElementById("receita-preco").addEventListener("input", function () { mostrarPrecificacao(); });
formularioReceita.addEventListener("submit", salvarReceita);
iniciarFormularioReceita();
