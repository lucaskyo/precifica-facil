/* Tela compras.html: uma compra aumenta o estoque e atualiza o preço unitário. */
const formularioCompra = document.getElementById("formulario-compra");
const seletorIngredienteCompra = document.getElementById("compra-ingrediente");

function mostrarUnidadeCompra() {
  const ingrediente = buscarIngrediente(seletorIngredienteCompra.value);
  let texto = "Cadastre um ingrediente na tela Ingredientes.";
  if (ingrediente) {
    texto = "Informe a quantidade em " + ingrediente.unidade + ".";
  }
  document.getElementById("compra-unidade").textContent = texto;
}

function mostrarCompras() {
  let linhas = "";
  for (const compra of ordenarPorData(dados.compras)) {
    const precoUnitario = compra.precoTotal / compra.quantidade;
    linhas += `
      <tr>
        <td>${formatarData(compra.data)}</td>
        <td><strong>${escaparHtml(compra.ingrediente)}</strong></td>
        <td>${formatarNumero(compra.quantidade)} ${escaparHtml(compra.unidade)}</td>
        <td>${formatarMoeda(compra.precoTotal)}</td>
        <td>${formatarPrecoUnitario(precoUnitario)} / ${escaparHtml(compra.unidade)}</td>
      </tr>`;
  }
  document.getElementById("tabela-compras").innerHTML = linhas || mostrarTabelaVazia(5, "Nenhuma compra registrada.");
}

function registrarCompra(evento) {
  evento.preventDefault();
  const ingrediente = buscarIngrediente(seletorIngredienteCompra.value);
  const quantidade = Number(document.getElementById("compra-quantidade").value);
  const precoTotal = Number(document.getElementById("compra-preco").value);
  const data = document.getElementById("compra-data").value;

  if (!ingrediente || !formularioCompra.reportValidity() || quantidade <= 0 || precoTotal <= 0) {
    mostrarMensagem("Escolha um ingrediente e informe quantidade, preço e data válidos.", true);
    return;
  }
  dados.compras.unshift({
    data: data,
    ingrediente: ingrediente.nome,
    quantidade: quantidade,
    unidade: ingrediente.unidade,
    precoTotal: precoTotal
  });
  ingrediente.estoque = Number((ingrediente.estoque + quantidade).toFixed(6));
  ingrediente.precoUnitario = precoTotal / quantidade;

  if (!salvarDados()) {
    return;
  }
  formularioCompra.reset();
  document.getElementById("compra-data").value = obterDataAtual();
  mostrarUnidadeCompra();
  mostrarCompras();
  mostrarMensagem("Compra registrada e estoque atualizado!");
}

preencherIngredientes(seletorIngredienteCompra);
document.getElementById("compra-data").value = obterDataAtual();
seletorIngredienteCompra.addEventListener("change", mostrarUnidadeCompra);
formularioCompra.addEventListener("submit", registrarCompra);
mostrarUnidadeCompra();
mostrarCompras();
