# Precifica Fácil 🧑‍🍳

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

[Leia este README em português](#português)

Complete web system for bakery management: manage recipes, ingredients, inventory, production, and sales, from pricing to profit reports.

## 📌 Features

- Main Dashboard: Monitor revenue, estimated profit, units sold, registered recipes, inventory alerts, and recent activities in real time.
- Smart Registration: Register recipes with ingredients and yield, automatically calculating total cost, cost per unit, estimated profit, and profit margin based on the sale price.
- Inventory Control: Full management of recipes, ingredients, inventory, and purchases, with dynamic quantity adjustments.
- Inventory Validation: Automatically check whether there are enough ingredients in inventory to produce recipes.
- Sales History: Complete sales records with search tools, advanced filters, and pagination.
- Monthly Summary: Consolidated indicators, weekly progress, best-selling product ranking, and sales report export.
- Data persistence in the browser using `localStorage`.
- Light and dark theme switching, with the preference saved in the browser and support for the system preference.

## 📁 Project structure

```text
.
├── index.html              # Entry point that redirects to the application
├── pages/
│   ├── index.html          # Main dashboard
│   ├── ingredientes.html   # Ingredient registration
│   ├── compras.html        # Purchase records and history
│   ├── receitas.html       # Recipe list
│   ├── nova-receita.html   # Recipe registration
│   ├── producao.html       # Production simulation and registration
│   ├── estoque.html        # Inventory control
│   ├── vendas.html         # Sales records and report
│   ├── historico.html      # Sales history
│   └── resumo.html         # Monthly summary
├── style.css               # Entry point for global styles
├── assets/
│   └── css/
│       ├── base.css        # Variables, reset, and typography
│       ├── layout.css      # Layout and sidebar
│       ├── components.css  # Buttons, cards, forms, and tables
│       ├── pages.css       # Screen-specific components
│       └── responsive.css  # Rules for smaller screens
└── js/
    ├── dados.js            # Data model, reading, and writing
    ├── core/
    │   ├── formatacao.js   # Formatting and presentation utilities
    │   ├── consultas.js    # Queries and control population
    │   ├── calculos.js     # Shared calculation rules
    │   └── interface.js    # Messages, modals, and common behavior
    └── pages/
        ├── inicio.js       # Dashboard
        ├── ingredientes.js # Ingredient management
        ├── compras.js      # Purchase management
        ├── receitas.js     # Recipe listing
        ├── nova-receita.js # Recipe registration
        ├── producao.js     # Production control
        ├── estoque.js      # Inventory control
        ├── vendas.js       # Sales records
        ├── historico.js    # Sales history
        └── resumo.js       # Monthly indicators
```

## Data storage

Data is stored locally in the browser through `localStorage`. It is not sent to a server or shared externally.

To clear the registered data, open the browser's developer tools and remove the site's local storage.

> The initial data is for demonstration purposes. Check ingredients, costs, recipes, and prices before using the values for real-world purposes.

---

<a id="português"></a>

## PT-BR

Sistema web completo para gestão de confeitarias: Controle de receitas, insumos, estoque, produção e vendas,  da precificação ao relatório de lucros.

## 📌 Funcionalidades

- Painel Principal: Acompanhe em tempo real o faturamento, lucro estimado, unidades vendidas, receitas cadastradas, alertas de estoque e atividades recentes.
- Cadastro Inteligente: Registro de receitas com ingredientes e rendimento, calculando automaticamente o custo total, custo por unidade, lucro estimado e margem de lucro com base no preço de venda.
- Controle de Estoque: Gerenciamento completo de receitas, ingredientes, estoque e compras, com ajuste dinâmico de quantidades.
- Validação de Estoque: Verificação automática se há ingredientes suficientes em estoque para a produção das receitas.
- Histórico de Vendas: Registro completo de vendas com ferramentas de busca, filtros avançados e paginação.
- Resumo Mensal: Indicadores consolidados, evolução semanal, ranking de produtos mais vendidos e exportação de relatórios de vendas.
- Persistência dos dados no navegador usando `localStorage`.
- Alternância entre tema claro e escuro, com preferência salva no navegador e suporte à preferência do sistema.

## 📁 Estrutura do projeto

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
