import NavigationTitle from '@/components/providers/NavigationTitle';
import useAuthServer from '@/hooks/server-hooks/useAuthServer';
import { getOwnCollectionData } from '@/utils/handlers/handleCollections';
import MenuCollection from "@/components/collections/MenuCollection";
import CollectionShowcase from '@/components/collections/CollectionShowcase';
import getCollectionData from '@/utils/db/collections/getCollectionData';
import { redirect } from "next/navigation";

const Page = async ({ params, searchParams }) => {

  const currentUser = await useAuthServer();
  const collectionId = params.idCollection;
  const collectionData = currentUser ? await getOwnCollectionData(currentUser, collectionId) : await getCollectionData(collectionId)

  const isAdmin = collectionData.is_admin
  const isMember = !isAdmin ? currentUser && collectionData.members.find(member => member.id == currentUser.id) : true

  if (!currentUser || !isMember) redirect('/');

  const privacy = collectionData.privacy;
  const shareId = collectionData.share_id;


  return (
    <main>
      <NavigationTitle>
        <div className="flex gap-5 items-center">
          <MenuCollection
            collectionData={collectionData}
            collectionId={collectionId}
            isAdmin={isAdmin}
            isMember={isMember}
            privacy={privacy}
          />
        </div>
      </NavigationTitle>

      <div className='container'>

        <CollectionShowcase
          collectionData={collectionData}
          collectionId={collectionId}
          collectionShareId={shareId}
          isAdmin={isAdmin}
        />


      </div>

    </main>
  )
}

export default Page