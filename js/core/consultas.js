/*
 * Consultas e preenchimento de controles com dados compartilhados.
 */

function buscarIngrediente(identificador) {
  return dados.ingredientes.find(function (ingrediente) {
    return ingrediente.id === identificador;
  });
}

function buscarReceita(identificador) {
  return dados.receitas.find(function (receita) {
    return receita.id === identificador;
  });
}

function preencherIngredientes(seletor) {
  seletor.innerHTML = "";
  for (const ingrediente of dados.ingredientes) {
    const texto = ingrediente.nome + " (" + ingrediente.unidade + ")";
    seletor.add(new Option(texto, ingrediente.id));
  }
  if (dados.ingredientes.length === 0) {
    seletor.add(new Option("Cadastre um ingrediente primeiro", ""));
  }
}

function preencherReceitas(seletor) {
  seletor.innerHTML = "";
  for (const receita of dados.receitas) {
    seletor.add(new Option(receita.nome, receita.id));
  }
  if (dados.receitas.length === 0) {
    seletor.add(new Option("Cadastre uma receita primeiro", ""));
  }
}

function ordenarPorData(lista) {
  return lista.slice().sort(function (primeiro, segundo) {
    return segundo.data.localeCompare(primeiro.data);
  });
}
