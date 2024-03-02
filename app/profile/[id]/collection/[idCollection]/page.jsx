
import getCollectionData from "@/utils/db/collections/getCollectionData";
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
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Link from "next/link";
import useAuthServer from "@/hooks/useAuthServer";


// Coleção específica de um utilizador
const Collection = async ({ params }) => {

  const currentUser = useAuthServer();
  const collectionOwnerId = params.id
  const collectionId = params.idCollection
  let isOwnCollection = false;
  const data = await getCollectionData(collectionId, collectionOwnerId);
  const privacy = data[0].privacy

  //Este verificação deve incluir coleções partilhadas no futuro.
  if (collectionOwnerId && currentUser && collectionOwnerId == currentUser.id) {
    isOwnCollection = true;
  }else if (currentUser && collectionOwnerId != currentUser.id && privacy == 1 || !currentUser && privacy == 1){
    redirect('/')
  }

  return (
    <main className="h-screen overflow-y-auto flex flex-col">
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

      {data && data[0].looks ?
        <ItemsBox fixedView={2}>
          {data[0].looks.map(look => (
            <LookCard
              key={look.id_look}
              look={look.looks}
              nome={look.userLook[0].name}
              avatar={look.userLook[0].img}
            />
          ))}
        </ItemsBox>
        :
        <div className="h-full flex flex-col justify-center items-center gap-1 mb-12">
          <BookmarkBorderOutlinedIcon sx={{ fontSize: 60 }} className="mb-4" />
          <h6 className="font-semibold">Coleção sem looks</h6>
          <p className="text-center text-secondary mb-4">Vai à descoberta de novos looks<br /> e inspira-te.</p>
          <Link href={"/login"} className="bg-dark text-white font-semibold px-9 py-3.5 rounded w-fit" >Ir para a Galeria</Link>
        </div>
      }

    </main>
  )
};

export default Collection;


