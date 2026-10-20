/* Tela resumo.html: os cartões, o gráfico e o ranking usam o mesmo mês. */
const seletorMesResumo = document.getElementById("resumo-mes");

function preencherMesesResumo() {
  const mesAtual = obterDataAtual().slice(0, 7);
  const meses = [mesAtual];
  for (const venda of dados.vendas) {
    const mes = venda.data.slice(0, 7);
    if (!meses.includes(mes)) {
      meses.push(mes);
    }
  }
  meses.sort().reverse();
  for (const mes of meses) {
    const partes = mes.split("-");
    const data = new Date(Number(partes[0]), Number(partes[1]) - 1, 1);
    const rotulo = data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    seletorMesResumo.add(new Option(rotulo, mes));
  }
  seletorMesResumo.value = mesAtual;
}

function mostrarGraficoSemanas(vendasDoMes) {
  const partes = seletorMesResumo.value.split("-");
  const diasNoMes = new Date(Number(partes[0]), Number(partes[1]), 0).getDate();
  const semanas = [];
  // Neste gráfico, cada semana é um intervalo de sete dias a partir do dia 1.
  for (let inicio = 1; inicio <= diasNoMes; inicio += 7) {
    semanas.push({ inicio: inicio, fim: Math.min(inicio + 6, diasNoMes), faturamento: 0, custo: 0 });
  }
  for (const venda of vendasDoMes) {
    const dia = Number(venda.data.slice(8, 10));
    const indiceSemana = Math.floor((dia - 1) / 7);
    semanas[indiceSemana].faturamento += venda.total;
    semanas[indiceSemana].custo += venda.custo;
  }
  let maiorValor = 1; // Evita um máximo igual a zero quando não há vendas.
  for (const semana of semanas) {
    maiorValor = Math.max(maiorValor, semana.faturamento, semana.custo);
  }
  let grafico = "";
  for (let indice = 0; indice < semanas.length; indice++) {
    const semana = semanas[indice];
    grafico += `
      <div class="grupo-grafico">
        <h3>Semana ${indice + 1} <span class="texto-secundario">(dias ${semana.inicio}–${semana.fim})</span></h3>
        <div class="linha-grafico">
          <progress class="barra-faturamento" max="${maiorValor}" value="${semana.faturamento}" aria-label="Faturamento da semana ${indice + 1}"></progress>
          <span>${formatarMoeda(semana.faturamento)}</span>
        </div>
        <div class="linha-grafico">
          <progress class="barra-custo" max="${maiorValor}" value="${semana.custo}" aria-label="Custo da semana ${indice + 1}"></progress>
          <span>${formatarMoeda(semana.custo)}</span>
        </div>
      </div>`;
  }
  document.getElementById("grafico-semanas").innerHTML = grafico;
}

function mostrarRankingProdutos(vendasDoMes) {
  const produtos = [];
  for (const venda of vendasDoMes) {
    let produto = produtos.find(function (item) { return item.nome === venda.produto; });
    if (!produto) {
      produto = { nome: venda.produto, quantidade: 0, faturamento: 0 };
      produtos.push(produto);
    }
    produto.quantidade += venda.quantidade;
    produto.faturamento += venda.total;
  }
  produtos.sort(function (primeiro, segundo) { return segundo.quantidade - primeiro.quantidade; });
  let linhas = "";
  for (let indice = 0; indice < Math.min(5, produtos.length); indice++) {
    const produto = produtos[indice];
    linhas += `
      <div class="item-lista">
        <span class="posicao-ranking">${indice + 1}</span>
        <div class="ranking-produto"><strong>${escaparHtml(produto.nome)}</strong><p class="nota">${formatarNumero(produto.quantidade)} unidade(s) vendida(s)</p></div>
        <strong>${formatarMoeda(produto.faturamento)}</strong>
      </div>`;
  }
  document.getElementById("ranking-produtos").innerHTML = linhas || '<p class="estado-vazio">Nenhuma venda registrada neste mês.</p>';
}

function mostrarResumoMensal() {
  const vendasDoMes = dados.vendas.filter(function (venda) {
    return venda.data.startsWith(seletorMesResumo.value);
  });
  const totais = somarVendas(vendasDoMes);
  document.getElementById("resumo-faturamento").textContent = formatarMoeda(totais.faturamento);
  document.getElementById("resumo-custo").textContent = formatarMoeda(totais.custo);
  document.getElementById("resumo-lucro").textContent = formatarMoeda(totais.lucro);
  document.getElementById("resumo-quantidade").textContent = formatarNumero(totais.quantidade);
  mostrarGraficoSemanas(vendasDoMes);
  mostrarRankingProdutos(vendasDoMes);
}

preencherMesesResumo();
seletorMesResumo.addEventListener("change", mostrarResumoMensal);
mostrarResumoMensal();
