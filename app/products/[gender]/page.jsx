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
import getSustainableProducts from "@/utils/db/getSustainableProducts";
import getOnSaleProducts from "@/utils/db/getOnSaleProducts";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const revalidate = 30;

export default async function Products({ searchParams, params }) {
  const category = searchParams.category;
  const gender = params.gender;
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
          <Views />
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
          <Views />
          <FilterButton />
        </div>

        <Suspense fallback={<ProductsSkeleton />}>
          <ProductList status={status} gender={gender} />
        </Suspense>
      </main>
    );
  }
}

async function ProductList({ categoryId, gender, status }) {
  if (categoryId) {
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
          <div className="h-screen container text-center"><InfoOutlinedIcon className="text-[60px] mt-16 mb-6"/><div>Não há produtos registados nesta categoria.</div></div>
        )}
      </>
    );
  } else if (status == "sustainable") {
    const data = await getSustainableProducts(capitalizeFirstLetter(gender));
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
          <div className="h-screen container text-center"><InfoOutlinedIcon className="text-[60px] mt-16 mb-6"/><div>Não há produtos registados nesta categoria.</div></div>
        )}
      </>
    );
  } else if (status == "discounts") {
    const data = await getOnSaleProducts(capitalizeFirstLetter(gender));

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
          <div className="h-screen container text-center"><InfoOutlinedIcon className="text-[60px] mt-16 mb-6"/><div>Não há produtos registados nesta categoria.</div></div>
        )}
      </>
    );
  }
}
