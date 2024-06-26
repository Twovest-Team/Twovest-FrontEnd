"use client";

import MainSlider from "@/components/Carousel/MainSlider";
import PontosDeEntregaCard from "@/components/cards/PontosDeEntregaCard";
import getProductsByViews from "@/utils/db/getProductsByViews";
import { PopularProductsSilder } from "@/components/sliders/PopularProducts";
import { useEffect, useState } from "react";
import getBrands from "@/utils/db/getBrands";
import { BrandCards } from "@/components/cards/BrandCards";
import { LooksHomepage } from "@/components/cards/LooksHomepage";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import useGender from "@/hooks/client-hooks/useGender";
import Button from "@/components/buttons/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GeneralLoading from "@/components/loaders/GeneralLoading";

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
        let resp = await getBrands(9);
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

  if (!gender) return <GeneralLoading />;

  return (
    <main>
      <MainSlider />

      <section className="mt-14 mb-2">
        <h1 className="font-semibold text-h6 container">Mais Procurados 🔥</h1>
        <div className="flex my-6 overflow-auto overflow-x-scroll">
          {dataPopular && <PopularProductsSilder data={dataPopular} />}
        </div>
      </section>

      <section className="mt-14 mb-24">
        {brands && <BrandCards data={brands} gender={gender} />}
      </section>

      {looks && looks.length > 0 &&
        <section className="mt-14 py-24 text-white bg-black ">
          <article>
            <h1 className="font-semibold mb-6 text-h6 container ">Galeria de Looks</h1>

            <div className="flex overflow-auto mb-4">
              <LooksHomepage data={looks} />
            </div>

            <div className="container md:flex justify-between items-start mt-10">
              <p className="mb-6">🔥 Descobre novos looks e inspira-te!</p>

              <div className="md:w-[18rem]">
                <Button
                  type="white-outlined"
                  ariaLabel="Ir para a Galeria de Looks"
                  width="100%"
                  justify="space-between"
                  href={`/gallery/${gender.string}`}
                >
                  <span>Ir para a galeria</span>
                  <KeyboardArrowRightIcon
                    className="translate-x-2"
                    sx={{ fontSize: 28 }}
                  />
                </Button>
              </div>
            </div>
          </article>
        </section>
      }


      <section
        style={{
          backgroundImage: `url('/static/images/homepage/pontosdeentregabg.png')`,
        }}
        className="h-screen md:h-[70vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center text-white sectionDesktopHomepageDelivery"
      >
        <PontosDeEntregaCard />
      </section>
    </main>
  );
}
