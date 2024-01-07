'use client'

import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ShareButton from "@/components/ShareButton"
import FavoriteButton from "@/components/FavoriteButton"
import ProductSlider from "@/components/ProductSlider"
import ProductOffers from "@/components/ProductOffers"
import ProductDetails from "@/components/ProductDetails"
import Link from "next/link"
import getCategoryName from "@/utils/getCategoryName";
import ProductNav from "@/components/ProductNav"
import NavigationTitle from "@/components/NavigationTitle"
import LoadingIcon from "@/components/icons/LoadingIcon"



// Exemplo: twovest.com/product/mulher/52   <--ID do produto
const Product = () => {

  const [productDetails, setProductDetails] = useState()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const productId = params.id
  const productGender = params.gender


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/getProductById?id=${productId}&gender=${productGender}`)
      const data = await response.json()
      setProductDetails(data)
      setLoading(true)
    }

    if (!productDetails && loading === false) {
      fetchData()
    }
  }, [productDetails])

  return (
    <main>
      <div className="flex flex-col h-[calc(100vh-68px)] relative">

        {productDetails ?
          <>
            <ProductNav is_sustainable={productDetails.is_sustainable} discount={productDetails.discount} brand={productDetails.brands} />

            <div className=" flex-grow flex flex-col justify-end min-h-[600px] relative mb-5">
              <ProductSlider images={productDetails.images} />
              <div className="relative">
                <div className="absolute flex justify-end gap-6 items-center ml-auto -top-14 container z-10">
                  <ShareButton url={''} />
                  <FavoriteButton />
                </div>
                <div className="bg-white h-[167px] rounded-tl-[28px] rounded-tr-[28px] shadow-[0px_-20px_30px_0px_#00000010] container">
                  <div className="flex flex-row gap-4 pb-6 pt-8">
                    <Link href={'/'}>
                      <Image
                        src={productDetails.brands.logo_url}
                        width={35}
                        height={35}
                        alt={productDetails.brands.name}
                        className="rounded-full shadow-md"
                      />
                    </Link>

                    <h5 className="font-semibold truncate">{getCategoryName(productDetails.categories.id)} {productDetails.brands.name}</h5>
                  </div>
                  <Link href={'#offers'} className="bg-dark block hover:bg-dark_gray text-center text-white py-3.5 font-semibold rounded">
                    Ver todas as ofertas
                  </Link>
                </div>
              </div>
            </div>
          </>
          :
          <>
                <NavigationTitle>
                </NavigationTitle>

                <div className="flex-grow flex flex-col justify-end min-h-[600px] relative mb-5">

                    <div className="flex-grow mx-6 mb-12 rounded h-full flex justify-center items-center">
                    <LoadingIcon />
                    </div>


                    <div className="flex flex-col gap-[30px] items-end -top-14 w-full z-10">
                        <div className="flex gap-6 justify-end container">
                            <ShareButton url={''} />
                            <FavoriteButton />
                        </div>


                        <div className="bg-white h-[167px] rounded-tl-[28px] rounded-tr-[28px] shadow-[0px_-20px_30px_0px_#00000010] container">
                            <div className="flex flex-row gap-4 pb-6 pt-8">
                                <div className="w-[35px] h-[35px] rounded-full aspect-square bg-grey_opacity_50 animate-pulse">
                                </div>

                                <div className="h-[35px] w-full bg-grey_opacity_50 animate-pulse rounded"></div>
                            </div>

                            <div className="bg-dark block text-center text-white py-3.5 font-semibold rounded">
                                Ver todas as ofertas
                            </div>

                        </div>
                    </div>

                </div>
                </>
        }





      </div>

      {productDetails &&
        <div id='offers' className="flex flex-col pt-5 mb-16 gap-16 h-fit">
          <ProductOffers offers={productDetails.offers} discount={productDetails.discount} />
          <ProductDetails productDetails={productDetails} />
        </div>
      }

    </main>
  )
}

export default Product