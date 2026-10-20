/* Tela historico.html: filtros, totais e paginação da lista de vendas. */
const VENDAS_POR_PAGINA = 8;
let paginaAtual = 1;
let vendasFiltradas = [];
const seletorProdutoHistorico = document.getElementById("historico-produto");

function preencherProdutosHistorico() {
  const nomes = [];
  for (const venda of dados.vendas) {
    if (!nomes.includes(venda.produto)) {
      nomes.push(venda.produto);
    }
  }
  seletorProdutoHistorico.add(new Option("Todos os produtos", ""));
  for (const nome of nomes.sort()) {
    seletorProdutoHistorico.add(new Option(nome, nome));
  }
}

function aplicarFiltros() {
  const inicio = document.getElementById("historico-inicio").value;
  const fim = document.getElementById("historico-fim").value;
  const produto = seletorProdutoHistorico.value;
  if (inicio && fim && inicio > fim) {
    mostrarMensagem("A data inicial deve ser anterior ou igual à data final.", true);
    return;
  }
  vendasFiltradas = ordenarPorData(dados.vendas).filter(function (venda) {
    if (inicio && venda.data < inicio) { return false; }
    if (fim && venda.data > fim) { return false; }
    if (produto && venda.produto !== produto) { return false; }
    return true;
  });
  paginaAtual = 1;
  mostrarHistorico();
}

function mostrarHistorico() {
  const inicio = (paginaAtual - 1) * VENDAS_POR_PAGINA;
  const vendasPagina = vendasFiltradas.slice(inicio, inicio + VENDAS_POR_PAGINA);
  let linhas = "";
  for (const venda of vendasPagina) {
    linhas += `
      <tr>
        <td>${formatarData(venda.data)}</td>
        <td><strong>${escaparHtml(venda.produto)}</strong></td>
        <td>${formatarNumero(venda.quantidade)}</td>
        <td>${formatarMoeda(venda.precoUnitario)}</td>
        <td>${formatarMoeda(venda.total)}</td>
        <td>${formatarMoeda(venda.custo)}</td>
        <td class="${venda.lucro < 0 ? "texto-vermelho" : "texto-verde"}">${formatarMoeda(venda.lucro)}</td>
      </tr>`;
  }
  document.getElementById("tabela-historico").innerHTML = linhas || mostrarTabelaVazia(7, "Nenhuma venda encontrada para esse filtro.");

  // Os totais consideram todas as páginas do filtro, não só as oito linhas visíveis.
  const totais = somarVendas(vendasFiltradas);
  document.getElementById("historico-quantidade").textContent = formatarNumero(totais.quantidade);
  document.getElementById("historico-receita").textContent = formatarMoeda(totais.faturamento);
  document.getElementById("historico-custo").textContent = formatarMoeda(totais.custo);
  document.getElementById("historico-lucro").textContent = formatarMoeda(totais.lucro);

  const totalPaginas = Math.max(1, Math.ceil(vendasFiltradas.length / VENDAS_POR_PAGINA));
  const primeiraLinha = vendasFiltradas.length === 0 ? 0 : inicio + 1;
  const ultimaLinha = inicio + vendasPagina.length;
  document.getElementById("historico-contagem").textContent = "Exibindo " + primeiraLinha + "–" + ultimaLinha + " de " + vendasFiltradas.length + " vendas";
  document.getElementById("pagina-atual").textContent = paginaAtual + " / " + totalPaginas;
  document.getElementById("pagina-anterior").disabled = paginaAtual === 1;
  document.getElementById("proxima-pagina").disabled = paginaAtual === totalPaginas;
}

document.getElementById("formulario-filtros").addEventListener("submit", function (evento) {
  evento.preventDefault();
  aplicarFiltros();
});
document.getElementById("pagina-anterior").addEventListener("click", function () {
  if (paginaAtual > 1) {
    paginaAtual--;
    mostrarHistorico();
  }
});
document.getElementById("proxima-pagina").addEventListener("click", function () {
  if (paginaAtual * VENDAS_POR_PAGINA < vendasFiltradas.length) {
    paginaAtual++;
    mostrarHistorico();
  }
});
preencherProdutosHistorico();
aplicarFiltros();
