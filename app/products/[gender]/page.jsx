'use client'

import CardProduct from "@/components/CardProduct"
import Views from "@/components/Views"
import ItemsBox from "@/components/ItemsBox"
import FilterButton from "@/components/FilterButton"
import NavigationTitle from "@/components/NavigationTitle"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import ProductsSkeleton from "@/components/loadingSkeletons/Products"


// Página com todos os produtos, filtrados por categoria.
// Exemplo: twovest.com/products/mulher?category='Saias'
// Atenção, carregar 30 produtos de cada vez (por exemplo), infinite scroll

const Products = () => {

  const gender = useParams().gender
  const category = useSearchParams().get('category')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getProductsByCategory?gender=${gender}&category=${category}`)
      const data = await response.json()
      setProducts(data)
      setLoading(true)
    }

    if (products.length === 0 && loading === false) {
      fetchData()
    }

  }, [products, category, gender, loading])

  useEffect(() => {
    setLoading(false)
    setProducts([])
  }, [searchParams])


  return (
    <main>
      <NavigationTitle titleText={category}>
        <span className="min-[350px]:hidden">
          <FilterButton />
        </span>
      </NavigationTitle>

      <div className="container flex justify-between h-7 max-[350px]:hidden mb-6">
        <Views />
        <FilterButton />
      </div>

      {products.length > 0 &&
        <ItemsBox>
          {products.map(element => <CardProduct key={element.id} product={element} gender={gender} />)}
        </ItemsBox>
      }

      {
        loading ? products.length === 0 && 'No data...' : <ProductsSkeleton />
      }

    </main>


  )
}

export default Products