import Image from "next/image";
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
import SaveLookIconButton from "../collections/SaveLookIconButton";

// Componente que mostra o name de utilizador apenas se estiver em vista de 1 coluna
import LookUsername from "../items/LookUsername";
import Link from "next/link";
import { UserIcon } from "../user/UserIcon";
import MenuLook from "../collections/MenuLook";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";


export default function LookCard({
  look,
  slider,
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

  if(!isCollectionCard) return (
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
            {!slider ? <SaveLookIconButton lookId={look.id} /> : slider === true && null}
          </div>
        </div>
      </div>
  );
}
