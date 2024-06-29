import Link from "next/link";
import Image from "next/image";
import PriceProduct from "../items/PriceProduct";
import SellIcon from "@mui/icons-material/Sell";
import SustainableButton from "../buttons/icons/SustainableButton";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";
import { getCategory } from "@/utils/handlers/handleCategories";
import Button from "../buttons/Button";
import ProductCardSwiper from "../sliders/ProductCardSwiper";
import FavoriteButton from "@/components/buttons/icons/FavoriteButton";

// Gender prop can be either string or num
const ProductCard = ({ product, slider, gender, alignPrice }) => {

  const {
    id,
    brands: {
      name: brandName,
      logo_url: brandImageUrl
    },
    products_has_images: productImages,
    is_sustainable: sustainable,
    discount,
    offers,
  } = product;


  const categoryObj = getCategory(product.categories.id)
  const genderObj = getGender(gender);

  const renderDiscount = () => {
    //todo Abrir a modal com as condições da promoção.
    if (discount <= 0) return null
    return (
      <div className="h-10 cursor-pointer z-10 bg-primary_main absolute bottom-5 lg:group-hover:-translate-y-12 transition-transform duration-300 text-white flex items-center gap-2 font-medium px-3.5 rounded-tr rounded-br left-0 text-caption">
        <SellIcon sx={{ fontSize: 20 }} />
        {discount}% OFF
      </div>
    )
  }

  const renderSustainability = () => {
    if (!sustainable) return null
    return <SustainableButton type="normal" color="#05CE86" width={28} />
  }

  const renderProductInfo = () => (
    <div className={`flex flex-col justify-between items-center mt-2.5 gap-y-1 bg-white ${slider && "w-40"}`}>
      <p className="truncate font-semibold w-full">
        {categoryObj.singular} {brandName}
      </p>

      <p className="w-full text-caption text-secondary">
        ({offers?.length} {offers?.length === 1 ? 'oferta disponível' : 'ofertas disponíveis'})
      </p>

      {offers && (
        <PriceProduct
          alignPrice={alignPrice}
          discount={discount}
          offers={offers}
        />
      )}
    </div>
  )

  const renderOffersBtn = () => (
    <div className="bg-white bg-opacity-60 backdrop-blur p-3 z-10 absolute -bottom-12 lg:group-hover:-translate-y-12 block transition-transform duration-300 left-0 right-0 w-full">
    <Button className='opacity-0 text-caption lg:group-hover:opacity-100 transition-opacity duration-300' type={'black'} ariaLabel='Ver ofertas' width='100%' height='2.5rem'>
        Ver ofertas ({offers?.length})
      </Button>
    </div>
  )

  const renderBrand = () => (
    <Link className="border border-white hover:border-grey transition-all duration-200 rounded-full" href={`/${genderObj.string}/brands/${brandName}`}>
      <Image
        src={getStorageImage(brandImageUrl)}
        width={25}
        height={25}
        alt={brandName}
        className="rounded-full shadow-lg"
      />
    </Link>
  )

  const renderFavorite = () => (
    <div className="translate-x-1.5 hidden md:block">
      <FavoriteButton type='normal' />
    </div>
  )

  const renderSwiper = () => (
    <ProductCardSwiper genderObj={genderObj} id={id} productImages={productImages} />
  )

  const renderImage = () => (
    <Link className='w-full h-full' href={`/${genderObj.string}/product/${id}`}>
      <Image
        src={getStorageImage(productImages[0].url)}
        alt={productImages[0].alt}
        className="object-cover scale-90"
        fill={true}
      />
    </Link>
  )

  return (
    <article
      className={`w-full ${slider ? "w-40 sm:w-48 md:w-56 lg:w-64 xl:w-70" : ''} flex-5 my-1`}
    >

      <div className="rounded group border-grey border aspect-[3/4] relative hover:shadow-lg hover:shadow-gray-100 overflow-hidden transition-all duration-200">

        <div className="w-full h-full hidden lg:block">
          {renderSwiper()}
        </div>

        <div className="w-full h-full lg:hidden">
          {renderImage()}
        </div>

        <div className="absolute top-2 md:top-2.5 px-2 md:px-4 w-full flex items-center justify-between z-10">
          {renderBrand()}
          <div className="flex">
            {renderSustainability()}
            {renderFavorite()}
          </div>

        </div>

        {renderDiscount()}
        {renderOffersBtn()}

      </div>

      {renderProductInfo()}
    </article>
  );

};

export default ProductCard;
