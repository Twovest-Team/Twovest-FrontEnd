
import NavigationTitle from "@/components/providers/NavigationTitle";
import FilterButton from "@/components/buttons/icons/FilterButton";
import GridViews from "@/components/providers/GridViews";
import ProductCard from "@/components/cards/ProductCard";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ProductsSkeleton from "@/components/loaders/Products";
import getProductsByBrand from "@/utils/db/getProductsByBrand";
import getBrandData from "@/utils/db/getBrandData";
import Image from "next/image";
import BrandGenderButtons from "@/components/buttons/BrandGenderButtons";
import StarIcon from '@mui/icons-material/Star';
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import { genders } from "@/constants";
import GridBox from "@/components/providers/GridBox";
import getStorageImage from "@/utils/getStorageImage";
import IconButton from "@/components/buttons/icons/IconButton";

export const revalidate = 0;

export default async function Brand({ params }) {

  const gender = params.genderString;

  const brandName = decodeURIComponent(params.brand);
  const brandData = await getBrandData(brandName)

  return (
    <main>

      <div style={{ backgroundImage: `url(${getStorageImage(brandData.cover_url)})` }} className="h-52 bg-center bg-cover relative">
        <NavigationTitle hasImageBehind={true} titleText={brandName}>
          <div className="opacity-70 bg-gradient-to-b from-dark h-1/2 absolute w-full top-0 left-0" />
          <div className="opacity-70 bg-gradient-to-t from-dark h-1/2 absolute w-full bottom-0 left-0" />

          <div className='sm:hidden z-10'>
            <IconButton
              icon={<InfoOutlinedIcon sx={{ fontSize: 28 }} />}
              darkMode={true}
            />
          </div>

          <button
            className='hidden bg-white bg-opacity-40 hover:bg-opacity-20 text-white sm:flex  transition-all duration-200 px-5 py-2 rounded-full  caption gap-2 items-center font-semibold z-10'>
            <span className='pt-0.5'>Sobre a marca</span>
          </button>

        </NavigationTitle>

        <div className="absolute right-0 left-0 -bottom-12 mx-auto flex justify-center w-full flex-col items-center gap-10">
          <figure className="relative">
            <Image className="rounded-full shadow-lg border-[7px] border-white" width={130} height={130} src={getStorageImage(brandData.logo_url)} alt={brandData.name} />
            <p className="flex gap-1 items-center bg-dark border-white border-2 absolute font-semibold px-3 rounded-full py-2 text-white  -bottom-4 left-0 right-0 mx-auto w-fit"><span className="caption translate-y-[1px]">4.5</span> <StarIcon sx={{ fontSize: 18 }} /></p>
          </figure>



          {/* <BrandGenderButtons currentGender={gender} brandName={brandName} /> */}

        </div>

      </div>


      <div className="container flex justify-between h-7 max-[390px]:hidden mt-24 mb-6">
        <GridViews />
        <FilterButton />
      </div>


      <ProductList brandName={brandName} gender={gender} />


    </main>
  );
}


async function ProductList({ brandName, gender }) {
  const data = await getProductsByBrand(
    gender,
    brandName
  );

  return (
    <>
      {data && data.length > 0 ? (
        <GridBox loader={<ProductsSkeleton />}>
          {data.map((element) => (
            <ProductCard
              slider={false}
              key={element.id}
              product={element}
              gender={gender}
            />
          ))}
        </GridBox>
      ) : (
        <NoResultsNotice title={'Ups!'} text={'Sem produtos disponíveis.'} />
      )}
    </>
  );
}
