

import getProductsByCategory from "@/utils/db/getProductsByCategory"


// Página com todos os produtos, filtrados por categoria.
// Exemplo: twovest.com/products/mulher?category='Saias'
// Atenção, carregar 30 produtos de cada vez (por exemplo), infinite scroll

export const revalidate = 0 

const Products = async () => {

  const data = await getProductsByCategory(11, 'Mulher')

  return (
    <main>
      Products
    </main>


  )
}

export default Products