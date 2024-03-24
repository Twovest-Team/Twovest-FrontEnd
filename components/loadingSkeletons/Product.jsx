import NavigationTitle from "../providers/NavigationTitle"
import LoadingIcon from "../buttons/icons/LoadingIcon"
import ShareButton from "../buttons/icons/ShareButton"
import FavoriteButton from "../buttons/icons/FavoriteButton"

const ProductSkeleton = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-75px)] relative">
      <NavigationTitle>
      </NavigationTitle>

      <div className="flex-grow flex flex-col justify-end min-h-[600px] relative mb-5">

        <div className="flex-grow mx-6 mb-12 rounded h-full flex justify-center items-center">
          <LoadingIcon size={28} />
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
    </section>
  )
}

export default ProductSkeleton