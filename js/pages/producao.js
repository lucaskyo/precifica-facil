/* Tela producao.html: verifica o estoque antes de descontar os ingredientes. */
const formularioProducao = document.getElementById("formulario-producao");
const seletorReceitaProducao = document.getElementById("producao-receita");
const campoLotes = document.getElementById("producao-lotes");
const botaoRegistrarProducao = document.getElementById("registrar-producao");

function mostrarProducao() {
  const receita = buscarReceita(seletorReceitaProducao.value);
  const lotes = Number(campoLotes.value);
  const resultado = calcularNecessidadesProducao(receita, lotes);
  const aviso = document.getElementById("producao-aviso");
  botaoRegistrarProducao.disabled = !resultado.valido || !resultado.suficiente;
  aviso.classList.toggle("aviso-erro", !resultado.valido || !resultado.suficiente);

  if (!resultado.valido) {
    aviso.textContent = "Escolha uma receita com ingredientes e informe um número inteiro de lotes maior que zero.";
    document.getElementById("tabela-producao").innerHTML = mostrarTabelaVazia(4, "Nenhuma produção calculada.");
    return resultado;
  }
  let linhas = "";
  for (const item of resultado.itens) {
    const ingrediente = item.ingrediente;
    linhas += `
      <tr>
        <td><strong>${escaparHtml(ingrediente.nome)}</strong></td>
        <td>${formatarNumero(item.quantidade)} ${escaparHtml(ingrediente.unidade)}</td>
        <td>${formatarNumero(ingrediente.estoque)} ${escaparHtml(ingrediente.unidade)}</td>
        <td><span class="selo ${item.suficiente ? "selo-normal" : "selo-critico"}">${item.suficiente ? "Suficiente" : "Insuficiente"}</span></td>
      </tr>`;
  }
  document.getElementById("tabela-producao").innerHTML = linhas;
  if (resultado.suficiente) {
    aviso.textContent = "Estoque suficiente para " + lotes + " lote(s), com rendimento de " + formatarNumero(receita.rendimento * lotes) + " " + receita.unidadeRendimento + ".";
  } else {
    aviso.textContent = "Estoque insuficiente. Reponha os ingredientes indicados abaixo.";
  }
  return resultado;
}

function registrarProducao() {
  // Recalcula ao clicar: não usa um resultado antigo se o número de lotes mudar.
  const resultado = mostrarProducao();
  if (!formularioProducao.reportValidity() || !resultado.valido || !resultado.suficiente) {
    mostrarMensagem("Confira a quantidade de lotes e o estoque disponível.", true);
    return;
  }
  const receita = buscarReceita(seletorReceitaProducao.value);
  const lotes = Number(campoLotes.value);

  for (const item of resultado.itens) {
    const restante = item.ingrediente.estoque - item.quantidade;
    item.ingrediente.estoque = Math.max(0, Number(restante.toFixed(6)));
  }
  dados.producoes.unshift({
    data: obterDataAtual(),
    receita: receita.nome,
    lotes: lotes,
    quantidadeProduzida: receita.rendimento * lotes
  });
  if (salvarDados()) {
    mostrarProducao();
    mostrarMensagem("Produção registrada e ingredientes descontados do estoque!");
  }
}

preencherReceitas(seletorReceitaProducao);
seletorReceitaProducao.addEventListener("change", mostrarProducao);
campoLotes.addEventListener("input", mostrarProducao);
formularioProducao.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mostrarProducao();
});
botaoRegistrarProducao.addEventListener("click", registrarProducao);
mostrarProducao();
