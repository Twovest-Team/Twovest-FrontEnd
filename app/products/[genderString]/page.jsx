import { categories } from "@/constants";
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import getSustainableProducts from "@/utils/db/getSustainableProducts";
import getOnSaleProducts from "@/utils/db/getOnSaleProducts";
import NavigationTitle from "@/components/providers/NavigationTitle";
import FilterButton from "@/components/buttons/icons/FilterButton";
import GridViews from "@/components/providers/GridViews";
import ProductCard from "@/components/cards/ProductCard";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/loaders/Products";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import GridBox from "@/components/providers/GridBox";

export const revalidate = 60;

export default async function Products({ searchParams, params }) {
  const { category, status } = searchParams;
  const { genderString: gender } = params;

  let navTitle = category || (status === "sustainable" ? "Produtos Sustentáveis" : status === "discounts" ? "Promoções" : "");

  return (
    <main>
      <NavigationTitle titleText={navTitle}>
        <span className='min-[390px]:hidden'>
          <FilterButton />
        </span>
      </NavigationTitle>

      <div className='container flex justify-between h-7 max-[390px]:hidden mb-6'>
        <GridViews />
        <FilterButton />
      </div>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList category={category} status={status} gender={gender} />
      </Suspense>
    </main>
  );
}

async function ProductList({ category, status, gender }) {
  let data = [];

  if (category) {
    const categoryId = categories.find(obj => obj.plural === category)?.id;
    data = await getProductsByCategory(categoryId, gender);
  } else if (status === "sustainable") {
    data = await getSustainableProducts(gender);
  } else if (status === "discounts") {
    data = await getOnSaleProducts(gender);
  }

  return (
    <>
      {data.length > 0 ? (
        <GridBox loader={<ProductsSkeleton />}>
          {data.map(element => (
            <li className="list-none" key={element.id}>
              <ProductCard slider={false} key={element.id} product={element} gender={gender} />
            </li>
          ))}
        </GridBox>
      ) : (
        <NoResultsNotice text={"Não há produtos registados nesta categoria."} />
      )}
    </>
  );
}
