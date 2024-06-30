
import MainSlider from "@/components/Carousel/MainSlider";
import PontosDeEntregaCard from "@/components/cards/PontosDeEntregaCard";
import getProductsByViews from "@/utils/db/getProductsByViews";
import { ProductsSlider } from "@/components/sliders/ProductsSlider";
import getBrands from "@/utils/db/getBrands";
import { BrandCards } from "@/components/cards/BrandCards";
import { LooksHomepage } from "@/components/cards/LooksHomepage";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import Button from "@/components/buttons/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GeneralLoading from "@/components/loaders/GeneralLoading";
import getGender from "@/utils/getGender";
import getProducts from "@/utils/db/getProducts";
import LookShowcaseCard from "@/components/cards/LookShowcaseCard";

export default async function Home({ params }) {

  const gender = getGender(params.gender)

  if (!gender) return <GeneralLoading />;

  const productsMostViewed = await getProductsByViews(gender.id);
  const productsSustainable = await getProducts(null, gender.id, true, false, 10)
  const productsOnSale = await getProducts(null, gender.id, false, true, 10)
  const brands = await getBrands(9);
  const looks = await getLooksForHomepage(gender.id);


  return (
    <main>

      <div className="h-screen">
        <MainSlider currentGender={gender} />
      </div>

      <section className="mt-14 mb-2">
        <h1 className="font-semibold text-h6 container">Mais Procurados 🔥</h1>
        <div className="flex my-6">
          {productsMostViewed && productsMostViewed.length > 0 && <ProductsSlider data={productsMostViewed} />}
        </div>
      </section>



      <LookShowcaseCard
        title='Looks urbanos 🏬'
        subtitle='Explora e inspira-te para criar o teu visual verdadeiramente citadino.'
        btnText='Explorar looks ->'
        btnLink={`${gender.string}/gallery?filter=Urbano`}
        src={`/static/images/looks/urban_${gender.string}.webp`}
      />

      <section className="mt-14 mb-24">
        {brands && brands.length > 0 && <BrandCards data={brands} gender={gender} />}
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
                  href={`/${gender.string}/gallery`}
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

      <section className="mt-14 mb-2">
        <h1 className="font-semibold text-h6 container">Promoções ⭐</h1>
        <div className="flex my-6 overflow-auto">
          {productsOnSale && productsOnSale.length > 0 && <ProductsSlider data={productsOnSale} />}
        </div>
      </section>

      <LookShowcaseCard
        title='Verão aí à porta 🌻'
        subtitle='Descobre os melhores looks de verão na galeria.'
        btnText='Explorar looks ->'
        btnLink={`${gender.string}/gallery`}
        src={`/static/images/looks/summer_${gender.string}.webp`}
      />

      <section className="mt-14 mb-2">
        <h1 className="font-semibold text-h6 container">Artigos Sustentáveis 🍀</h1>
        <div className="flex my-6 overflow-auto">
          {productsSustainable && productsSustainable.length > 0 && <ProductsSlider data={productsSustainable} />}
        </div>
      </section>

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
