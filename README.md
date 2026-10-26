# Precifica Fácil 🧑‍🍳

[Read this README in English](README.en.md)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

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
