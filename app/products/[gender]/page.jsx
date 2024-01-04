
import CardProduct from "@/components/CardProduct"
import getProductsByCategory from "@/utils/db/getProductsByCategory"
import Views from "@/components/Views"
import ItemsBox from "@/components/ItemsBox"

// Página com todos os produtos, filtrados por categoria.
// Exemplo: twovest.com/products/mulher?category='Saias'
// Atenção, carregar 30 produtos de cada vez (por exemplo), infinite scroll

export const revalidate = 0 

const Products = async () => {

  const data = await getProductsByCategory(11, 'Mulher')

  return (
    <main>
      <div className="container flex justify-between">
      <Views />
      </div>
      
      <ItemsBox>
        {data.map(element => <CardProduct product={element} />)}
      </ItemsBox>
    </main>


  )
}

export default Products