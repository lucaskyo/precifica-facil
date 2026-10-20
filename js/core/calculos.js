/*
 * Regras de cálculo usadas por mais de uma tela.
 */

function obterStatusEstoque(ingrediente) {
  if (ingrediente.estoque === 0 || ingrediente.estoque < ingrediente.estoqueMinimo) {
    return "critico";
  }
  if (ingrediente.estoque < ingrediente.estoqueMinimo * 1.5) {
    return "baixo";
  }
  return "normal";
}

function criarSeloEstoque(ingrediente) {
  const status = obterStatusEstoque(ingrediente);
  const rotulos = { critico: "Crítico", baixo: "Baixo", normal: "Normal" };
  return `<span class="selo selo-${status}">${rotulos[status]}</span>`;
}

function calcularCustoIngredientes(itens) {
  let custoTotal = 0;
  for (const item of itens) {
    const ingrediente = buscarIngrediente(item.ingredienteId);
    if (ingrediente) {
      custoTotal += ingrediente.precoUnitario * item.quantidade;
    }
  }
  return custoTotal;
}

function calcularIndicadoresReceita(receita) {
  let custoPorUnidade = 0;
  if (receita.rendimento > 0) {
    custoPorUnidade = receita.custoTotal / receita.rendimento;
  }
  const lucroPorUnidade = receita.precoVenda - custoPorUnidade;
  let margem = 0;
  if (receita.precoVenda > 0) {
    margem = (lucroPorUnidade / receita.precoVenda) * 100;
  }
  return { custoPorUnidade, lucroPorUnidade, margem };
}

function somarVendas(vendas) {
  const totais = { quantidade: 0, faturamento: 0, custo: 0, lucro: 0, margem: 0 };
  for (const venda of vendas) {
    totais.quantidade += venda.quantidade;
    totais.faturamento += venda.total;
    totais.custo += venda.custo;
    totais.lucro += venda.lucro;
  }
  if (totais.faturamento > 0) {
    totais.margem = (totais.lucro / totais.faturamento) * 100;
  }
  return totais;
}

function agruparIngredientes(itens) {
  const agrupados = [];
  for (const item of itens) {
    const existente = agrupados.find(function (grupo) {
      return grupo.ingredienteId === item.ingredienteId;
    });
    if (existente) {
      existente.quantidade += item.quantidade;
    } else {
      agrupados.push({ ingredienteId: item.ingredienteId, quantidade: item.quantidade });
    }
  }
  return agrupados;
}

function calcularNecessidadesProducao(receita, lotes) {
  if (!receita || !Number.isInteger(lotes) || lotes <= 0 || receita.ingredientes.length === 0) {
    return { valido: false, suficiente: false, itens: [] };
  }
  const resultado = { valido: true, suficiente: true, itens: [] };
  for (const item of agruparIngredientes(receita.ingredientes)) {
    const ingrediente = buscarIngrediente(item.ingredienteId);
    const quantidade = item.quantidade * lotes;
    if (!ingrediente || !Number.isFinite(quantidade) || quantidade <= 0) {
      return { valido: false, suficiente: false, itens: [] };
    }
    const suficiente = ingrediente.estoque + 0.000000001 >= quantidade;
    if (!suficiente) {
      resultado.suficiente = false;
    }
    resultado.itens.push({ ingrediente, quantidade, suficiente });
  }
  return resultado;
}
