import GridViews from "@/components/providers/GridViews";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import LooksSkeleton from "@/components/loaders/Looks";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import GridBox from "@/components/providers/GridBox";
import TopbarFilters from "@/components/items/TopbarFilters";
import getAllStyles from "@/utils/db/getAllStyles";
import { getTopbarFilters } from "@/utils/handlers/handleFilters";
import SubmitLookButton from "@/components/buttons/SubmitLookButton";
import EarnPointsModal from "@/components/modals/EarnPointsModal";

export const revalidate = 60;

const Gallery = async ({ params, searchParams }) => {

  const gender = params.genderString;


  const renderFilters = async () => {
    const items = await getAllStyles()
    if (!items) return null
    const arrayItems = items.map(item => item.name)
    arrayItems.unshift('Todos')
    return <TopbarFilters elements={arrayItems} />
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavigationTitle titleText={"Galeria de Looks"}>
        <EarnPointsModal />
      </NavigationTitle>

      {await renderFilters()}

      <div className="flex justify-between container my-5">
        <div className="flex items-center">
          <GridViews />
        </div>
        <SubmitLookButton />
      </div>

      <div className="my-auto h-full average:pb-20">
        <LookList gender={gender} searchParams={searchParams} />
      </div>

    </main>
  );
};

export default Gallery;

async function LookList({ gender, searchParams }) {

  const looks = await getLooksForGallery(gender);
  const filteredStyles = getTopbarFilters(searchParams);

  function filterLooks() {
    const filteredLooks = [];
    for (let i = 0; i < looks.length; i++) {
      const currentLook = looks[i];
      const commonValues = currentLook.styles.filter(style => filteredStyles.includes(style));
      if (commonValues.length > 0) {
        filteredLooks.push(currentLook);
      }
    }
    return filteredLooks;
  }

  const filteredLooks = filteredStyles && filteredStyles.length > 0 ? filterLooks() : looks

  return (
    <>
      {filteredLooks.length > 0 ? (
        <>
          <GridBox loader={<LooksSkeleton />}>
            {filteredLooks.map((element) => (
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
