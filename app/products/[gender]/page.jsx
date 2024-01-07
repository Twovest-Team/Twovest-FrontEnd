
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
  console.log(data);

  return (
    <main>
      <div className="container flex justify-between h-7">
      <Views />
      </div>
      
      <ItemsBox>
        {data.map(element => <CardProduct key={element.id} product={element} />)}
        {data.map(element => <CardProduct key={element.id} product={element} />)}
      </ItemsBox>
    </main>


  )
}

export default Products