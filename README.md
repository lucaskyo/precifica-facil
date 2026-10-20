# Precifica Fácil

Aplicação web para gestão de confeitaria, com recursos para controlar ingredientes, receitas, estoque, produção, compras e vendas.

## Funcionalidades

- Dashboard inicial com faturamento, lucro estimado, unidades vendidas, receitas cadastradas, alertas de estoque e atividades recentes.
- Cadastro e gerenciamento de ingredientes.
- Controle de estoque e ajuste de quantidades.
- Registro e histórico de compras.
- Cadastro de receitas com ingredientes, rendimento, custo total, preço de venda, custo por unidade, lucro estimado e margem de lucro.
- Simulação e registro de produção.
- Registro de vendas.
- Histórico de vendas com filtros e paginação.
- Resumo mensal com indicadores, evolução semanal e produtos mais vendidos.
- Exportação do relatório de vendas.
- Persistência dos dados no navegador usando `localStorage`.
- Interface responsiva e acessível.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- `localStorage` para persistência dos dados


## Estrutura do projeto

```text
.
├── index.html              # Entrada que redireciona para a aplicação
├── pages/
│   ├── index.html          # Dashboard inicial
│   ├── ingredientes.html   # Cadastro de ingredientes
│   ├── compras.html        # Registro e histórico de compras
│   ├── receitas.html       # Lista de receitas
│   ├── nova-receita.html   # Cadastro de receitas
│   ├── producao.html       # Simulação e registro de produção
│   ├── estoque.html        # Controle de estoque
│   ├── vendas.html         # Registro e relatório de vendas
│   ├── historico.html      # Histórico de vendas
│   └── resumo.html         # Resumo mensal
├── style.css               # Ponto de entrada dos estilos globais
├── assets/
│   └── css/
│       ├── base.css        # Variáveis, reset e tipografia
│       ├── layout.css      # Estrutura e menu lateral
│       ├── components.css  # Botões, cards, formulários e tabelas
│       ├── pages.css       # Componentes específicos das telas
│       └── responsive.css  # Regras para telas menores
└── js/
    ├── dados.js            # Modelo, leitura e gravação dos dados
    ├── core/
    │   ├── formatacao.js   # Formatação e utilitários de apresentação
    │   ├── consultas.js    # Consultas e preenchimento de controles
    │   ├── calculos.js     # Regras de cálculo compartilhadas
    │   └── interface.js    # Mensagens, modais e comportamento comum
    └── pages/
        ├── inicio.js       # Dashboard
        ├── ingredientes.js # Gerenciamento de ingredientes
        ├── compras.js     # Gerenciamento de compras
        ├── receitas.js    # Listagem de receitas
        ├── nova-receita.js # Cadastro de receitas
        ├── producao.js    # Controle de produção
        ├── estoque.js     # Controle de estoque
        ├── vendas.js      # Registro de vendas
        ├── historico.js   # Histórico de vendas
        └── resumo.js      # Indicadores mensais
```

## Armazenamento dos dados

Os dados são armazenados localmente no navegador por meio do `localStorage`. Eles não são enviados para um servidor ou compartilhados externamente.

Para limpar os dados cadastrados, acesse as ferramentas de desenvolvedor do navegador e remova o armazenamento local do site.

> Os dados iniciais são demonstrativos. Confira ingredientes, custos, receitas e preços antes de utilizar os valores para fins reais.

## Observações

- As quantidades e os preços dos ingredientes devem utilizar a mesma unidade de medida.
- O custo das receitas é calculado com base nos preços unitários dos ingredientes cadastrados.
- O lucro estimado considera o preço de venda menos o custo dos ingredientes.
- A aplicação depende de JavaScript habilitado no navegador.
