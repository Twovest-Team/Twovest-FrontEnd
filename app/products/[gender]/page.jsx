import { categories } from "@/constants";
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import NavigationTitle from "@/components/providers/NavigationTitle";
import FilterButton from "@/components/buttons/icons/FilterButton";
import Views from "@/components/providers/Views";
import CardProduct from "@/components/cards/CardProduct";
import ItemsBox from "@/components/providers/ItemsBox";
import { Suspense } from "react";
import ProductsSkeleton from "@/components/loadingSkeletons/Products";

export const revalidate = 30;

export default async function Products({ searchParams, params }) {
  const category = searchParams.category;
  const categoryId = categories.find((object) => object.plural === category).id;
  const gender = params.gender;

  return (
    <main>
      <NavigationTitle titleText={category}>
        <span className="min-[350px]:hidden">
          <FilterButton />
        </span>
      </NavigationTitle>

      <div className="container flex justify-between h-7 max-[350px]:hidden mb-6">
        <Views />
        <FilterButton />
      </div>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList categoryId={categoryId} gender={gender} />
      </Suspense>
    </main>
  );
}

async function ProductList({ categoryId, gender }) {
  const data = await getProductsByCategory(
    categoryId,
    capitalizeFirstLetter(gender)
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
        <p>No data...</p>
      )}
    </>
  );
}
