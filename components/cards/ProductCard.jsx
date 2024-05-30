import Link from "next/link";
import Image from "next/image";
import PriceProduct from "../items/PriceProduct";
import SellIcon from "@mui/icons-material/Sell";
import SustainableButton from "../buttons/icons/SustainableButton";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";
import { getCategory } from "@/utils/handlers/handleCategories";
import Button from "../buttons/Button";

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
        <div className="h-11 bg-primary_main absolute bottom-5 text-white flex items-center gap-2 font-medium px-3.5 rounded-tr rounded-br left-0">
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

      <p className="w-full caption text-secondary">(5 ofertas disponíveis)</p>

      {offers && (
        <PriceProduct
          alignPrice={alignPrice}
          discount={discount}
          offers={offers}
        />
      )}
    </div>
  )

  return (
    <article
      className={`w-full group ${slider ? "max-w-[160px]" : ''}
        } flex-5 mb-2`}
    >
      <div className="w-full rounded border-grey group-hover:shadow-lg group-hover:shadow-gray-100 transition-all duration-200 border aspect-[3/4] relative flex justify-center items-center">
        <Link href={`/product/${genderObj.string}/${product.id}`}>
          <Image
            src={getStorageImage(productImages[0].url)}
            alt={productImages[0].alt}
            className="object-cover scale-90"
            fill={true}
          />
        </Link>

        <div className="absolute top-2.5 px-4 w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Link href={`/brands/${genderObj.string}/${brandName}`}>
              <Image
                src={getStorageImage(brandImageUrl)}
                width={25}
                height={25}
                alt={brandName}
                className="rounded-full shadow-lg"
              />
            </Link>
          </div>

          {renderSustainability()}
        </div>

        {renderDiscount()}

        <div className="absolute bottom-0 left-0 right-0 w-full">

          <Button type={'black'} ariaLabel='WRITE HERE' width='full' height={12} radius="b">
            Ver ofertas
          </Button>

        </div>
      </div>

      {renderProductInfo()}
    </article>
  );

};

export default ProductCard;
