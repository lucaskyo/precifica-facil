/* Tela index.html: indicadores do mês atual e atividades registradas. */
function mostrarIndicadoresInicio() {
  const mesAtual = obterDataAtual().slice(0, 7);
  const vendasDoMes = dados.vendas.filter(function (venda) {
    return venda.data.startsWith(mesAtual);
  });
  const totais = somarVendas(vendasDoMes);
  document.getElementById("inicio-faturamento").textContent = formatarMoeda(totais.faturamento);
  document.getElementById("inicio-lucro").textContent = formatarMoeda(totais.lucro);
  document.getElementById("inicio-quantidade").textContent = formatarNumero(totais.quantidade);
  document.getElementById("inicio-receitas").textContent = dados.receitas.length;
}

function mostrarAlertasInicio() {
  const ingredientesEmAlerta = dados.ingredientes.filter(function (ingrediente) {
    return obterStatusEstoque(ingrediente) !== "normal";
  });
  ingredientesEmAlerta.sort(function (primeiro, segundo) {
    const prioridadePrimeiro = obterStatusEstoque(primeiro) === "critico" ? 0 : 1;
    const prioridadeSegundo = obterStatusEstoque(segundo) === "critico" ? 0 : 1;
    return prioridadePrimeiro - prioridadeSegundo;
  });
  let alertas = "";
  for (const ingrediente of ingredientesEmAlerta.slice(0, 3)) {
    alertas += `
      <div class="item-lista">
        <div><strong>${escaparHtml(ingrediente.nome)}</strong><p class="nota">Mínimo: ${formatarNumero(ingrediente.estoqueMinimo)} ${escaparHtml(ingrediente.unidade)}</p></div>
        <div><p>${formatarNumero(ingrediente.estoque)} ${escaparHtml(ingrediente.unidade)}</p>${criarSeloEstoque(ingrediente)}</div>
      </div>`;
  }
  document.getElementById("inicio-alertas").innerHTML = alertas || '<p class="estado-vazio">Nenhum alerta de estoque.</p>';
}

function mostrarAtividadesInicio() {
  const atividades = [];
  for (const compra of dados.compras) {
    atividades.push({ data: compra.data, texto: "Compra: " + compra.ingrediente + " — " + formatarNumero(compra.quantidade) + " " + compra.unidade });
  }
  for (const venda of dados.vendas) {
    atividades.push({ data: venda.data, texto: "Venda: " + venda.produto + " — " + formatarNumero(venda.quantidade) + " unidade(s)" });
  }
  for (const receita of dados.receitas) {
    atividades.push({ data: receita.dataAtualizacao, texto: "Receita atualizada: " + receita.nome });
  }
  for (const producao of dados.producoes) {
    atividades.push({ data: producao.data, texto: "Produção: " + producao.receita + " — " + producao.lotes + " lote(s)" });
  }
  let linhas = "";
  for (const atividade of ordenarPorData(atividades).slice(0, 5)) {
    linhas += `<div class="atividade"><p>${escaparHtml(atividade.texto)}</p><p class="nota">${formatarData(atividade.data)}</p></div>`;
  }
  document.getElementById("inicio-atividades").innerHTML = linhas || '<p class="estado-vazio">Nenhuma atividade registrada.</p>';
}

document.getElementById("data-atual").textContent = new Date().toLocaleDateString("pt-BR", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});
mostrarIndicadoresInicio();
mostrarAlertasInicio();
mostrarAtividadesInicio();
