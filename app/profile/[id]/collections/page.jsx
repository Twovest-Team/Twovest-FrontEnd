
import NavigationTitle from "@/components/providers/NavigationTitle";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import CollectionList from "@/components/collections/CollectionList";
import getCollections from "@/utils/db/collections/getCollections";
import getUserById from "@/utils/db/getUserById";
import CreateCollectionIconButton from "@/components/collections/CreateCollectionIconButton";
import SegmentIcon from '@mui/icons-material/Segment';
import IconButton from "@/components/buttons/icons/IconButton";
import getUserFirstName from "@/utils/getUserFirstName";

// Lista de coleções de um utilizador
const Collections = async ({ params }) => {

  const ownerId = params.id
  const currentUser = await useAuthServer()
  const isAdmin = currentUser ? currentUser.id == ownerId : false
  const ownerData = isAdmin ? currentUser : await getUserById(ownerId)
  const ownerFirstName = getUserFirstName(ownerData)
  const collectionsData = await getCollections(ownerId);

  return (
    <main className="min-h-screen pb-10">

      <div>
        <NavigationTitle titleText={isAdmin ? "As minhas coleções" : `Coleções de ${ownerFirstName}`}>
          <div className="flex justify-between gap-5">
            <IconButton icon={<SegmentIcon />} />
            <CreateCollectionIconButton isAdmin={isAdmin} />
          </div>
        </NavigationTitle>
      </div>

      <div className="container">
        {collectionsData ?
          <CollectionList collections={collectionsData} ownerId={ownerId} isOwner={isAdmin} search={true} />
          :
          <NoResultsNotice
          title={'Sem coleções :('}
          text={'Esta conta não tem coleções'}
          btnText='Voltar ao perfil'
          btnHref={`/profile/${params.id}`}
          />
        }
      </div>


    </main>
  );
};

export default Collections;

