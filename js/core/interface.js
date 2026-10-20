/*
 * Mensagens, modais e comportamento compartilhado da interface.
 */

let temporizadorMensagem;

function mostrarMensagem(texto, erro = false) {
  const mensagem = document.getElementById("mensagem");
  const janelaAberta = document.querySelector("dialog[open]");
  const destino = janelaAberta || document.body;
  destino.appendChild(mensagem);
  mensagem.textContent = texto;
  mensagem.classList.toggle("mensagem-erro", erro);
  mensagem.setAttribute("role", erro ? "alert" : "status");
  mensagem.hidden = false;
  clearTimeout(temporizadorMensagem);
  if (!erro) {
    temporizadorMensagem = setTimeout(function () {
      mensagem.hidden = true;
    }, 4000);
  }
}

for (const botao of document.querySelectorAll("[data-fechar-modal]")) {
  botao.addEventListener("click", function () {
    botao.closest("dialog").close();
  });
}

if (erroAoCarregarDados) {
  mostrarMensagem(erroAoCarregarDados, true);
}

window.addEventListener("pageshow", function (evento) {
  if (evento.persisted) {
    window.location.reload();
  }
});
