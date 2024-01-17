import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FiltersProduct from "@/components/filters_product/filtersProduct";
import ProductsFiltered from "@/components/filters_product/productsFiltered";
import getProductOffers from "@/utils/db/getProductOffers";
import getProductById from "@/utils/db/getProductById";

async function AllOffers({ params }) {
  const data = await getProductOffers(params.id);
  const productData = await getProductById(params.id, params.gender);

  return (
    <>
      <div className="allOffers_title">
        <ArrowBackIosIcon />
        <p className="text-black text-[23.04px] font-semibold">Ofertas</p>
        <p className="text-neutral-400 text-base font-normal leading-snug">
          {data.length} opções
        </p>
      </div>
      <FiltersProduct />
      <ProductsFiltered offers={data} discount={productData.discount} />
    </>
  );
}

export default AllOffers;
