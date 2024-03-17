import getProductById from "@/utils/db/getProductById";
import Image from "next/image";
import ShareButton from "@/components/buttons/icons/ShareButton";
import FavoriteButton from "@/components/buttons/icons/FavoriteButton";
import ProductSlider from "@/components/sliders/ProductSlider";
import ProductOffers from "@/components/sections/ProductOffers";
import ProductDetails from "@/components/items/ProductDetails";
import Link from "next/link";
import getCategoryName from "@/utils/getCategoryName";
import ProductNav from "@/components/sections/ProductNav";
import ProductSkeleton from "@/components/loadingSkeletons/Product";
import { Suspense } from "react";
import ProductHistoryDetection from "@/components/providers/ProductHistoryDetection";

export const revalidate = 60;

export default async function Product({ params }) {
  const productId = params.id;
  const productGender = params.genderString;

  return (
    <main>
      <ProductHistoryDetection productId={productId}>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductContent productId={productId} productGender={productGender} />
        </Suspense>
      </ProductHistoryDetection>
    </main>
  );
}

async function ProductContent({ productId, productGender }) {
  const data = await getProductById(productId, productGender);

  return (
    <>
      <section className="flex flex-col h-screen relative">
        <ProductNav
          is_sustainable={data.is_sustainable}
          discount={data.discount}
          brand={data.brands}
        />

        <div className=" flex-grow flex flex-col justify-end min-h-[600px] relative mb-5">
          <ProductSlider images={data.images} />
          <div className="relative">
            <div className="absolute flex justify-end gap-6 items-center ml-auto -top-14 container z-10">
              <ShareButton url={""} />
              <FavoriteButton />
            </div>
            <div className="bg-white h-[167px] rounded-tl-[28px] rounded-tr-[28px] shadow-[0px_-20px_30px_0px_#00000010] container">
              <div className="flex flex-row gap-4 pb-6 pt-8">
                <Link href={"/"}>
                  <Image
                    src={data.brands.logo_url}
                    width={35}
                    height={35}
                    alt={data.brands.name}
                    className="rounded-full shadow-md"
                  />
                </Link>

                <h5 className="font-semibold truncate">
                  {getCategoryName(data.categories.id)} {data.brands.name}
                </h5>
              </div>
              <Link
                href={"/"}
                className="bg-dark block hover:bg-dark_gray text-center text-white py-3.5 font-semibold rounded"
              >
                Ver as melhores ofertas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="flex flex-col pt-5 mb-16 gap-16 h-fit">
        <ProductOffers
          offers={data.offers}
          discount={data.discount}
          productGender={productGender}
          productId={productId}
        />
        <ProductDetails productDetails={data} />
      </section>
    </>
  );
}
