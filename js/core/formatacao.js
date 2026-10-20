/*
 * Funções de apresentação e utilitários compartilhados.
 */

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarPrecoUnitario(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
}

function formatarNumero(valor) {
  return Number(valor).toLocaleString("pt-BR", { maximumFractionDigits: 3 });
}

function formatarPorcentagem(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + "%";
}

function formatarData(data) {
  const partes = data.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function obterDataAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

function arredondarDinheiro(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

function gerarIdentificador() {
  return "item-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function escaparHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mostrarTabelaVazia(totalColunas, mensagem) {
  return `<tr><td colspan="${totalColunas}" class="estado-vazio">${escaparHtml(mensagem)}</td></tr>`;
}
