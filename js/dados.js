/*
 * Dados e armazenamento do protótipo.
 * localStorage guarda textos no navegador. JSON.stringify transforma o objeto
 * em texto; JSON.parse transforma o texto de volta em um objeto JavaScript.
 * A mesma chave permite compartilhar os cadastros entre todas as páginas.
 */
const CHAVE_DADOS = "precificaFacil.dados.v1";
let erroAoCarregarDados = "";
let conteudoArmazenadoAnterior = null;

function criarDadosIniciais() {
  // Exemplos de 2024 trazidos dos arquivos enviados. Não são registros atuais.
  // Os preços e custos demonstrativos foram mantidos; confira-os antes de usar.
  return {
    "ingredientes": [
      {
        "id": "farinha",
        "nome": "Farinha de Trigo",
        "marca": "Dona Benta",
        "unidade": "kg",
        "estoque": 1.2,
        "estoqueMinimo": 2,
        "precoUnitario": 6.5
      },
      {
        "id": "acucar",
        "nome": "Açúcar Refinado",
        "marca": "Caravelas",
        "unidade": "kg",
        "estoque": 12,
        "estoqueMinimo": 5,
        "precoUnitario": 4.2
      },
      {
        "id": "ovos",
        "nome": "Ovos",
        "marca": "Granja Mantiqueira",
        "unidade": "dúzia",
        "estoque": 4,
        "estoqueMinimo": 2,
        "precoUnitario": 9.8
      },
      {
        "id": "manteiga",
        "nome": "Manteiga",
        "marca": "President",
        "unidade": "g",
        "estoque": 500,
        "estoqueMinimo": 600,
        "precoUnitario": 14.9
      },
      {
        "id": "leitecond",
        "nome": "Leite Condensado",
        "marca": "Moça",
        "unidade": "un",
        "estoque": 2,
        "estoqueMinimo": 10,
        "precoUnitario": 7.2
      },
      {
        "id": "chocopo",
        "nome": "Chocolate em Pó",
        "marca": "Nestlé",
        "unidade": "g",
        "estoque": 300,
        "estoqueMinimo": 2000,
        "precoUnitario": 18.5
      },
      {
        "id": "cremeleite",
        "nome": "Creme de Leite",
        "marca": "Nestlé",
        "unidade": "un",
        "estoque": 15,
        "estoqueMinimo": 8,
        "precoUnitario": 3.8
      },
      {
        "id": "fermento",
        "nome": "Fermento Químico",
        "marca": "Royal",
        "unidade": "g",
        "estoque": 250,
        "estoqueMinimo": 150,
        "precoUnitario": 5.9
      },
      {
        "id": "baunilha",
        "nome": "Essência de Baunilha",
        "marca": "Dr. Oetker",
        "unidade": "ml",
        "estoque": 100,
        "estoqueMinimo": 120,
        "precoUnitario": 12
      },
      {
        "id": "granulado",
        "nome": "Granulado Chocolate",
        "marca": "Mavalério",
        "unidade": "kg",
        "estoque": 1.5,
        "estoqueMinimo": 1,
        "precoUnitario": 22.9
      },
      {
        "id": "manteigasemsal",
        "nome": "Manteiga sem Sal",
        "marca": "Itambé",
        "unidade": "g",
        "estoque": 500,
        "estoqueMinimo": 400,
        "precoUnitario": 15.9
      },
      {
        "id": "extra-0",
        "nome": "Açúcar de Confeiteiro",
        "marca": "Glaçúcar",
        "unidade": "kg",
        "estoque": 8.5,
        "estoqueMinimo": 4.25,
        "precoUnitario": 8.9
      },
      {
        "id": "extra-1",
        "nome": "Cacau em Pó 100%",
        "marca": "Sicao",
        "unidade": "kg",
        "estoque": 1.2,
        "estoqueMinimo": 1.0,
        "precoUnitario": 42
      },
      {
        "id": "extra-2",
        "nome": "Pasta Americana",
        "marca": "Arcólor",
        "unidade": "kg",
        "estoque": 3.0,
        "estoqueMinimo": 1.5,
        "precoUnitario": 24.5
      },
      {
        "id": "extra-3",
        "nome": "Embalagem Pote 250ml",
        "marca": "Galvanotex",
        "unidade": "un",
        "estoque": 200.0,
        "estoqueMinimo": 100.0,
        "precoUnitario": 0.85
      }
    ],
    "receitas": [
      {
        "id": "bolo-choc",
        "nome": "Bolo de Chocolate",
        "rendimento": 20,
        "unidadeRendimento": "fatias",
        "custoTotal": 28.4,
        "precoVenda": 5,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "farinha",
            "quantidade": 0.4
          },
          {
            "ingredienteId": "chocopo",
            "quantidade": 150
          },
          {
            "ingredienteId": "acucar",
            "quantidade": 0.3
          },
          {
            "ingredienteId": "fermento",
            "quantidade": 15
          }
        ]
      },
      {
        "id": "brigadeiro",
        "nome": "Brigadeiro Gourmet",
        "rendimento": 50,
        "unidadeRendimento": "unidades",
        "custoTotal": 35,
        "precoVenda": 2.5,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "farinha",
            "quantidade": 0.5
          },
          {
            "ingredienteId": "chocopo",
            "quantidade": 200
          },
          {
            "ingredienteId": "leitecond",
            "quantidade": 1
          },
          {
            "ingredienteId": "manteigasemsal",
            "quantidade": 50
          }
        ]
      },
      {
        "id": "torta-limao",
        "nome": "Torta de Limão",
        "rendimento": 12,
        "unidadeRendimento": "fatias",
        "custoTotal": 22.5,
        "precoVenda": 6,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "leitecond",
            "quantidade": 1
          },
          {
            "ingredienteId": "manteigasemsal",
            "quantidade": 80
          },
          {
            "ingredienteId": "ovos",
            "quantidade": 0.25
          }
        ]
      },
      {
        "id": "cupcake-rv",
        "nome": "Cupcake Red Velvet",
        "rendimento": 12,
        "unidadeRendimento": "unidades",
        "custoTotal": 32.8,
        "precoVenda": 8,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "farinha",
            "quantidade": 0.3
          },
          {
            "ingredienteId": "cremeleite",
            "quantidade": 1
          },
          {
            "ingredienteId": "baunilha",
            "quantidade": 10
          }
        ]
      },
      {
        "id": "pao-mel",
        "nome": "Pão de Mel",
        "rendimento": 15,
        "unidadeRendimento": "unidades",
        "custoTotal": 18.2,
        "precoVenda": 4.5,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "farinha",
            "quantidade": 0.35
          },
          {
            "ingredienteId": "chocopo",
            "quantidade": 100
          },
          {
            "ingredienteId": "fermento",
            "quantidade": 10
          }
        ]
      },
      {
        "id": "brownie",
        "nome": "Brownie Tradicional",
        "rendimento": 16,
        "unidadeRendimento": "fatias",
        "custoTotal": 24,
        "precoVenda": 5.5,
        "dataAtualizacao": "2024-10-20",
        "ingredientes": [
          {
            "ingredienteId": "chocopo",
            "quantidade": 250
          },
          {
            "ingredienteId": "manteigasemsal",
            "quantidade": 120
          },
          {
            "ingredienteId": "ovos",
            "quantidade": 0.3
          }
        ]
      }
    ],
    "compras": [
      {
        "data": "2024-10-24",
        "ingrediente": "Leite Condensado",
        "quantidade": 12,
        "unidade": "un",
        "precoTotal": 86.4
      },
      {
        "data": "2024-10-23",
        "ingrediente": "Farinha de Trigo",
        "quantidade": 10,
        "unidade": "kg",
        "precoTotal": 65
      },
      {
        "data": "2024-10-20",
        "ingrediente": "Ovos",
        "quantidade": 6,
        "unidade": "dz",
        "precoTotal": 58.8
      },
      {
        "data": "2024-10-18",
        "ingrediente": "Chocolate em Pó",
        "quantidade": 2,
        "unidade": "kg",
        "precoTotal": 37
      },
      {
        "data": "2024-10-15",
        "ingrediente": "Manteiga",
        "quantidade": 4,
        "unidade": "un",
        "precoTotal": 59.6
      },
      {
        "data": "2024-10-10",
        "ingrediente": "Açúcar Refinado",
        "quantidade": 15,
        "unidade": "kg",
        "precoTotal": 63
      }
    ],
    "vendas": [
      {
        "data": "2024-10-24",
        "produto": "Bolo de Chocolate",
        "quantidade": 2,
        "precoUnitario": 50,
        "total": 100,
        "custo": 28.4,
        "lucro": 71.6
      },
      {
        "data": "2024-10-24",
        "produto": "Brigadeiro Gourmet",
        "quantidade": 30,
        "precoUnitario": 2.5,
        "total": 75,
        "custo": 21,
        "lucro": 54
      },
      {
        "data": "2024-10-23",
        "produto": "Torta de Limão",
        "quantidade": 1,
        "precoUnitario": 60,
        "total": 60,
        "custo": 22.5,
        "lucro": 37.5
      },
      {
        "data": "2024-10-22",
        "produto": "Cupcake Red Velvet",
        "quantidade": 10,
        "precoUnitario": 8,
        "total": 80,
        "custo": 27.3,
        "lucro": 52.7
      },
      {
        "data": "2024-10-21",
        "produto": "Pão de Mel",
        "quantidade": 15,
        "precoUnitario": 4.5,
        "total": 67.5,
        "custo": 18.2,
        "lucro": 49.3
      },
      {
        "data": "2024-10-20",
        "produto": "Brownie Tradicional",
        "quantidade": 10,
        "precoUnitario": 5.5,
        "total": 55,
        "custo": 15,
        "lucro": 40
      },
      {
        "data": "2024-10-19",
        "produto": "Brigadeiro Gourmet",
        "quantidade": 100,
        "precoUnitario": 2.5,
        "total": 250,
        "custo": 70,
        "lucro": 180
      },
      {
        "data": "2024-10-18",
        "produto": "Bolo de Chocolate",
        "quantidade": 1,
        "precoUnitario": 50,
        "total": 50,
        "custo": 14.2,
        "lucro": 35.8
      },
      {
        "data": "2024-10-17",
        "produto": "Torta de Limão",
        "quantidade": 2,
        "precoUnitario": 60,
        "total": 120,
        "custo": 45,
        "lucro": 75
      },
      {
        "data": "2024-10-16",
        "produto": "Cupcake Red Velvet",
        "quantidade": 8,
        "precoUnitario": 8,
        "total": 64,
        "custo": 21.84,
        "lucro": 42.16
      },
      {
        "data": "2024-10-15",
        "produto": "Pão de Mel",
        "quantidade": 30,
        "precoUnitario": 4.5,
        "total": 135,
        "custo": 36.3,
        "lucro": 98.7
      },
      {
        "data": "2024-10-14",
        "produto": "Brownie Tradicional",
        "quantidade": 12,
        "precoUnitario": 5.5,
        "total": 66,
        "custo": 18,
        "lucro": 48
      }
    ],
    "producoes": []
  };
}

function carregarDados() {
  try {
    const textoSalvo = localStorage.getItem(CHAVE_DADOS);
    conteudoArmazenadoAnterior = textoSalvo;
    if (textoSalvo === null) {
      return criarDadosIniciais();
    }
    const dadosSalvos = JSON.parse(textoSalvo);
    const listas = ["ingredientes", "receitas", "compras", "vendas", "producoes"];
    for (const nome of listas) {
      if (!dadosSalvos || !Array.isArray(dadosSalvos[nome])) {
        throw new Error("Formato dos dados inválido.");
      }
    }
    return dadosSalvos;
  } catch (erro) {
    // Não sobrescreve dados que não conseguimos ler.
    erroAoCarregarDados = "Não foi possível ler os dados. Verifique o armazenamento do navegador e recarregue a página.";
    return { ingredientes: [], receitas: [], compras: [], vendas: [], producoes: [] };
  }
}

let dados = carregarDados();
let ultimaVersaoDados = JSON.stringify(dados);

function salvarDados() {
  try {
    if (erroAoCarregarDados) {
      throw new Error(erroAoCarregarDados);
    }
    if (localStorage.getItem(CHAVE_DADOS) !== conteudoArmazenadoAnterior) {
      throw new Error("Os dados mudaram em outra aba. Recarregue esta página antes de salvar.");
    }
    const texto = JSON.stringify(dados);
    localStorage.setItem(CHAVE_DADOS, texto);
    conteudoArmazenadoAnterior = texto;
    ultimaVersaoDados = texto;
    return true;
  } catch (erro) {
    // Desfaz somente a mudança em memória e mantém os campos do formulário.
    dados = JSON.parse(ultimaVersaoDados);
    mostrarMensagem("Não foi possível salvar. " + erro.message, true);
    return false;
  }
}
