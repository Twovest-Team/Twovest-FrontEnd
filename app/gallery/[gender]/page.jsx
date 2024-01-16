import Views from "@/components/providers/Views";
import ItemsBox from "@/components/providers/ItemsBox";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import { Suspense } from "react";
import LooksSkeleton from "@/components/loadingSkeletons/Looks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Filters from "@/components/filters_gallery/filtersGallery";

export const revalidate = 0;

// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = async ({ params, searchParams }) => {
  const gender = params.gender;
  const style = searchParams.style;

  return (
    <main>
      <div className="galerie_title">
        <ArrowBackIosIcon />
        <h5 className="text-black text-[23.04px] font-semibold">Galeria</h5>
        <div className="galerie_points">
          <p className="w-[106px] h-[17px] text-neutral-400 text-base font-normal leading-snug">
            Ganha pontos
          </p>
          <HelpOutlineIcon className=" text-neutral-400 w-5 h-5 content-baseline" />
        </div>
      </div>
      <div className="galerie_filters">
        <Filters 
        gender={gender}
        />
      </div>
      <div className="view_submit">
        <Views className="view"/>
        <button className="submit">Submeter Look</button>
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

  if (style !== "Todos") {
    filteredData = data.filter((look) => look.styles[0] == style);
  }

  return (
    <>
      {filteredData.length > 0 ? (
        <ItemsBox>
          {filteredData.map((element) => (
            <LookCard key={element.id} look={element} gender={gender} />
          ))}
        </ItemsBox>
      ) : (
        <p>No data...</p>
      )}
    </>
  );
}
