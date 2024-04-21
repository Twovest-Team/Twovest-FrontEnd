
import NavigationTitle from "@/components/providers/NavigationTitle";
import LookCard from "@/components/cards/LookCard";
import { redirect } from "next/navigation";
import ItemsBox from "@/components/providers/ItemsBox";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import getCollectionData from "@/utils/db/collections/getCollectionData";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import InviteToCollectionButton from "@/components/collections/InviteToCollectionButton";
import InvitationToCollection from "@/components/collections/InvitationToCollection";
import MenuCollection from "@/components/collections/MenuCollection";
import { checkOwnership, checkOwnerId, checkMembership } from "@/utils/handleCollections";
import GridBox from "@/components/providers/GridBox";


// Coleção específica de um utilizador
const Collection = async ({ params }) => {

  const currentUser = await useAuthServer()
  const collectionId = params.idCollection
  const collectionData = await getCollectionData(collectionId);

  // verificar quando não consegue ir buscar a data da coleção
  if (!collectionData) redirect('/')

  const ownerId = checkOwnerId(collectionData.members)
  const isOwnCollection = currentUser?.id === ownerId
  const isMember = !isOwnCollection && currentUser ? collectionData.members.some(member => member.id === currentUser.id) : !currentUser ? false : true
  const privacy = collectionData.privacy
  const shareId = collectionData.share_id

  if (!isOwnCollection && currentUser && !isMember && privacy === 1) redirect('/')
  if (!currentUser && privacy === 1) redirect('/login')

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

            
      {collectionData && collectionData.looks.length > 0 ?
        <GridBox fixed>
          {collectionData.looks.map(look => (
            <LookCard
              key={look.id}
              look={look}
              name={'Joaquim'}
              collectionData={collectionData}
              collectionId={collectionId}
              isMember={isMember}
            />
          ))}
        </GridBox>
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
     


      {!isOwnCollection && currentUser && !isMember &&
        <InvitationToCollection collectionId={collectionId} collectionShareId={shareId} />
      }

    </main>
  )
};

export default Collection;


