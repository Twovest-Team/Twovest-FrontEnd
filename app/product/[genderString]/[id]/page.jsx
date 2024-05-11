import getProductById from "@/utils/db/getProductById";
import Image from "next/image";
import ShareButton from "@/components/buttons/icons/ShareButton";
import FavoriteButton from "@/components/buttons/icons/FavoriteButton";
import ProductOffers from "@/components/sections/ProductOffers";
import ProductDetails from "@/components/items/ProductDetails";
import Link from "next/link";
import getCategoryName from "@/utils/getCategoryName";
import ProductNav from "@/components/sections/ProductNav";
import ProductSkeleton from "@/components/loaders/Product";
import { Suspense } from "react";
import ProductHistoryDetection from "@/components/providers/ProductHistoryDetection";
import Button from "@/components/buttons/Button";
import getStorageImage from "@/utils/getStorageImage";
import ProductSwiper from "@/components/sliders/ProductSwiper";
import Modal from "@/components/modals/Modal";
import ProductOfferCard from "@/components/cards/ProductOfferCard";
import { sortOffers } from "@/utils/handleOffers";
import ProductZoomImage from "@/components/items/ProductZoomImage";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import { LooksHomepage } from "@/components/cards/LooksHomepage";

export const revalidate = 60;

export default async function Product({ params, searchParams }) {
  const productId = params.id;
  const selectImageId = searchParams.picture
  const productGender = params.genderString;

  return (
    <main>
      <ProductHistoryDetection productId={productId}>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductContent productId={productId} selectImageId={selectImageId} productGender={productGender} />
        </Suspense>
      </ProductHistoryDetection>
    </main>
  );
}

async function ProductContent({ productId, selectImageId, productGender }) {
  const data = await getProductById(productId, productGender);
  const looks = await getLooksForHomepage(productGender)
  const sortedOffers = sortOffers(data.offers);

  const renderNav = () => {
    return (
      <ProductNav
        productGender={productGender}
        is_sustainable={data.is_sustainable}
        discount={data.discount}
        brand={data.brands}
      />
    )
  }

  const renderBtnOptions = () => {
    return (
      <div className="absolute lg:static flex justify-end lg:justify-center gap-6 lg:gap-4 items-center ml-auto -top-14 container z-10">
        <span className="lg:hidden"><ShareButton type="normal" /></span>
        <span className="hidden lg:block"><ShareButton type="bordered" /></span>
        <span className="lg:hidden"><FavoriteButton type="normal" /></span>
        <span className="hidden lg:block"><FavoriteButton type="bordered" /></span>

      </div>
    )
  }

  const renderSlider = () => {
    return (
      <section className="flex flex-col h-screen relative lg:hidden">
        <div className="flex-grow flex flex-col justify-end min-h-[600px] relative mb-5">
          <ProductSwiper images={data.products_has_images} />
          <div className="relative">
            {renderBtnOptions()}
            <div className="bg-white h-[167px] rounded-tl-[28px] rounded-tr-[28px] shadow-[0px_-20px_30px_0px_#00000010] container">
              <div className="flex flex-row gap-4 pb-6 pt-8">
                <Link href={"/"}>
                  <Image
                    src={getStorageImage(data.brands.logo_url)}
                    width={35}
                    height={35}
                    alt={data.brands.name}
                    className="rounded-full shadow-md"
                  />
                </Link>

                <h1 className="font-semibold truncate text_h5">
                  {getCategoryName(data.categories.id)} {data.brands.name}
                </h1>
              </div>

              <Button
                type={"black"}
                ariaLabel="Ver as melhores ofertas"
                width="full"
              >
                Ver as melhores ofertas
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const renderOffers = () => {
    return (
      <section id="offers" className="h-fit w-full">
        <ProductOffers
          offers={data.offers}
          discount={data.discount}
          productGender={productGender}
          productId={productId}
        />
      </section>
    )
  }

  const renderDetails = () => {
    return (
      <ProductDetails productDetails={data} />
    )
  }

  const renderPreviews = () => {

    const checkIfSelected = (id, index) => {
      return (selectImageId == id || (!selectImageId && index === 0))
    }

    return (
      <section className="flex flex-col gap-4">
        {data.products_has_images.map((image, index) => (
          <Link
            href={`?picture=${image.id}`}
            key={image.id}
            className={`relative w-[70px] h-[70px] rounded border ${checkIfSelected(image.id, index) ? 'border-dark' : 'border-grey'}`}>
            <Image className="p-1" fill={true} alt={image.alt} src={getStorageImage(image.url)} />
          </Link>
        ))}
      </section>
    )
  }

  const renderMainImage = () => {

    const getCurrentImage = () => {
      return data.products_has_images.find((image, index) => selectImageId == image.id || (!selectImageId && index === 0))
    }

    const image = getCurrentImage()

    return (
      <div className="flex flex-col gap-4 items-center">
        <ProductZoomImage image={image} discount={data.discount} />
        {renderBtnOptions()}
      </div>
    )
  }


  return (
    <>

      {renderNav()}

      {renderSlider()}

      <section className="hidden lg:flex flex-row container lg:mt-28 relative mb-16">
        <div className="flex gap-x-12 mr-10 sticky top-[187px] h-fit">
          {renderPreviews()}
          {renderMainImage()}
        </div>

        <div className="w-full flex flex-col gap-16">
          {renderOffers()}
          {renderDetails()}
        </div>
      </section>


      <section className="flex flex-col gap-16 mb-16 container lg:hidden">
        {renderOffers()}
        {renderDetails()}
      </section>

      {looks &&
        <section className="flex flex-col gap-6 mb-16 text-white">
          <h6 className="font-semibold text_h6 text-dark container">Looks com este artigo</h6>
          <LooksHomepage data={looks} />
        </section>
      }




      <Modal maxSm className='lg:hidden' id={'offersProduct'}>
        <div className="h-full">
          <h1 className="font-semibold text_h6">Ofertas</h1>
          <p className="text-secondary">
            Vê todas as ofertas para este artigo.
          </p>
        </div>

        <div className="flex flex-col gap-6 overflow-auto max-h-[21rem]">
          {sortedOffers.map((offer, index) => (
            <ProductOfferCard key={index} offer={offer} discount={data.discount} />
          ))}
        </div>
      </Modal>

    </>
  );
}
