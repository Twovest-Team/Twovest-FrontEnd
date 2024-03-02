import getInfoForProfilePage from "@/utils/db/getInfoForProfilePage";
import NavigationTitle from "@/components/providers/NavigationTitle";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CollectionPreview from "@/components/items/CollectionPreview";
import SearchIcon from "@mui/icons-material/Search";
import { NoDataComponent } from "@/components/sections/NoDataComponent";
import withAuthServer from "@/hocs/withAuthServer";

// Lista de coleções de um utilizador
const Collections = async ({ params, currentUser }) => {

  const collectionOwnerId = params.id
  let isOwnCollections = false;

  if (collectionOwnerId && currentUser && collectionOwnerId == currentUser.id) {
    isOwnCollections = true;
  }

  const data = await getInfoForProfilePage(collectionOwnerId);
  const userFirstName = data[0].name.split(" ")[0];

  return (
    <main className="h-screen overflow-y-scroll">

      <div>
        <NavigationTitle
          titleText={isOwnCollections ? "As minhas coleções" : `Coleções de ${userFirstName}`}
        >
          {isOwnCollections ? <CreateOutlinedIcon /> : null}
        </NavigationTitle>
      </div>


      {data ?
        <AllUserCollections
          data={data}
          isOwnCollections={isOwnCollections}
          userFirstName={userFirstName}
          collectionOwnerId={collectionOwnerId}
        />
        :
        <NoDataComponent text={'Utilizador não tem coleções'} />
      }

    </main>

  );
};

export default withAuthServer(Collections);

async function AllUserCollections({ data, isOwnCollections, userFirstName, collectionOwnerId }) {

  let collectionsToShow = data[0].colecoes

  if (!isOwnCollections) {
    collectionsToShow = collectionsToShow.filter(collection => (
      collection.collections.privacy == 2 && collection.is_admin === true
    ))
  }

  return (
    <div className="flex flex-col items-start self-stretch container pb-10 gap-4 ">

      {isOwnCollections && collectionsToShow.length === 0 &&
        <div className="text-secondary">
          Ainda não criaste nenhuma coleção.
        </div>
      }

      {!isOwnCollections && collectionsToShow.length === 0 &&
        <div className="text-secondary">
          {userFirstName} não tem coleções disponíveis.
        </div>
      }

      {collectionsToShow.length > 0 &&
        <>
          <button className="profile_search-collections">
            <SearchIcon />
            Procurar coleções
          </button>
          {collectionsToShow.map((element) => (
              <CollectionPreview
                userId={collectionOwnerId}
                collection={element}
                key={element.id_collection}
              />
          ))}
        </>
      }

    </div>

  );
}
