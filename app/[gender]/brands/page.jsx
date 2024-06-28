import NavigationTitle from "@/components/providers/NavigationTitle";
import BrandsList from "@/components/sections/BrandsList";
import getBrands from "@/utils/db/getBrands";

const Brands = async ({params}) => {
  
  const gender = params.gender
  const data = await getBrands();
  
  return (
    <div>
      <NavigationTitle titleText={"Marcas"} />

      <div className="container desktop flex flex-col gap-6 mb-10">
        <BrandsList brandsData={data} gender={gender} />
      </div>
    </div>
  );
};

export default Brands;
