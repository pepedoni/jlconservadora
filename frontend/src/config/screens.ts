const menu = [
  {
    "icon": "dashboard",
    "title": "Dashboard",
    "link": "/dashboard"
  },
  {
    "icon": "dollar",
    "title": "Faturamento",
    "children": [
      {
        "title": "Nota Fiscal",
        "link": "/notafiscal",
        "breadcrumb": "Faturamento /"
      }
    ]
  },
  {
    "icon": "setting",
    "title": "Cadastros",
    "children": [
      {
        "title": "Cliente",
        "link": "/pipeline-steps",
        "breadcrumb": "Parametrizações / Oportunidades /"
      }
    ]
  },
  {
    "title": "Notificações",
    "link": "/notifications",
    "notVisibleInMenu": true
  },
  {
    "title": "Pagamento",
    "link": "/billing",
    "notVisibleInMenu": true
  },
  {
    "title": "Configurações",
    "link": "/settings",
    "notVisibleInMenu": true
  }
]

export default menu;