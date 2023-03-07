import img from "../../assets/img/couple.jpg";
import serviceImage from "../../assets/img/serviceImage.jpg";



export const wpToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcGFzdG9yZWhlYWRsZXNzIiwiaWF0IjoxNjc4MTc1NTczLCJuYmYiOjE2NzgxNzU1NzMsImV4cCI6MTY3ODc4MDM3MywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.L3YVvj1Dfwlw2wNMi37ij6BW28s4koL0ajijVSYRQKI`

export const gridItems = [
  {
    title: "Invierte en Bitcoins",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail: {
      imgUrl: img,
      altText: "Pareja chocando los cinco",
    },
    postLink: "",
    id: "",
    chips: ["2 horas", "trading"],
  },
  {
    title: "Trading extremo",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail: {
      imgUrl: img,
      altText: "Pareja chocando los cinco",
    },
    postLink: "",
    id: "",
    chips: ["2 horas", "trading"],
  },
  {
    title: "Ethereum entender el qué y el cómo",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail: {
      imgUrl: img,
      altText: "Pareja chocando los cinco",
    },
    postLink: "",
    id: "",
    chips: ["2 horas", "trading"],
  },
  {
    title: "Curso avanzado de Trading",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    thumbnail: {
      imgUrl: img,
      altText: "Pareja chocando los cinco",
    },
    postLink: "",
    id: "",
    chips: ["2 horas", "trading"],
  },
];

export const options = [
  { value: "trading", label: "Trading" },
  { value: "criptomonedas", label: "Criptomonedas" },
  { value: "todos", label: "Todos" },
];

export const system_data_config = {
  edition_permissions: {
    user: [],
    colaborator: ["/academy/courses"],
    administrador: ["all_site"],
  },
};

export const WPterms = [
  {
    name: "Bitcoin",
    slug: "bitcoin",
    term_id: 12,
  },
  {
    name: "Altcoins",
    slug: "altcoins",
    term_id: 13,
  },
  {
    name: "Flash updates",
    slug: "flash-updates",
    term_id: 14,
  },
  {
    name: "Watchlist",
    slug: "watchlist",
    term_id: 15,
  },
];

export const fakeCategoryPosts = [
  {
    id: 1,
    categories: [
      { name: "Bitcoin", slug: "bitcoin", term_id: 1 },
      { name: "Premium", slug: "premium", term_id: 2 },
      { name: "Analysis", slug: "analysis", term_id: 3 }
    ],
    author:{name: 'María', lastname: 'Hojas'},
    status: "publish",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    slug: "this._slug",
    title: "El bitcoin recupera posisiones poco a poco para que el título sea más largo",
    date: "21-enero-2022",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail_url: "this._thumbnail_url",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 2,
    categories: [
      { name: "Altcoins", slug: "altcoins", term_id: 1 },
      { name: "Premium", slug: "premium", term_id: 2 },
      { name: "Analysis", slug: "analysis", term_id: 3 }
    ],
    author:{name: 'Jose', lastname: 'Acevedo'},
    status: "publish",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and",
    slug: "this._slug",
    title: "Una alternativa interesante en el mundo de los NFTs",
    date: "21-enero-2022",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail_url: "this._thumbnail_url",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 3,
    categories: [
      { name: "Flash Updates", slug: "flash-updates", term_id: 1 },
      { name: "Premium", slug: "premium", term_id: 2 },
      { name: "Analysis", slug: "analysis", term_id: 3 }
    ],
    author:{name: 'Luis', lastname: 'Pérez'},
    status: "publish",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and",
    slug: "this._slug",
    title: "Ethereum y Bitcoins las criptomonedas más famosas para el público en general",
    date: "21-enero-2022",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail_url: "this._thumbnail_url",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 4,
    categories: [
      { name: "Watchlist", slug: "watchlist", term_id: 1 },
      { name: "Premium", slug: "premium", term_id: 2 },
      { name: "Analysis", slug: "analysis", term_id: 3 }
    ],
    author:{name: 'Irene', lastname: 'Carballo'},
    status: "publish",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and",
    slug: "this._slug",
    title: "Necesito otro título de post sobre criptomonedas. Que no sea loren ipsum",
    date: "21-enero-2022",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail_url: "this._thumbnail_url",
    tags: ["tag1", "tag2", "tag3"],
  },
];

export const article = {
  "id": 347,
  "formatted_categories": [
    {
      "term_id": 59,
      "name": "Analysis",
      "slug": "analysis",
      "parent": 0,
      "taxonomy": "category"
    },
    {
      "term_id": 66,
      "name": "Basic",
      "slug": "basic-plans",
      "parent": {
        "term_id": 64,
        "name": "Plans",
        "slug": "plans",
        "parent": 0,
        "taxonomy": "category"
      },
      "taxonomy": "category"
    },
    {
      "term_id": 60,
      "name": "Bitcoin",
      "slug": "bitcoin",
      "parent": {
        "term_id": 59,
        "name": "Analysis",
        "slug": "analysis",
        "parent": 0,
        "taxonomy": "category"
      },
      "taxonomy": "category"
    }
  ],
  "formatted_tags": null,
  "status": "publish",
  "created_by": {
    "username": "jose@rload.es",
    "uid": "GNMEGhQawvaOXkXawa5EdNYwyc93",
    "name": "Jose Manuel  Acevedo Medina"
  },
  "acf": [],
  "excerpt": {
    "rendered": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"",
    "raw": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
  },
  "thumbnail_url": false,
  "content": {
    "rendered":"\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""
  },
  "slug": "art-1",
  "title": {
    "rendered": "Artículo 1",
    "raw": "Art 1"
  },
  "date": "2022-11-02 15:59:03"
}

export const clientsList = [
  {
    name: 'Irene',
    lastname: 'Martín'
  },
  {
    name: 'Jose',
    lastname: 'Pérez'
  },
  {
    name: 'Beatriz',
    lastname: 'Cáceres'
  },
  {
    name: 'Andrea Martina',
    lastname: 'Martínez'
  },
  {
    name: 'Luisa',
    lastname: 'Martínez'
  }
]

export const serviceDetail = {
  title: 'Este es el título del servicio',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  list: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys', 'detalle del servicio 2', 'detalle del servicio 3'],
  price: '90',
  image: serviceImage
}

export const servicesList = [
  {
    name: 'Declaración de la renta',
    description: 'Gestión y presentación de la declaración de la renta',
    price: '60',
    duration:null,
    clients:'45'
  },
  {
    name: 'Presentación de Recurso notificación Agencia tributaria',
    description: 'Gestión y presentación de la declaración de la renta',
    price: '60',
    duration:null,
  },
  {
    name: 'Asesoría autónomos',
    description: 'Resolución de dudas para autónomos',
    price: '35',
    duration:'30',
    clients:'5'
  },
  {
    name: 'Asesoría para venta en Amazon',
    description: 'Asesoría para comenzar a vender productos en Amazon marketplace',
    price: '60',
    duration: '1h'
  },
  {
    name: 'Presentación de Recurso notificación Agencia tributaria',
    description: 'Gestión y presentación de la declaración de la renta',
    price: '60',
    duration:null,
  },
  {
    name: 'Asesoría autónomos',
    description: 'Resolución de dudas para autónomos',
    price: '35',
    duration:'30',
    clients:'5'
  },
  {
    name: 'Asesoría para venta en Amazon',
    description: 'Asesoría para comenzar a vender productos en Amazon marketplace',
    price: '60',
    duration: '1h'
  }
]

export const invoices = [
  {
    date: '23/02/2023',
    id: '01909201092012',
    text: 'factura 0198909201092012',
    read: false
  },
  {
    date: '13/01/2023',
    id: '00000201092012',
    text: 'factura 0198909201092012',
    read: false

  },
  {
    date: '05/02/2018',
    id: '0198909201092012',
    text: 'factura 0198909201092012',
    read: true
  },
  {
    date: '23/02/2023',
    id: '01909201092012',
    text: 'factura 0198909201092012',
    read: false
  },
  {
    date: '13/01/2023',
    id: '00000201092012',
    text: 'factura 0198909201092012',
    read: true
  },
  {
    date: '05/02/2018',
    id: '0198909201092012',
    text: 'factura 0198909201092012',
    read: true
  }
]

export const notifications = [
  {
    id:'292',
    text: 'Te han dado de alta como colaborador'
  },
  {
    id:'292',
    text: 'Han contratado una neuva'
  },
  {
    id:'292',
    text: 'Te han dado de alta como colaborador'
  }
]

export const newsCategories = [
  {
    id:'291',
    title: 'Mis favoritas',
    slug: 'mis-favoritas'
  },
  {
    id:'292',
    title: 'Web3',
    slug:'web3'
  },
  {
    id:'293',
    title: 'Macro',
    slug:'macro'
  },
  {
    id:'294',
    title: 'NFTs',
    slug:'nfts'
  }
]

export const news = [
  {
    id:'291',
    title: 'Qué son las empresas unicornio y cuáles son las más grandes de España',
    date:'16/02/2023',
    href:"https://www.mingcute.com/"
  },
  {
    id:'292',
    title: 'Meta planea una nueva ronda de despidos tras las 11.000 salidas de noviembre',
    date:'05/02/2023',
    href:"https://www.mingcute.com/"
  },
  {
    id:'293',
    title: 'El gran reto de las grandes empresas: cómo retener talento y evitar que los jóvenes se quemen con un título de noticia extremadamente largo para que se corte cuando no quepa',
    date:'16/05/2023',
    href:"https://www.mingcute.com/"
  },
  {
    id:'294',
    title: 'La revolución Web3: la guerra del dato se libra en el internet del futuro',
    date:'10/02/2023',
    href:"https://www.mingcute.com/"
  },
  {
    id:'295',
    title: 'Fernando Romero, fundador de la empresa estrella de 2022: "Siempre quiero más. No ...',
    date:'16/02/2023',
    href:"https://www.mingcute.com/"
  }
]