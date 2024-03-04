import Views from "@/components/providers/Views";
import ItemsBox from "@/components/providers/ItemsBox";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import { Suspense } from "react";
import LooksSkeleton from "@/components/loadingSkeletons/Looks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Filters from "@/components/filters_gallery/filtersGallery";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoDataComponent } from "@/components/sections/NoDataComponent";
import { Buttons } from "@/components/buttons/Buttons";
export const revalidate = 60;

// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = async ({ params, searchParams }) => {
  const gender = params.gender;
  const style = searchParams.style;
  return (
    <main>
      <NavigationTitle titleText={"Galeria"}>
        <div className="flex gap-2 text-secondary items-center">
          <p className="text-right text-gray-700" aria-label="Ganhar Pontos">
            Ganhar pontos
          </p>
          <HelpOutlineIcon />
        </div>
      </NavigationTitle>

      <div className="mt-4">
        <Filters style={style} gender={gender} />
      </div>

      <div className="flex justify-between container mt-4 mb-6">
        <div className="flex items-center">
          <Views className="view " />
        </div>
        <div>
          <Buttons
            aria-label="Submeter Look"
            btnState="defaultMain"
            text="Submeter Look"
            icon=""
            btnSize="gallerySize"
          ></Buttons>
        </div>
      </div>

      <Suspense fallback={<LooksSkeleton />}>
        <LookList gender={gender} style={style} />
      </Suspense>
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
          <ItemsBox>
            {filteredData.map((element) => (
              <LookCard key={element.id} look={element} slider={false} />
            ))}
          </ItemsBox>
        </>
      ) : (
        <NoDataComponent text={"Sem looks disponíveis."} />
      )}
    </>
  );
}
