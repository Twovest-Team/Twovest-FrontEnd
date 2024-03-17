import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FiltersProduct from "@/components/filters_product/filtersProduct";
import ProductsFiltered from "@/components/filters_product/productsFiltered";
import getProductOffers from "@/utils/db/getProductOffers";
import getProductById from "@/utils/db/getProductById";
import { categories, main_categories } from "@/constants";
import NavigationTitle from "@/components/providers/NavigationTitle";

async function AllOffers({ params, searchParams }) {
  const data = await getProductOffers(params.id);
  const productData = await getProductById(params.id, params.genderString);
  const productType = main_categories.find((category) => category.id.toString() == productData.categories.main_category);
  const productCategory = categories.find((category) => category.id.toString() == productData.categories.id);
  const color = searchParams.color;
  const condition = searchParams.condition;
  const size = searchParams.size;

  let filteredData = data;

  if (color) {
    filteredData = data.filter((offer) => offer.colors.name === color);
  }

  if (condition) {
    filteredData = data.filter((offer) => offer.conditions.name === condition);
  }

  if (size) {
    filteredData = data.filter((offer) => offer.sizes.size === size);
  }

  return (
    <>
      <NavigationTitle titleText={'Ofertas'}>
      <p className="text-neutral-400 text-base font-normal leading-snug">
          {filteredData.length} opções
        </p>
      </NavigationTitle>
      
      {/* <FiltersProduct productType={productType.singular} productId={params.id} gender={params.genderString}/> */}
      <ProductsFiltered offers={filteredData} discount={productData.discount} product={productData} productCategory={productCategory} />
    </>
  );
}

export default AllOffers;
