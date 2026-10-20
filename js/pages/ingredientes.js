/* Tela ingredientes.html: listagem, busca e cadastro de ingredientes. */
const campoBuscaIngrediente = document.getElementById("busca-ingrediente");
const formularioIngrediente = document.getElementById("formulario-ingrediente");
const modalIngrediente = document.getElementById("modal-ingrediente");

function mostrarIngredientes() {
  const busca = normalizarTexto(campoBuscaIngrediente.value);
  let linhas = "";

  for (const ingrediente of dados.ingredientes) {
    if (!normalizarTexto(ingrediente.nome).includes(busca)) {
      continue;
    }
    linhas += `
      <tr>
        <td><strong>${escaparHtml(ingrediente.nome)}</strong></td>
        <td>${escaparHtml(ingrediente.marca)}</td>
        <td>${escaparHtml(ingrediente.unidade)}</td>
        <td>${formatarNumero(ingrediente.estoque)}</td>
        <td>${formatarPrecoUnitario(ingrediente.precoUnitario)} / ${escaparHtml(ingrediente.unidade)}</td>
        <td>${criarSeloEstoque(ingrediente)}</td>
      </tr>`;
  }
  if (!linhas) {
    linhas = mostrarTabelaVazia(6, "Nenhum ingrediente encontrado.");
  }
  document.getElementById("tabela-ingredientes").innerHTML = linhas;
}

function cadastrarIngrediente(evento) {
  evento.preventDefault(); // Evita recarregar a página ao enviar o formulário.
  const ingrediente = {
    id: gerarIdentificador(),
    nome: document.getElementById("ingrediente-nome").value.trim(),
    marca: document.getElementById("ingrediente-marca").value.trim(),
    unidade: document.getElementById("ingrediente-unidade").value,
    estoque: Number(document.getElementById("ingrediente-estoque").value),
    estoqueMinimo: Number(document.getElementById("ingrediente-minimo").value),
    precoUnitario: Number(document.getElementById("ingrediente-preco").value)
  };

  if (!ingrediente.nome || !ingrediente.marca || !formularioIngrediente.reportValidity()) {
    mostrarMensagem("Preencha o nome, a marca e os valores do ingrediente.", true);
    return;
  }
  dados.ingredientes.push(ingrediente);
  if (!salvarDados()) {
    return;
  }
  mostrarIngredientes();
  formularioIngrediente.reset();
  modalIngrediente.close();
  mostrarMensagem("Ingrediente cadastrado com sucesso!");
}

document.getElementById("abrir-ingrediente").addEventListener("click", function () {
  modalIngrediente.showModal();
});
campoBuscaIngrediente.addEventListener("input", mostrarIngredientes);
formularioIngrediente.addEventListener("submit", cadastrarIngrediente);
mostrarIngredientes();
