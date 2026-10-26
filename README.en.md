# Precifica Fácil 🧑‍🍳

[Leia este README em português](README.md)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

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
