import { categories } from "@/constants";
import getProducts from "@/utils/db/getProducts";
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
    const { gender } = params;

    let navTitle = category || (status === "sustainable" ? "Produtos Sustentáveis" : status === "discounts" ? "Promoções" : "");

    return (
        <main className="min-h-screen flex flex-col">
            <NavigationTitle titleText={navTitle}>
                <span className='[@media(min-width:390px)]:hidden'>
                    <FilterButton />
                </span>
            </NavigationTitle>

            <div className='container flex justify-between h-7 mb-6 [@media(max-width:390px)]:hidden'>
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
        data = await getProducts(categoryId, gender);
    } else if (status === "sustainable") {
        data = await getProducts(null, gender, true, false);
    } else if (status === "discounts") {
        data = await getProducts(null, gender, false, true);
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
                <div className="flex-grow flex justify-center items-center w-full average:pb-20">
                    <NoResultsNotice
                        title={'Não encontramos artigos para ti.'}
                        text={"Não há produtos registados nesta categoria."}
                        btnText={"Voltar à página principal"}
                        btnHref={'/'}
                    />
                </div>
            )}
        </>
    );
}
