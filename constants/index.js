const general_categories = [
    {
        id: 1,
        name: 'Vestuário',
        img: '/images/categories/vestuario.png'
    },
    {
        id: 2,
        name: 'Calçado',
        img: '/images/categories/calcado.png'
    },
    {
        id: 3,
        name: 'Acessórios',
        img: '/images/categories/acessorios.png'
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
    { id: 1, singular: 'Malha', plural: 'Malhas', main_category: 1, gender: [1, 2] },
    { id: 2, singular: 'Colete', plural: 'Coletes', main_category: 1, gender: [1, 2] },
    { id: 3, singular: 'Blazer', plural: 'Blazers', main_category: 1, gender: [1, 2] },
    { id: 4, singular: 'Camisola', plural: 'Camisolas', main_category: 1, gender: [1, 2] },
    { id: 5, singular: 'Casaco', plural: 'Casacos', main_category: 1, gender: [1, 2] },
    { id: 6, singular: 'T-shirt', plural: 'T-shirts', main_category: 1, gender: [1, 2] },
    { id: 7, singular: 'Polo', plural: 'Polos', main_category: 1, gender: [1, 2] },
    { id: 8, singular: 'Sweatshirt', plural: 'Sweatshirts', main_category: 1, gender: [1, 2] },
    { id: 9, singular: 'Camisa', plural: 'Camisas', main_category: 1, gender: [1, 2] },
    { id: 10, singular: 'Top', plural: 'Tops', main_category: 1, gender: [1] },
    { id: 11, singular: 'Calça', plural: 'Calças', main_category: 2, gender: [1, 2] },
    { id: 12, singular: 'Calções', plural: 'Calções', main_category: 2, gender: [1, 2] },
    { id: 13, singular: 'Saia', plural: 'Saias', main_category: 2, gender: [1] },
    { id: 14, singular: 'Leggings', plural: 'Leggings', main_category: 2, gender: [1] },
    { id: 15, singular: 'Vestido', plural: 'Vestidos', main_category: 3, gender: [1] },
    { id: 16, singular: 'Macacão', plural: 'Macacões', main_category: 3, gender: [1, 2] },
    { id: 17, singular: 'Sapatilha', plural: 'Sapatilhas', main_category: 4, gender: [1, 2] },
    { id: 18, singular: 'Sapato', plural: 'Sapatos', main_category: 4, gender: [1, 2] },
    { id: 19, singular: 'Botas', plural: 'Botas', main_category: 4, gender: [1, 2] },
    { id: 20, singular: 'Sandália', plural: 'Sandálias', main_category: 4, gender: [1, 2] },
    { id: 21, singular: 'Chapéu', plural: 'Chapéus', main_category: 5, gender: [1, 2] },
    { id: 22, singular: 'Cinto', plural: 'Cintos', main_category: 5, gender: [1, 2] },
    { id: 23, singular: 'Óculos', plural: 'Óculos', main_category: 5, gender: [1, 2] },
    { id: 24, singular: 'Pulseira', plural: 'Pulseiras', main_category: 5, gender: [1, 2] },
    { id: 25, singular: 'Colar', plural: 'Colares', main_category: 5, gender: [1, 2] },
    { id: 26, singular: 'Anel', plural: 'Anéis', main_category: 5, gender: [1, 2] },
    { id: 27, singular: 'Cachecol', plural: 'Cachecóis', main_category: 5, gender: [1, 2] },
    { id: 28, singular: 'Gorro', plural: 'Gorros', main_category: 5, gender: [1, 2] },
    { id: 29, singular: 'Gola', plural: 'Golas', main_category: 5, gender: [1, 2] },
    { id: 30, singular: 'Luva', plural: 'Luvas', main_category: 5, gender: [1, 2] },
    { id: 31, singular: 'Brinco', plural: 'Brincos', main_category: 5, gender: [1] },
    { id: 32, singular: 'Carteira', plural: 'Carteiras', main_category: 5, gender: [1, 2] },
    { id: 33, singular: 'Mala', plural: 'Malas', main_category: 5, gender: [1, 2] },
    { id: 34, singular: 'Mochila', plural: 'Mochilas', main_category: 5, gender: [1, 2] }
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
  
export {
    general_categories,
    main_categories,
    categories,
    shopStages,
    productMaxQty
}