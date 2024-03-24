"use client";

import ImageSwiper from "@/components/Carousel/Swiper";
import { Buttons } from "@/components/buttons/Buttons";
import PontosDeEntregaCard from "@/components/cards/PontosDeEntregaCard";
import getProductsByViews from "@/utils/db/getProductsByViews";
import { PopularProductsSilder } from "@/components/sliders/PopularProducts";
import { useEffect, useState } from "react";
import getBrandsHomepage from "@/utils/db/getBrandsHomepage";
import { BrandCards } from "@/components/cards/BrandCards";
import Link from "next/link";
import { LooksHomepage } from "@/components/cards/LooksHomepage";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import useGender from "@/hooks/client-hooks/useGender";

export default function Home() {

  let [gender] = useGender();

  const [dataPopular, setDataPopular] = useState();
  const [brands, setBrands] = useState();
  const [looks, setLooks] = useState();

  useEffect(() => {
    if (!dataPopular && gender && !brands) {
      async function getData() {
        let res = await getProductsByViews(gender.id);
        setDataPopular(res);
      }
      async function getBrandsData() {
        let resp = await getBrandsHomepage();
        setBrands(resp);
      }
      async function getLooks() {
        let res = await getLooksForHomepage(gender.id);
        setLooks(res);
      }
      getData();
      getBrandsData();
      getLooks();
    }
  }, [brands, dataPopular, gender]);

  return (
    <main>
      <ImageSwiper />

      <section className="mt-14 mb-2 mx-24">
        <h6 className="font-semibold container">Mais Procurados 🔥</h6>
        <div className="flex my-6 overflow-auto overflow-x-scroll">
          {dataPopular && <PopularProductsSilder data={dataPopular} />}
        </div>
      </section>

      <section className="mt-14 mb-24">
        {brands && <BrandCards data={brands} gender={gender} />}
      </section>

      <section className="mt-14 py-24 text-white bg-black ">
        <article>
          <h6 className="font-semibold mb-6 container ">Galeria de Looks</h6>

          <div className="flex overflow-auto mb-4">
            {looks && <LooksHomepage data={looks} />}
          </div>

          <div className="container">
            <p className="my-5">🔥 Descobre novos looks e inspira-te!</p>

            <Buttons
              ariaLabel={"Ir para a Galeria"}
              btnState={"galeryMain"}
              text={"Ir para a Galeria ->"}
              btnSize={"modalSize6"}
            />

          </div>

        </article>
      </section>

      <section
        style={{
          backgroundImage: `url('/images/homepage/pontosdeentregabg.png')`,
        }}
        className="h-screen md:h-[70vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center text-white sectionDesktopHomepageDelivery"
      >
        <PontosDeEntregaCard />
      </section>
    </main>
  );
}

