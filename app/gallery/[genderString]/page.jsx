import GridViews from "@/components/providers/GridViews";
import LookCard from "@/components/cards/LookCard";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import LooksSkeleton from "@/components/loaders/Looks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import Button from "@/components/buttons/Button";
import GridBox from "@/components/providers/GridBox";
import TopbarFilters from "@/components/items/TopbarFilters";
import getAllStyles from "@/utils/db/getAllStyles";
import { getTopbarFilters } from "@/utils/handleFilters";

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

      {renderFilters()}

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


      <LookList gender={gender} searchParams={searchParams} />

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
