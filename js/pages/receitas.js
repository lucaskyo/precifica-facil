/* Tela receitas.html: busca, cartões, links para a ficha e exclusão. */
const listaReceitas = document.getElementById("lista-receitas");
const buscaReceita = document.getElementById("busca-receita");

function mostrarReceitas() {
  const busca = normalizarTexto(buscaReceita.value);
  let cartoes = "";
  for (const receita of dados.receitas) {
    if (!normalizarTexto(receita.nome).includes(busca)) {
      continue;
    }
    const indicadores = calcularIndicadoresReceita(receita);
    const identificador = encodeURIComponent(receita.id);
    const corLucro = indicadores.lucroPorUnidade < 0 ? "texto-vermelho" : "texto-verde";
    cartoes += `
      <article class="cartao receita-cartao">
        <div class="cabecalho-cartao">
          <h2>${escaparHtml(receita.nome)}</h2>
          <span class="selo ${indicadores.margem < 0 ? "selo-critico" : "selo-normal"}">${formatarPorcentagem(indicadores.margem)}</span>
        </div>
        <p class="texto-secundario">Rendimento: ${formatarNumero(receita.rendimento)} ${escaparHtml(receita.unidadeRendimento)}</p>
        <p class="linha-preco"><span>Custo total</span><strong>${formatarMoeda(receita.custoTotal)}</strong></p>
        <p class="linha-preco"><span>Custo por unidade</span><strong>${formatarMoeda(indicadores.custoPorUnidade)}</strong></p>
        <p class="linha-preco"><span>Preço de venda por unidade</span><strong>${formatarMoeda(receita.precoVenda)}</strong></p>
        <p class="linha-preco ${corLucro}"><span>Lucro por unidade</span><strong>${formatarMoeda(indicadores.lucroPorUnidade)}</strong></p>
        <p class="nota">Atualizada em ${formatarData(receita.dataAtualizacao)}</p>
        <div class="acoes">
          <a class="botao botao-contorno" href="nova-receita.html?id=${identificador}">Editar</a>
          <a class="botao botao-contorno" href="nova-receita.html?id=${identificador}&amp;modo=visualizar">Ver</a>
          <button type="button" class="botao botao-perigo" data-excluir-receita="${escaparHtml(receita.id)}">Excluir</button>
        </div>
      </article>`;
  }
  listaReceitas.innerHTML = cartoes || '<p class="estado-vazio">Nenhuma receita encontrada.</p>';
}

function excluirReceita(evento) {
  const botao = evento.target.closest("[data-excluir-receita]");
  if (!botao) {
    return;
  }
  const receita = buscarReceita(botao.dataset.excluirReceita);
  if (!receita || !window.confirm('Excluir a receita "' + receita.nome + '"? As vendas anteriores serão mantidas.')) {
    return;
  }
  dados.receitas = dados.receitas.filter(function (item) {
    return item.id !== receita.id;
  });
  if (salvarDados()) {
    mostrarReceitas();
    mostrarMensagem("Receita excluída.");
  }
}

buscaReceita.addEventListener("input", mostrarReceitas);
listaReceitas.addEventListener("click", excluirReceita);
mostrarReceitas();
