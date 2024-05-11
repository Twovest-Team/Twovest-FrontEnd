import Link from "next/link";
import Image from "next/image";
import { categories } from "@/constants";
import PriceProduct from "../items/PriceProduct";
import SellIcon from "@mui/icons-material/Sell";
import { SustainableIcon } from "../buttons/icons/SustainableIcon";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";

// Gender prop can be either string or num
const CardProduct = ({ product, slider, gender, alignPrice }) => {
  const categoryName = categories.find(
    (element) => element.id === product.categories.id
  ).singular;

  const genderObj = getGender(gender);

  return (
    <article
      className={`w-full ${
        slider ? "max-w-[160px]" : "max-w-[460px]"
      } flex-5 mb-2`}
    >
      <div className="w-full rounded border-grey border aspect-[3/4] relative flex justify-center items-center">
        <Link href={`/product/${genderObj.string}/${product.id}`}>
          <Image
            src={getStorageImage(product.images[0].url)}
            alt={product.images[0].alt}
            className="object-cover scale-90"
            fill={true}
          />
        </Link>

        <div className="absolute top-2.5 px-4 w-full flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Link href={`/brands/${genderObj.string}/${product.brands.name}`}>
              <Image
                src={getStorageImage(product.brands.logo_url)}
                width={25}
                height={25}
                alt={product.brands.name}
                className="rounded-full shadow-lg"
              />
            </Link>
          </div>

          {product.is_sustainable && (
            <SustainableIcon color={"#05CE86"} width={28} />
          )}
        </div>

        {product.discount > 0 && (
          <Link href={`/product/${genderObj.string})}/${product.id}`}>
            <div className="h-11 bg-primary_main absolute bottom-5 text-white flex items-center gap-2 font-medium px-3.5 rounded-tr rounded-br left-0">
              <SellIcon sx={{ fontSize: 20 }} />
              {product.discount}% OFF
            </div>
          </Link>
        )}
      </div>
      <div
        className={`flex flex-wrap justify-between items-center mt-2.5 gap-y-1 ${
          slider && "w-40"
        }`}
      >
        <p className="truncate font-semibold w-40">
          {categoryName} {product.brands.name}
        </p>

        {product.offers && (
          <PriceProduct
            alignPrice={alignPrice}
            discount={product.discount}
            offers={product.offers}
          />
        )}
      </div>
    </article>
  );
};

export default CardProduct;
