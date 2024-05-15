
import NavigationTitle from "@/components/providers/NavigationTitle";
import LookCard from "@/components/cards/LookCard";
import { redirect } from "next/navigation";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import getCollectionData from "@/utils/db/collections/getCollectionData";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import InviteToCollectionButton from "@/components/collections/InviteToCollectionButton";
import InvitationToCollection from "@/components/collections/InvitationToCollection";
import MenuCollection from "@/components/collections/MenuCollection";
import { checkMembership, checkOwnerId, checkOwnership, createStylesSet } from "@/utils/handlers/handleCollections";
import GridBox from "@/components/providers/GridBox";
import TopbarFilters from "@/components/items/TopbarFilters";
import { getTopbarFilters } from "@/utils/handlers/handleFilters";

const Collection = async ({ params, searchParams }) => {

  const currentUser = await useAuthServer();
  const collectionId = params.idCollection;
  const collectionData = await getCollectionData(collectionId);

  // verificar quando não consegue ir buscar a data da coleção
  if (!collectionData) redirect('/');

  const ownerId = checkOwnerId(collectionData.members);
  const isOwnCollection = checkOwnership(currentUser?.id, ownerId)
  const isMember = !isOwnCollection ? checkMembership(collectionData.members, currentUser?.id) : true
  const privacy = collectionData.privacy;
  const shareId = collectionData.share_id;

  if (!isOwnCollection && currentUser && !isMember && privacy === 1) redirect('/');
  if (!currentUser && privacy === 1) redirect('/login');

  const collectionStyles = createStylesSet(collectionData);
  const filteredStyles = getTopbarFilters(searchParams)

  const renderCards = () => {

    const { looks } = collectionData;

    function filterLooks() {
      const filteredLooks = [];
      for (let i = 0; i < looks.length; i++) {
        const currentLook = looks[i];
        const commonValues = currentLook.styles.filter(style => filteredStyles.includes(style.name));
        if (commonValues.length > 0) {
          filteredLooks.push(currentLook);
        }
      }
      return filteredLooks;
    }

    const filteredLooks = filteredStyles && filteredStyles.length > 0 ? filterLooks() : looks

    return (
      <GridBox fixed>
        {filteredLooks.map(look => (
          <LookCard
            key={look.id}
            look={look}
            collectionData={collectionData}
            collectionId={collectionId}
            isMember={isMember}
          />
        ))}
      </GridBox>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavigationTitle titleText={collectionData.name}>
        <div className="flex gap-5 items-center">

          {isOwnCollection && (
            <InviteToCollectionButton collectionId={collectionId} collectionShareId={shareId} />
          )}

          <MenuCollection collectionData={collectionData} collectionId={collectionId} isOwnCollection={isOwnCollection} isMember={isMember} privacy={privacy} />

        </div>
      </NavigationTitle>

      <TopbarFilters elements={collectionStyles} />

      <div className="mt-6">
        {collectionData && collectionData.looks.length > 0 ?
          renderCards()
          :
          <>
            <NoResultsNotice
              icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: 60 }} />}
              title={'Coleção sem looks'}
              text={'Vai à descoberta de novos looks e inspira-te.'}
              btnText={'Ir para a Galeria'}
              btnHref={'/login'}
            />
          </>
        }
      </div>



      {!isOwnCollection && currentUser && !isMember &&
        <InvitationToCollection collectionId={collectionId} collectionShareId={shareId} />
      }

    </main>
  )
};

export default Collection;


