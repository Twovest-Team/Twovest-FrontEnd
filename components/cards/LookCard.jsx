import Image from "next/image";
//Botão de upvote no topo direito da card de look
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
//Botão de guardar (bookmark) no canto inferior direito da card de look
import SaveLookButton from "../collections/SaveLookButton";

// Componente que mostra o name de utilizador apenas se estiver em vista de 1 coluna
import LookUsername from "../items/LookUsername";
import Link from "next/link";
import { UserIcon } from "../user/UserIcon";
import MenuLook from "../collections/MenuLook";
import { genders } from "@/constants";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";


/*Card de look da galeria, funcional tanto para vista de 1 coluna como 2 colunas.
Utiliza tanto o componente de Upvote (LookUpvoteButton) como de guardar look, icone de bookmark
(SaveLookButton)
 */

export default function LookCard({
  look,
  slider,
  name,
  collectionData,
  collectionId,
  isMember,
}) {
  // Detect if card is showing on a collection or not
  const isCollectionCard = collectionData && collectionId

  const gender = getGender(look.gender)

  if (isCollectionCard) return (
    <figure>
      <Link href={`/gallery/${gender.string}/${look.id}`} className="relative w-full aspect-[17/26] flex justify-center items-center">
        <Image
          src={getStorageImage(look.url_image)}
          alt={`Look de ${look.owner.name}`}
          className="object-cover scale-100 rounded"
          quality={5}
          fill={true}
        />
      </Link>

        <MenuLook
          collectionData={collectionData}
          collectionId={collectionId}
          isMember={isMember}
          lookId={look.id}
        />
      </figure>
    );

  return (
    <>
      <div
        className={`w-full aspect-[17/26] ${
          slider && "w-[160px] min-w-[160px]"
        } `}
      >
        <Link
          href={`/gallery/${gender.string}/${look.id}`}
          className="w-full h-full relative flex justify-center items-center"
        >
          <Image
            src={getStorageImage(look.url_image)}
            alt={`Look de ${look.users.name}`}
            className="object-cover scale-100 rounded"
            quality={5}
            fill={true}
          />
          {!slider ? (
            <LookUpvoteButton upvotes={look.upvotes} />
          ) : (
            slider === true && null
          )}
        </Link>
        <div className="flex flex-wrap justify-between items-center">
          <Link
            href={`/profile/${look.users.id}`}
            className="flex gap-2  min-w-0 items-center mt-3.5"
          >
            <UserIcon
              url={look.users.img}
              userRole={look.users.role}
              size="small"
              userName={look.users.name}
              userId={look.users.id}
            />
            <LookUsername
              slider={slider}
              username={!slider ? look.users.name : slider === true && name}
            />
          </Link>

          <div className="mt-3.5">
            {!slider ? <SaveLookButton lookId={look.id} /> : slider === true && null}
          </div>
        </div>
      </div>
    </>
  );
}
