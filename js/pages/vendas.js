/* Tela vendas.html: registra valores da venda sem modificar vendas anteriores. */
const formularioVenda = document.getElementById("formulario-venda");
const seletorReceitaVenda = document.getElementById("venda-receita");

function preencherPrecoVenda() {
  const receita = buscarReceita(seletorReceitaVenda.value);
  document.getElementById("venda-preco").value = receita ? receita.precoVenda : "";
}

function mostrarVendas() {
  let linhas = "";
  const ultimasVendas = ordenarPorData(dados.vendas).slice(0, 6);
  for (const venda of ultimasVendas) {
    linhas += `
      <tr>
        <td>${formatarData(venda.data)}</td>
        <td><strong>${escaparHtml(venda.produto)}</strong></td>
        <td>${formatarNumero(venda.quantidade)}</td>
        <td>${formatarMoeda(venda.precoUnitario)}</td>
        <td>${formatarMoeda(venda.total)}</td>
        <td class="${venda.lucro < 0 ? "texto-vermelho" : "texto-verde"}">${formatarMoeda(venda.lucro)}</td>
      </tr>`;
  }
  document.getElementById("tabela-vendas").innerHTML = linhas || mostrarTabelaVazia(6, "Nenhuma venda registrada.");

  const hoje = obterDataAtual();
  const vendasHoje = dados.vendas.filter(function (venda) { return venda.data === hoje; });
  const totais = somarVendas(vendasHoje);
  // Sem vendas hoje, os indicadores mostram zero; não usam números fictícios.
  document.getElementById("vendas-faturamento").textContent = formatarMoeda(totais.faturamento);
  document.getElementById("vendas-custo").textContent = formatarMoeda(totais.custo);
  document.getElementById("vendas-lucro").textContent = formatarMoeda(totais.lucro);
  document.getElementById("vendas-margem").textContent = formatarPorcentagem(totais.margem);
}

function registrarVenda(evento) {
  evento.preventDefault();
  const receita = buscarReceita(seletorReceitaVenda.value);
  const quantidade = Number(document.getElementById("venda-quantidade").value);
  const precoUnitario = Number(document.getElementById("venda-preco").value);
  const data = document.getElementById("venda-data").value;
  if (!receita || !formularioVenda.reportValidity() || !Number.isInteger(quantidade) || quantidade <= 0 || precoUnitario <= 0) {
    mostrarMensagem("Escolha a receita e informe quantidade, preço e data válidos.", true);
    return;
  }
  const indicadores = calcularIndicadoresReceita(receita);
  const total = arredondarDinheiro(quantidade * precoUnitario);
  const custo = arredondarDinheiro(quantidade * indicadores.custoPorUnidade);
  if (!Number.isFinite(total) || !Number.isFinite(custo)) {
    mostrarMensagem("Os valores informados são muito grandes. Confira a venda.", true);
    return;
  }
  dados.vendas.unshift({
    data: data,
    produto: receita.nome,
    quantidade: quantidade,
    precoUnitario: precoUnitario,
    total: total,
    custo: custo,
    lucro: arredondarDinheiro(total - custo)
  });
  // O desconto de ingredientes acontece na Produção, evitando descontar duas vezes.
  if (salvarDados()) {
    formularioVenda.reset();
    document.getElementById("venda-data").value = obterDataAtual();
    preencherPrecoVenda();
    mostrarVendas();
    mostrarMensagem("Venda registrada com sucesso!");
  }
}

function prepararCelulaCsv(valor, protegerFormula = true) {
  let texto = String(valor);
  // Nomes que começam com sinais de fórmula devem continuar sendo texto no Excel.
  if (protegerFormula && typeof valor === "string" && /^[\s]*[=+@-]/.test(texto)) {
    texto = "'" + texto;
  }
  return '"' + texto.replaceAll('"', '""') + '"';
}

function exportarVendas() {
  const linhas = [["Data", "Produto", "Quantidade", "Preço unitário", "Total", "Custo", "Lucro estimado"]];
  for (const venda of ordenarPorData(dados.vendas)) {
    linhas.push([
      formatarData(venda.data), venda.produto, venda.quantidade,
      venda.precoUnitario.toFixed(2).replace(".", ","),
      venda.total.toFixed(2).replace(".", ","),
      venda.custo.toFixed(2).replace(".", ","),
      venda.lucro.toFixed(2).replace(".", ",")
    ]);
  }
  const textoCsv = linhas.map(function (linha) {
    return linha.map(function (valor, indice) {
      return prepararCelulaCsv(valor, indice === 1);
    }).join(";");
  }).join("\r\n");
  // A marca UTF-8 preserva acentos ao abrir o arquivo em uma planilha.
  const arquivo = new Blob(["\uFEFF" + textoCsv], { type: "text/csv;charset=utf-8;" });
  const endereco = URL.createObjectURL(arquivo);
  const link = document.createElement("a");
  link.href = endereco;
  link.download = "relatorio-vendas.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(function () { URL.revokeObjectURL(endereco); }, 1000);
  mostrarMensagem("Relatório exportado!");
}

preencherReceitas(seletorReceitaVenda);
preencherPrecoVenda();
document.getElementById("venda-data").value = obterDataAtual();
seletorReceitaVenda.addEventListener("change", preencherPrecoVenda);
formularioVenda.addEventListener("submit", registrarVenda);
document.getElementById("exportar-vendas").addEventListener("click", exportarVendas);
mostrarVendas();
