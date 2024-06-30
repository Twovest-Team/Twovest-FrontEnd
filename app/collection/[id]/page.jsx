
import NavigationTitle from "@/components/providers/NavigationTitle";
import LookCard from "@/components/cards/LookCard";
import { redirect } from "next/navigation";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import InvitationToCollection from "@/components/collections/InvitationToCollection";
import MenuCollection from "@/components/collections/MenuCollection";
import { createStylesSet, getOwnCollectionData } from "@/utils/handlers/handleCollections";
import GridBox from "@/components/providers/GridBox";
import TopbarFilters from "@/components/items/TopbarFilters";
import { getTopbarFilters } from "@/utils/handlers/handleFilters";
import CollectionShowcase from "@/components/collections/CollectionShowcase";
import getCollectionData from "@/utils/db/collections/getCollectionData";
import LooksSkeleton from "@/components/loaders/Looks";
import InviteToCollectionButton from "@/components/collections/InviteToCollectionButton";


const Collection = async ({ params, searchParams }) => {

  const currentUser = await useAuthServer();
  const collectionId = params.id;
  const collectionData = await (async () => currentUser && 
  (await getOwnCollectionData(currentUser, collectionId) || await getCollectionData(collectionId)))();

  // verificar quando não consegue ir buscar a data da coleção
  if (!collectionData) redirect('/');

  const isAdmin = currentUser && collectionData.is_admin
  const isMember = currentUser && collectionData.members.find(member => member.id == currentUser.id)

  const privacy = collectionData.privacy;
  const shareId = collectionData.share_id;
  const invitationId = searchParams.invite

  console.log(searchParams)
  if (!isAdmin && !isMember && privacy === 1 && invitationId !== shareId) redirect('/');

  const collectionStyles = createStylesSet(collectionData);
  const filteredStyles = getTopbarFilters(searchParams)

  const renderCards = () => {

    if (!isAdmin && !isMember && privacy === 1) {
      return (
        <GridBox fixed loader={<LooksSkeleton />}>
          <LooksSkeleton />
        </GridBox>
      )
    }

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
      <GridBox fixed loader={<LooksSkeleton />} >
        {filteredLooks.map(look => (
          <LookCard
            key={look.id}
            look={look}
            collectionData={collectionData}
            collectionId={collectionId}
            isMember={isMember}
            submitter={look.submitter}
          />
        ))}
      </GridBox>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <NavigationTitle titleText={collectionData.looks.length === 0 ? collectionData.name : ''}>

        <div className="flex gap-5 items-center">

          {isAdmin && collectionData.looks.length === 0 && (
            <InviteToCollectionButton collectionId={collectionId} collectionShareId={shareId} />
          )}

          <MenuCollection
            collectionData={collectionData}
            collectionId={collectionId}
            isAdmin={isAdmin}
            isMember={isMember}
            privacy={privacy}
          />

        </div>

      </NavigationTitle>

      {/* <TopbarFilters elements={collectionStyles} /> */}

      {collectionData && collectionData.looks.length > 0 ?
        <>
          <CollectionShowcase
            collectionData={collectionData}
            collectionId={collectionId}
            collectionShareId={shareId}
            isAdmin={isAdmin}
          />

          <div className="mt-6">
            {renderCards()}
          </div>
        </>
        :
        <div className="my-auto average:pb-20">
          <NoResultsNotice
            icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: 60 }} />}
            title={'Coleção sem looks'}
            text={'Vai à descoberta de novos looks e inspira-te.'}
            btnText={'Ir para a Galeria'}
            btnHref={'/login'} // TODO REVER ESTA LIGAÇÃO
          />
        </div>
      }




      {!isAdmin && !isMember &&
        <InvitationToCollection
          currentUser={currentUser}
          collectionData={collectionData}
          collectionId={collectionId}
          collectionShareId={shareId}
        />
      }

    </main>
  )
};

export default Collection;


