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


/*Card de look da galeria, funcional tanto para vista de 1 coluna como 2 colunas.
Utiliza tanto o componente de Upvote (LookUpvoteButton) como de guardar look, icone de bookmark
(SaveLookButton)
 */

export default function LookCard({ look, slider, name, collectionData, collectionId, isMember }) {

  // Detect if card is showing on a collection or not
  const isCollectionCard = collectionData && collectionId

  if (isCollectionCard) return (
    <figure>
      <Link href={`/gallery/look/${look.id}`} className="relative w-full max-w-[460px] aspect-[17/26] flex justify-center items-center">
        <Image
          src={look.url_image}
          alt="Look da galeria"
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


  )

  return (
    <>
      <div
        className={`${
          !slider ? "max-w-[460px]" : slider && "w-[160px] min-w-[160px]"
        } `}
      >
        <Link
          href={`/gallery/look/${look.id}`}
          className="w-full aspect-[17/26] relative flex justify-center items-center"
        >
          <Image
            src={look.url_image}
            alt="Look da galeria"
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
            {/* <Image
              src={!slider ? look.users.img : slider === true && avatar}
              alt="Look da galeria"
              width={35}
              height={35}
              quality={30}
              className="rounded-full"
            />
 */}
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
            {!slider ? <SaveLookButton /> : slider === true && null}
          </div>
        </div>
      </div>
    </>
  );
}
