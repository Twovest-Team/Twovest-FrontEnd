

const general_categories = [
    {
        id: 1,
        name: 'Vestuário',
        img: '/static/images/categories/vestuario.png'
    },
    {
        id: 2,
        name: 'Calçado',
        img: '/static/images/categories/calcado.png'
    },
    {
        id: 3,
        name: 'Acessórios',
        img: '/static/images/categories/acessorios.png'
    }
]


const main_categories = [
    {
        id: 1,
        singular: 'Parte de cima',
        plural: 'Partes de Cima',
        general_category: 1
    },
    {
        id: 2,
        singular: 'Parte de Baixo',
        plural: 'Partes de Baixo',
        general_category: 1
    },
    {
        id: 3,
        singular: 'Corpo Inteiro',
        plural: 'Corpo Inteiro',
        general_category: 1
    },
    {
        id: 4,
        singular: 'Calçado',
        plural: 'Calçado',
        general_category: 2
    },
    {
        id: 5,
        singular: 'Acessório',
        plural: 'Acessórios',
        general_category: 3
    },
]

const categories = [
    { id: 1, singular: 'Malha', plural: 'Malhas', main_category: 1, gender: [0, 1] },
    { id: 2, singular: 'Colete', plural: 'Coletes', main_category: 1, gender: [0, 1] },
    { id: 3, singular: 'Blazer', plural: 'Blazers', main_category: 1, gender: [0, 1] },
    { id: 4, singular: 'Camisola', plural: 'Camisolas', main_category: 1, gender: [0, 1] },
    { id: 5, singular: 'Casaco', plural: 'Casacos', main_category: 1, gender: [0, 1] },
    { id: 6, singular: 'T-shirt', plural: 'T-shirts', main_category: 1, gender: [0, 1] },
    { id: 7, singular: 'Polo', plural: 'Polos', main_category: 1, gender: [0, 1] },
    { id: 8, singular: 'Sweatshirt', plural: 'Sweatshirts', main_category: 1, gender: [0, 1] },
    { id: 9, singular: 'Camisa', plural: 'Camisas', main_category: 1, gender: [0, 1] },
    { id: 10, singular: 'Top', plural: 'Tops', main_category: 1, gender: [0] },
    { id: 11, singular: 'Calça', plural: 'Calças', main_category: 2, gender: [0, 1] },
    { id: 12, singular: 'Calções', plural: 'Calções', main_category: 2, gender: [0, 1] },
    { id: 13, singular: 'Saia', plural: 'Saias', main_category: 2, gender: [0] },
    { id: 14, singular: 'Leggings', plural: 'Leggings', main_category: 2, gender: [0] },
    { id: 15, singular: 'Vestido', plural: 'Vestidos', main_category: 3, gender: [0] },
    { id: 16, singular: 'Macacão', plural: 'Macacões', main_category: 3, gender: [0, 1] },
    { id: 17, singular: 'Sapatilha', plural: 'Sapatilhas', main_category: 4, gender: [0, 1] },
    { id: 18, singular: 'Sapato', plural: 'Sapatos', main_category: 4, gender: [0, 1] },
    { id: 19, singular: 'Botas', plural: 'Botas', main_category: 4, gender: [0, 1] },
    { id: 20, singular: 'Sandália', plural: 'Sandálias', main_category: 4, gender: [0, 1] },
    { id: 21, singular: 'Chapéu', plural: 'Chapéus', main_category: 5, gender: [0, 1] },
    { id: 22, singular: 'Cinto', plural: 'Cintos', main_category: 5, gender: [0, 1] },
    { id: 23, singular: 'Óculos', plural: 'Óculos', main_category: 5, gender: [0, 1] },
    { id: 24, singular: 'Pulseira', plural: 'Pulseiras', main_category: 5, gender: [0, 1] },
    { id: 25, singular: 'Colar', plural: 'Colares', main_category: 5, gender: [0, 1] },
    { id: 26, singular: 'Anel', plural: 'Anéis', main_category: 5, gender: [0, 1] },
    { id: 27, singular: 'Cachecol', plural: 'Cachecóis', main_category: 5, gender: [0, 1] },
    { id: 28, singular: 'Gorro', plural: 'Gorros', main_category: 5, gender: [0, 1] },
    { id: 29, singular: 'Gola', plural: 'Golas', main_category: 5, gender: [0, 1] },
    { id: 30, singular: 'Luva', plural: 'Luvas', main_category: 5, gender: [0, 1] },
    { id: 31, singular: 'Brinco', plural: 'Brincos', main_category: 5, gender: [0] },
    { id: 32, singular: 'Carteira', plural: 'Carteiras', main_category: 5, gender: [0, 1] },
    { id: 33, singular: 'Mala', plural: 'Malas', main_category: 5, gender: [0, 1] },
    { id: 34, singular: 'Mochila', plural: 'Mochilas', main_category: 5, gender: [0, 1] }
]

const shopStages = [
    {
        id: 1,
        name: 'Cesto'
    },
    {
        id: 2,
        name: 'Envio'
    },
    {
        id: 3,
        name: 'Pagamento'
    }
]

const productMaxQty = 10

const minWidthGrid = 390; // Establishes the minimum window width size able to show view options on the UI

const portugalDistricts = [
    { id: 1, name: 'Aveiro', unavailable: false },
    { id: 2, name: 'Beja', unavailable: false },
    { id: 3, name: 'Braga', unavailable: false },
    { id: 4, name: 'Bragança', unavailable: false },
    { id: 5, name: 'Castelo Branco', unavailable: false },
    { id: 6, name: 'Coimbra', unavailable: false },
    { id: 7, name: 'Évora', unavailable: false },
    { id: 8, name: 'Faro', unavailable: false },
    { id: 9, name: 'Guarda', unavailable: false },
    { id: 10, name: 'Leiria', unavailable: false },
    { id: 11, name: 'Lisbon', unavailable: false },
    { id: 12, name: 'Portalegre', unavailable: false },
    { id: 13, name: 'Porto', unavailable: false },
    { id: 14, name: 'Santarém', unavailable: false },
    { id: 15, name: 'Setúbal', unavailable: false },
    { id: 16, name: 'Viana do Castelo', unavailable: false },
    { id: 17, name: 'Vila Real', unavailable: false },
    { id: 18, name: 'Viseu', unavailable: false },
    { id: 19, name: 'Azores', unavailable: false },
    { id: 20, name: 'Madeira', unavailable: false },
];

const portugalTowns = [
    { id: 1, name: 'Águeda', unavailable: false },
    { id: 2, name: 'Albergaria-a-Velha', unavailable: false },
    { id: 3, name: 'Anadia', unavailable: false },
    { id: 4, name: 'Arouca', unavailable: false },
    { id: 5, name: 'Aveiro', unavailable: false },
    { id: 6, name: 'Castelo de Paiva', unavailable: false },
    { id: 7, name: 'Espinho', unavailable: false },
    { id: 8, name: 'Estarreja', unavailable: false },
    { id: 9, name: 'Ílhavo', unavailable: false },
    { id: 10, name: 'Mealhada', unavailable: false },
    { id: 11, name: 'Murtosa', unavailable: false },
    { id: 12, name: 'Oliveira de Azeméis', unavailable: false },
    { id: 13, name: 'Oliveira do Bairro', unavailable: false },
    { id: 14, name: 'Ovar', unavailable: false },
    { id: 15, name: 'Santa Maria da Feira', unavailable: false },
    { id: 16, name: 'São João da Madeira', unavailable: false },
    { id: 17, name: 'Sever do Vouga', unavailable: false },
    { id: 18, name: 'Vagos', unavailable: false },
    { id: 19, name: 'Vale de Cambra', unavailable: false },
];

const cttPickupPoints = [
    { id: 1, name: 'CTT Pickup Point 1', unavailable: false },
    { id: 2, name: 'CTT Pickup Point 2', unavailable: false },
    { id: 3, name: 'CTT Pickup Point 3', unavailable: false },
    { id: 4, name: 'CTT Pickup Point 4', unavailable: false },
    { id: 5, name: 'CTT Pickup Point 5', unavailable: false },
    { id: 6, name: 'CTT Pickup Point 6', unavailable: false },
    { id: 7, name: 'CTT Pickup Point 7', unavailable: false },
    { id: 8, name: 'CTT Pickup Point 8', unavailable: false },
    { id: 9, name: 'CTT Pickup Point 9', unavailable: false },
    { id: 10, name: 'CTT Pickup Point 10', unavailable: false },
];

const historyMaxLength = 15

const genders = [
    {
        id: 0,
        string: 'women',
        stringPT: 'Mulher',
    },
    {
        id: 1,
        string: 'men',
        stringPT: 'Homem',
    }
]

const onboardingData = [
    {
        page: 1,
        titulo: "Bem-vindo à Twovest",
        texto: "Para ficares a perceber quem somos e o que te podemos oferecer com o nosso serviço, faz slide pelas seguintes páginas.",
        img: ""
    },
    {
        page: 2,
        titulo: "Quem somos? ",
        texto: "Nós somos defensores que o mercado circular é uma das alternativas para a sustentabilidade, desta forma desafiamos as marcas a fazer parte deste desafio.  ",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page2.png?t=2024-03-25T15%3A18%3A50.065Z"
    },
    {
        page: 3,
        titulo: "Quem somos? ",
        texto: "Desta forma, temos marcas parceiras que fornecem artigos vindos de excessos de stock, retomas, entre outros. Assim vendemos produtos com qualidade, a preços mais acessíveis.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page3.png?t=2024-03-25T15%3A19%3A11.766Z"
    },
    {
        page: 4,
        titulo: "Por onde começar?",
        texto: "Cria conta na Twovest para poderes usufruir de diversas funcionalidades e vantagens, que te irão permitir expressar melhor quem tu és e ainda te darão bonificações. Faz slide para veres as funcionalidades",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page4.png?t=2024-03-25T15%3A19%3A20.478Z"
    },
    {
        page: 5,
        titulo: "Funcionalidades",
        texto: "Para ficares por dentro do que a Twovest te oferece, iremos mostrar as principais funcionalidades da plataforma, para que possas perceber para que servem e usufruíres delas.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page5.png?t=2024-03-25T15%3A19%3A26.913Z"
    },
    {
        page: 6,
        titulo: "Galeria de Looks",
        texto: "Aqui poderás submeter os teus looks com artigos comprados na Twovest. Poderás ainda ver looks de outros utilizadores, ver roupas as utilizadas nos mesmos, e ainda guarda esses looks em coleções.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page6.png?t=2024-03-25T15%3A19%3A33.790Z"
    },
    {
        page: 7,
        titulo: "Coleções de Looks",
        texto: "Ao guardar os looks da Galeria, poderás criar coleções onde os guardar. Nestas poderás definir um nome e que tipo de privacidade esta terá, se será privada, publica ou ainda partilhada com pessoas.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page7.png?t=2024-03-25T15%3A19%3A40.331Z"
    },
    {
        page: 8,
        titulo: "Pontos&Cupões",
        texto: "Na compra de artigos da Twovest, receberás pontos que poderão ser trocados por cupões de desconto na página Pontos&Cupões. Poderás ainda ganhar pontos através de eventos, interações na Galeria, e conquistas.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page8.png?t=2024-03-25T15%3A19%3A45.935Z"
    },
    {
        page: 9,
        titulo: "Pontos de Entrega",
        texto: "O desejo da Twovest é também convidar os seus utilizadores a fazer parte do mercado circular, desta forma poderás entregar ou doar as roupas que já não queres nos locais assinalados na página Pontos de Entrega.",
        img: "https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/onboarding/page9.png?t=2024-03-25T15%3A19%3A52.245Z"
    },
    {
        page: 10,
        titulo: "Conclusão",
        texto: "conclusão",
        img: "img.jpg"
    },
    {
        page: 11,
        titulo: "genero",
        texto: "genero",
        img: "img.jpg"
    },
]

const gradients = [
    {
        id: 1,
        styles: 'linear-gradient(to right, #f7fafc, #e2e8f0)',
        darker: false // bg-grey_opacity_50
    },
    {
        id: 2,
        styles: 'linear-gradient(to right, #fecdd3, #f43f5e)',
        darker: true // bg-gradient-to-r from-rose-300 to-rose-500
    },
    {
        id: 3,
        styles: 'linear-gradient(to right, #2dd4bf, #1f2937)',
        darker: true // bg-gradient-to-r from-teal-400 to-gray-800
    },
    {
        id: 4,
        styles: 'linear-gradient(to right, #fb923c, #fb7185)',
        darker: true // bg-gradient-to-r from-orange-400 to-rose-400
    },
    {
        id: 5,
        styles: 'linear-gradient(to right, #0f172a, #334155)',
        darker: true // bg-gradient-to-r from-slate-900 to-slate-700
    },
    {
        id: 6,
        styles: 'linear-gradient(to right, #e9d5ff, #5b21b6)',
        darker: true // bg-gradient-to-r from-purple-200 to-purple-800
    },
    {
        id: 7,
        styles: 'linear-gradient(to right, #d946ef, #06b6d4)',
        darker: true // bg-gradient-to-r from-fuchsia-500 to-cyan-500
    }
];


export {
    general_categories,
    main_categories,
    categories,
    shopStages,
    productMaxQty,
    minWidthGrid,
    portugalDistricts,
    portugalTowns,
    cttPickupPoints,
    historyMaxLength,
    genders,
    onboardingData,
    gradients
}