/* Tela estoque.html: usa o mesmo catálogo de ingredientes das outras páginas. */
const campoBuscaEstoque = document.getElementById("busca-estoque");
const formularioEstoque = document.getElementById("formulario-estoque");
const seletorAjuste = document.getElementById("ajuste-ingrediente");
const modalEstoque = document.getElementById("modal-estoque");

function mostrarEstoque() {
  const busca = normalizarTexto(campoBuscaEstoque.value);
  const contagem = { critico: 0, baixo: 0, normal: 0 };
  let linhas = "";

  for (const ingrediente of dados.ingredientes) {
    contagem[obterStatusEstoque(ingrediente)] += 1;
    if (!normalizarTexto(ingrediente.nome).includes(busca)) {
      continue;
    }
    linhas += `
      <tr>
        <td><strong>${escaparHtml(ingrediente.nome)}</strong></td>
        <td>${escaparHtml(ingrediente.marca)}</td>
        <td>${formatarNumero(ingrediente.estoque)}</td>
        <td>${escaparHtml(ingrediente.unidade)}</td>
        <td>${formatarPrecoUnitario(ingrediente.precoUnitario)} / ${escaparHtml(ingrediente.unidade)}</td>
        <td>${criarSeloEstoque(ingrediente)}</td>
      </tr>`;
  }
  document.getElementById("tabela-estoque").innerHTML = linhas || mostrarTabelaVazia(6, "Nenhum ingrediente encontrado.");
  document.getElementById("estoque-total").textContent = dados.ingredientes.length;
  document.getElementById("estoque-critico").textContent = contagem.critico;
  document.getElementById("estoque-baixo").textContent = contagem.baixo;
  document.getElementById("estoque-normal").textContent = contagem.normal;
}

function preencherQuantidadeAtual() {
  const ingrediente = buscarIngrediente(seletorAjuste.value);
  if (ingrediente) {
    document.getElementById("ajuste-quantidade").value = ingrediente.estoque;
    document.getElementById("ajuste-unidade").textContent = "Informe a quantidade em " + ingrediente.unidade + ".";
  }
}

function ajustarEstoque(evento) {
  evento.preventDefault();
  const ingrediente = buscarIngrediente(seletorAjuste.value);
  const quantidade = Number(document.getElementById("ajuste-quantidade").value);
  if (!ingrediente || !formularioEstoque.reportValidity() || !Number.isFinite(quantidade) || quantidade < 0) {
    mostrarMensagem("Escolha um ingrediente e informe uma quantidade igual ou maior que zero.", true);
    return;
  }
  ingrediente.estoque = quantidade;
  if (salvarDados()) {
    mostrarEstoque();
    modalEstoque.close();
    mostrarMensagem("Estoque ajustado com sucesso!");
  }
}

document.getElementById("abrir-estoque").addEventListener("click", function () {
  preencherIngredientes(seletorAjuste);
  preencherQuantidadeAtual();
  modalEstoque.showModal();
});
seletorAjuste.addEventListener("change", preencherQuantidadeAtual);
campoBuscaEstoque.addEventListener("input", mostrarEstoque);
formularioEstoque.addEventListener("submit", ajustarEstoque);
mostrarEstoque();
