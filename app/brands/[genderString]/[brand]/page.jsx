
import NavigationTitle from "@/components/providers/NavigationTitle";
import FilterButton from "@/components/buttons/icons/FilterButton";
import Views from "@/components/providers/Views";
import CardProduct from "@/components/cards/CardProduct";
import ItemsBox from "@/components/providers/ItemsBox";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/loadingSkeletons/Products";
import getProductByBrand from "@/utils/db/getProductsByBrand";
import getBrandData from "@/utils/db/getBrandData";
import Image from "next/image";
import BrandGenderButtons from "@/components/buttons/BrandGenderButtons";
import StarIcon from '@mui/icons-material/Star';
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import { genders } from "@/constants";

export const revalidate = 30;

export default async function Brand({ params }) {

  const gender = params.genderString;

  const brandName = decodeURIComponent(params.brand);
  const brandData = await getBrandData(brandName)

  return (
    <main>

      <div style={{ backgroundImage: `url(${brandData.cover_url})` }} className="h-96 bg-center bg-cover relative">
        <NavigationTitle hasImageBehind={true} titleText={brandName}>
          <div className="opacity-70 bg-gradient-to-b from-dark h-1/2 absolute w-full top-0 left-0" />
          <div className="opacity-70 bg-gradient-to-t from-dark h-1/2 absolute w-full bottom-0 left-0" />
          <button className="text-white z-10 underline underline-offset-2">Sobre a marca</button>
        </NavigationTitle>

        <div className="absolute right-0 left-0 bottom-10 mx-auto flex justify-center w-full flex-col items-center gap-10">
          <figure className="relative">
          <Image className="rounded-full shadow-lg" width={130} height={130} src={brandData.logo_url} alt={brandData.name}/>
          <p className="flex gap-1 items-center bg-dark border-white border absolute font-semibold px-3 rounded-full py-2 text-white  -bottom-4 left-0 right-0 mx-auto w-fit"><span className="caption translate-y-[1px]">4.5</span> <StarIcon sx={{ fontSize: 18 }} /></p>
          </figure>
          
            

          {/* <BrandGenderButtons currentGender={gender} brandName={brandName} /> */}

        </div>

      </div>


      <div className="container flex justify-between h-7 max-[350px]:hidden mt-6 mb-6">
        <Views />
        <FilterButton />
      </div>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList brandName={brandName} gender={gender} />
      </Suspense>


    </main>
  );
}


async function ProductList({ brandName, gender }) {
  const data = await getProductByBrand(
    gender,
    brandName
  );
  
  return (
    <>
      {data.length > 0 ? (
        <ItemsBox>
          {data.map((element) => (
            <CardProduct
              slider={false}
              key={element.id}
              product={element}
              gender={gender}
            />
          ))}
        </ItemsBox>
      ) : (
        <NoResultsNotice title={'Ups!'} text={'Sem produtos disponíveis.'} />
      )}
    </>
  );
}
