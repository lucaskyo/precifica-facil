/*
 * Tema visual compartilhado. O atributo é aplicado antes da renderização
 * quando existe uma preferência salva ou definida pelo sistema.
 */

(function () {
  const chaveTema = "precifica-facil-tema";
  let temaSalvo = null;
  try {
    temaSalvo = localStorage.getItem(chaveTema);
  } catch (erro) {
    console.warn("Não foi possível ler a preferência de tema.", erro);
  }
  if (temaSalvo !== "claro" && temaSalvo !== "escuro") {
    temaSalvo = null;
  }
  const temaInicial = temaSalvo || (
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "escuro"
      : "claro"
  );

  document.documentElement.dataset.tema = temaInicial;

  function atualizarAlternador() {
    const temaEscuro = document.documentElement.dataset.tema === "escuro";
    const alternador = document.querySelector("[data-alternar-tema]");
    if (!alternador) {
      return;
    }

    alternador.setAttribute("aria-pressed", String(temaEscuro));
    alternador.setAttribute(
      "aria-label",
      temaEscuro ? "Modo escuro ativado" : "Modo claro ativado"
    );
    const texto = alternador.querySelector("[data-tema-label]");
    if (texto) {
      texto.textContent = temaEscuro ? "Modo escuro" : "Modo claro";
    }
  }

  function alternarTema() {
    const proximoTema = document.documentElement.dataset.tema === "escuro"
      ? "claro"
      : "escuro";
    document.documentElement.dataset.tema = proximoTema;
    try {
      localStorage.setItem(chaveTema, proximoTema);
    } catch (erro) {
      console.warn("Não foi possível salvar a preferência de tema.", erro);
    }
    atualizarAlternador();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const alternador = document.querySelector("[data-alternar-tema]");
    if (alternador) {
      alternador.addEventListener("click", alternarTema);
      atualizarAlternador();
    }
  });
})();
