// Página do perfil da marca
// Exemplo: twovest.com/brands

import NavigationTitle from "@/components/providers/NavigationTitle";
import BrandsList from "@/components/sections/BrandsList";
import getBrands from "@/utils/db/getBrands";

const Brands = async () => {
  const data = await getBrands();

  return (
    <div>
      <NavigationTitle titleText={"Marcas"} />

      <div className="container flex flex-col gap-6 mb-10">
        <BrandsList brandsData={data} />
      </div>
    </div>
  );
};

export default Brands;
