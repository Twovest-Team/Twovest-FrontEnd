import GridViews from "@/components/providers/GridViews";
import ItemsBox from "@/components/providers/ItemsBox";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import { Suspense } from "react";
import LooksSkeleton from "@/components/loaders/Looks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FiltersGallery from "@/components/sliders/FiltersGallery";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import Button from "@/components/buttons/Button";
import GridBox from "@/components/providers/GridBox";

export const revalidate = 60;

// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = async ({ params, searchParams }, context) => {

  const gender = params.genderString;
  const style = searchParams.style;

  return (
    <main>
      <NavigationTitle titleText={"Galeria de Looks"}>
        <div className="flex gap-2 text-secondary items-center">
          <p
            className="hidden sm:block text-right text-gray-700"
            aria-label="Ganhar Pontos"
          >
            Ganhar pontos
          </p>
          <HelpOutlineIcon />
        </div>
      </NavigationTitle>

      <FiltersGallery currentCategory={style} />

      <div className="flex justify-between container mt-4 mb-6">
        <div className="flex items-center">
          <GridViews />
        </div>
        <div>
          <Button
            href={"/gallery/submitLook"}
            type={"primary"}
            ariaLabel="Submeter look"
          >
            Submeter look
          </Button>
        </div>
      </div>


      <LookList gender={gender} style={style} />

    </main>
  );
};

export default Gallery;

async function LookList({ gender, style }) {
  const data = await getLooksForGallery(gender);
  let filteredData = data;
  if (style && style !== "Todos") {
    filteredData = data.filter((look) => look.styles.includes(style));
  }

  return (
    <>
      {filteredData.length > 0 ? (
        <>
          <GridBox loader={<LooksSkeleton />}>
            {filteredData.map((element) => (
              <LookCard key={element.id} look={element} slider={false} />
            ))}
          </GridBox>
        </>
      ) : (
        <NoResultsNotice
          title={"Não encontramos looks."}
          text={"Infelizmente não temos looks disponíveis para esta categoria."}
          btnText={"Ir para Geral"}
        />
      )}
    </>
  );
}
