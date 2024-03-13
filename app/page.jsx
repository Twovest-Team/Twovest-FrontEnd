"use client";

import ImageSwiper from "@/components/Carousel/Swiper";
import { Buttons } from "@/components/buttons/Buttons";
import PontosDeEntregaCard from "@/components/cards/PontosDeEntregaCard";
import getProductsByViews from "@/utils/db/getProductsByViews";
import getLocalStorage from "@/utils/localStorage/getLocalStorage";
import { PopularProductsSilder } from "@/components/sliders/PopularProducts";
import { useEffect, useState } from "react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import getBrandsHomepage from "@/utils/db/getBrandsHomepage";
import { BrandCards } from "@/components/cards/BrandCards";
import Link from "next/link";
import { LooksHomepage } from "@/components/cards/LooksHomepage";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";

export default function Home() {
  let gender;
  const [dataPopular, setDataPopular] = useState();
  const [brands, setBrands] = useState();
  const [looks, setLooks] = useState();

  if (typeof window !== "undefined") {
    gender = getLocalStorage("gender");
  }

  useEffect(() => {
    if (!dataPopular && gender && !brands) {
      async function getData() {
        let res = await getProductsByViews(capitalizeFirstLetter(gender));
        setDataPopular(res);
      }
      async function getBrandsData() {
        let resp = await getBrandsHomepage();
        setBrands(resp);
      }
      async function getLooks() {
        let res = await getLooksForHomepage(capitalizeFirstLetter(gender));
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

      <section className="mt-14 mb-24 sectionDesktopTopSearched">
        <h6 className="font-semibold px-6 px-desktop">Mais Procurados 🔥</h6>
        <div className="flex my-6 overflow-auto">
          {dataPopular && <PopularProductsSilder data={dataPopular} />}
        </div>
      </section>

      <section className="mt-14 mb-24 px-6 sectionDesktopHomepageBrands">
        <h6 className="font-semibold mb-4">Marcas</h6>
        {brands && <BrandCards data={brands} gender={gender} />}
        <Link href={"/brands"} className="text-right font-semibold ">
          <div className="my-3">Ver todas as marcas -&gt;</div>
        </Link>
      </section>

      <section className="mt-14 py-20 text-white bg-black sectionDesktopHomepageGallery">
        <h6 className="font-semibold mb-6 px-6 ">Galeria de Looks</h6>
        <div className="flex overflow-auto mb-4">
          {looks && <LooksHomepage data={looks} />}
        </div>
        <div className="px-6 pt-1">
          <p className="mb-4">🔥 Descobre novos looks e inspira-te!</p>

          <Link href={`/gallery/${gender}`}>
            <Buttons
              ariaLabel={"Ir para a Galeria"}
              btnState={"galeryMain"}
              text={"Ir para a Galeria"}
              icon={"navigateNext"}
              btnSize={"modalSize"}
            />
          </Link>
        </div>
      </section>

      <section
        style={{
          backgroundImage: `url('/images/homepage/pontosdeentregabg.png')`,
        }}
        className="h-screen bg-cover bg-center flex items-center justify-center text-white sectionDesktopHomepageDelivery"
      >
        <PontosDeEntregaCard />
      </section>
    </main>
  );
}
("");
