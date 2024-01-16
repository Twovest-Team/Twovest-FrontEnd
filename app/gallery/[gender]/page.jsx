import Views from "@/components/providers/Views";
import ItemsBox from "@/components/providers/ItemsBox";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import { Suspense } from "react";
import LooksSkeleton from "@/components/loadingSkeletons/Looks";

export const revalidate = 0;

// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = async ({ params }) => {
  const gender = params.gender;

  return (
    <main>
      <div className="container flex justify-between h-7">
        <Views />
      </div>

      <Suspense fallback={<LooksSkeleton />}>
        <LookList gender={gender} />
      </Suspense>
    </main>
  );
};

export default Gallery;

async function LookList({ gender }) {
  const data = await getLooksForGallery(gender);

  return (
    <>
      {data.length > 0 ? (
        <ItemsBox>
          {data.map((element) => (
            <LookCard key={element.id} look={element} slider={false} />
          ))}
        </ItemsBox>
      ) : (
        <p>No data...</p>
      )}
    </>
  );
}
