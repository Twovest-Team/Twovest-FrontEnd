
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import useAuthServer from "@/hooks/useAuthServer";
import CollectionList from "@/components/collections/CollectionList";
import getCollections from "@/utils/db/collections/getCollections";
import getUserById from "@/utils/db/getUserById";
import CreateCollectionButton from "@/components/collections/CreateCollectionButton";
import SegmentIcon from '@mui/icons-material/Segment';
import IconButton from "@/components/buttons/icons/IconButton";
import { checkOwnership } from "@/utils/handleCollections";
import getUserFirstName from "@/utils/getUserFirstName";

// Lista de coleções de um utilizador
const Collections = async ({ params }) => {

  const ownerId = params.id
  const currentUser = await useAuthServer()
  const isOwnCollections = currentUser ? checkOwnership(currentUser.id, ownerId) : false;
  const ownerData = isOwnCollections ? currentUser : await getUserById(ownerId)
  const ownerFirstName = getUserFirstName(ownerData)
  const collectionsData = await getCollections({ ownerId });

  return (
    <main className="min-h-screen pb-10">

      <div>
        <NavigationTitle titleText={isOwnCollections ? "As minhas coleções" : `Coleções de ${ownerFirstName}`}>
          <div className="flex justify-between gap-5">
            <IconButton icon={<SegmentIcon />} />
            <CreateCollectionButton isOwnCollections={isOwnCollections} />
          </div>
        </NavigationTitle>
      </div>

      <div className="container">
        {collectionsData ?
          <CollectionList collections={collectionsData} ownerId={ownerId} isOwner={isOwnCollections} search={true} />
          :
          <NoResultsNotice text={'Utilizador não tem coleções'} />
        }
      </div>


    </main>
  );
};

export default Collections;

