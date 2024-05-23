import { categories } from "@/constants";
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import NavigationTitle from "@/components/providers/NavigationTitle";
import FilterButton from "@/components/buttons/icons/FilterButton";
import GridViews from "@/components/providers/GridViews";
import CardProduct from "@/components/cards/CardProduct";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/loaders/Products";
import getSustainableProducts from "@/utils/db/getSustainableProducts";
import getOnSaleProducts from "@/utils/db/getOnSaleProducts";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import GridBox from "@/components/providers/GridBox";

export const revalidate = 60;

export default async function Products({ searchParams, params }) {
  const category = searchParams.category;
  const gender = params.genderString;
  const status = searchParams.status;

  if (category) {
    const categoryId = categories.find(
      (object) => object.plural === category
    ).id;
    return (
      <main>
        <NavigationTitle titleText={category}>
          <span className="min-[350px]:hidden">
            <FilterButton />
          </span>
        </NavigationTitle>

        <div className="container flex justify-between h-7 max-[350px]:hidden mb-6">
          <GridViews />
          <FilterButton />
        </div>

        <Suspense fallback={<ProductsSkeleton />}>
          <ProductList categoryId={categoryId} gender={gender} />
        </Suspense>
      </main>
    );
  } else if (status) {
    var navTitle;
    if (status == "sustainable") {
      navTitle = "Produtos Sustentáveis";
    } else if (status == "discounts") {
      navTitle = "Promoções";
    }
    return (
      <main>
        <NavigationTitle titleText={navTitle}>
          <span className="min-[350px]:hidden">
            <FilterButton />
          </span>
        </NavigationTitle>

        <div className="container flex justify-between h-7 max-[350px]:hidden mb-6">
          <GridViews />
          <FilterButton />
        </div>

        <ProductList status={status} gender={gender} />
      </main>
    );
  }
}

async function ProductList({ categoryId, gender, status }) {
  if (categoryId) {
    const data = await getProductsByCategory(categoryId, gender);

    return (
      <>
        {data.length > 0 ? (
          <GridBox loader={<ProductsSkeleton />}>
            {data.map((element) => (
              <li key={element.id}>
                <CardProduct
                  slider={false}
                  key={element.id}
                  product={element}
                  gender={gender}
                />
              </li>
            ))}
          </GridBox>
        ) : (
          <NoResultsNotice
            text={"Não há produtos registados nesta categoria."}
          />
        )}
      </>
    );
  } else if (status == "sustainable") {
    const data = await getSustainableProducts(gender);
    return (
      <>
        {data.length > 0 ? (
          <GridBox loader={<ProductsSkeleton />}>
            {data.map((element) => (
              <CardProduct
                slider={false}
                key={element.id}
                product={element}
                gender={gender}
              />
            ))}
          </GridBox>
        ) : (
          <NoResultsNotice
            text={"Não há produtos registados nesta categoria."}
          />
        )}
      </>
    );
  } else if (status == "discounts") {
    const data = await getOnSaleProducts(gender);
    console.log(data);

    return (
      <>
        {data.length > 0 ? (
          <GridBox loader={<ProductsSkeleton />}>
            {data.map((element) => (
              <CardProduct
                slider={false}
                key={element.id}
                product={element}
                gender={gender}
              />
            ))}
          </GridBox>
        ) : (
          <NoResultsNotice
            text={"Não há produtos registados nesta categoria."}
          />
        )}
      </>
    );
  }
}
