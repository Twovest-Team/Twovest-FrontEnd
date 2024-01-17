import getUserByEmailServer from "@/utils/db/getUserByEmailServer";
import getInfoForCollectionPage from "@/utils/db/getInfoForCollectionPage";
import NavigationTitle from "@/components/providers/NavigationTitle";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ShareButton from "@/components/buttons/icons/ShareButton";
import Image from "next/image";
import LookCard from "@/components/cards/LookCard";
import { redirect } from "next/navigation";
import { Buttons } from "@/components/buttons/Buttons";
import ItemsBox from "@/components/providers/ItemsBox";
import Views from "@/components/providers/Views";
import CollectionPrivacyTag from "@/components/items/CollectionPrivacyTag";

// Coleção específica de um utilizador
const Collection = async ({ params }) => {

  const currentUser = await getUserByEmailServer();
  const collectionOwnerId = params.id
  const collectionId = params.idCollection
  let isOwnCollection = false;

  if (collectionOwnerId && currentUser && collectionOwnerId == currentUser.id) {
    isOwnCollection = true;
  }

  const data = await getInfoForCollectionPage(collectionId, collectionOwnerId);
  const privacy = data[0].privacy


  return (
    <>
      <NavigationTitle titleText={data[0].name}>
        <div className="flex gap-4 items-center">
          {isOwnCollection ? <CreateOutlinedIcon /> : null}
          {privacy == 2 && <ShareButton />}
        </div>
      </NavigationTitle>

      <div className="container flex items-center justify-between h-7 mb-6">
        <div className="flex-grow">
        <Views />
        </div>

        {privacy == 3 && <CollectionPrivacyTag users={data[0].collectionUsers} privacy={privacy} />}
      

      </div>

      <ItemsBox fixedView={2}>
        {data && data[0].looks && data[0].looks.map(look => (
          <LookCard
            key={look.id_look}
            look={look.looks}
            nome={look.userLook[0].name}
            avatar={look.userLook[0].img}
          />
        ))}
      </ItemsBox>
    </>
  )
};

export default Collection;


