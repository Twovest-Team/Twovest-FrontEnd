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
    if (discount <= 0) return null
    return (
      <Link href={`/product/${genderObj.string})}/${id}`}>
        <div className="h-10 z-10 bg-primary_main absolute bottom-5 group-hover:-translate-y-11 transition-transform duration-300 text-white flex items-center gap-2 font-medium px-3.5 rounded-tr rounded-br left-0 caption">
          <SellIcon sx={{ fontSize: 20 }} />
          {discount}% OFF
        </div>
      </Link>
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

      <p className="w-full caption text-secondary">
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
    <div className="bg-white p-3 z-10 absolute -bottom-12 group-hover:-translate-y-12 block transition-transform duration-300 left-0 right-0 w-full">
      <Button className='opacity-0 caption group-hover:opacity-100 transition-opacity duration-300' type={'black'} ariaLabel='Ver ofertas' width='full' height={10}>
        Ver ofertas
      </Button>
    </div>
  )

  const renderBrand = () => (
    <Link className="border z-10 border-white hover:border-grey transition-all duration-200 rounded-full" href={`/brands/${genderObj.string}/${brandName}`}>
      <Image
        src={getStorageImage(brandImageUrl)}
        width={25}
        height={25}
        alt={brandName}
        className="rounded-full shadow-lg"
      />
    </Link>
  )

  return (
    <article
      className={`w-full group ${slider ? "max-w-[160px]" : ''}
        } flex-5 mb-2`}
    >

      {/* w-full rounded border-grey group-hover:shadow-lg group-hover:shadow-gray-100 transition-all duration-200 border aspect-[3/4] flex relative justify-center items-center */}

      <div className="rounded border-grey border aspect-[3/4] relative group-hover:shadow-lg group.hover:shadow-gray-100 overflow-hidden transition-all duration-200">
        <ProductCardSwiper genderObj={genderObj} id={id} productImages={productImages} />


        <div className="absolute top-2.5 px-4 w-full flex items-center justify-between">
          {renderBrand()}
          {renderSustainability()}
        </div>

        {renderDiscount()}
        {renderOffersBtn()}

      </div>

      {renderProductInfo()}
    </article>
  );

};

export default ProductCard;
