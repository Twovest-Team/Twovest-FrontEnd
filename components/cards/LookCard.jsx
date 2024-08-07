import Image from "next/image";
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
import SaveLookIconButton from "../collections/SaveLookIconButton";

// Componente que mostra o name de utilizador apenas se estiver em vista de 1 coluna
import Link from "next/link";
import Avatar from "@/components/user/Avatar";
import MenuLook from "../collections/MenuLook";
import getGender from "@/utils/getGender";
import getStorageImage from "@/utils/getStorageImage";
import Button from "../buttons/Button";


export default function LookCard({
  look,
  slider,
  collectionData,
  collectionId,
  isMember,
  submitter
}) {

  const gender = getGender(look.gender)
  const cardType = getCardType();

  function getCardType() {
    if (!collectionData && !collectionId && !slider) return 'normal'
    if (collectionData && submitter && collectionId) return 'collection'
    if (slider) return 'slider'
  }

  function renderNormalCard() {
    return (
      <div
        className='w-full aspect-[17/26] pb-[46px] rounded relative bg-white transition-all duration-150 group'
      >
        <Link
          href={`/${gender.string}/gallery/${look.id}`}
          className="w-full h-full relative flex justify-center items-center"
        >
          <Image
            src={getStorageImage(look.url_image)}
            alt={`Look de ${look.users.name}`}
            className="object-cover scale-100 rounded"
            quality={5}
            fill={true}
          />


        </Link>


        <div className="absolute top-3 right-3">
          <LookUpvoteButton upvotes={look.upvotes} />
        </div>



        <div className="absolute bottom-0 left-0 right-0 overflow-hidden w-full h-[46px] xl:group-hover:h-[100px] bg-white transition-[height] duration-[350ms]">
          <div className="flex flex-wrap justify-between items-center pb-3 bg-white">
            <Link
              href={`/profile/${look.users.id}`}
              className="flex gap-2 min-w-0 items-center mt-3.5"
            >
              <Avatar
                user={look.users}
                size="sm"
              />
              <p className={`text-caption font-light truncate`}>
                {look.users.name}
              </p>
            </Link>

            <div className="mt-3.5">
              <SaveLookIconButton lookId={look.id} />
            </div>
          </div>

          <Button
            height="2.5rem"
            className="text-caption opacity-0 xl:group-hover:opacity-100 delay-300 transition-opacity duration-[350]"
            type='black'
            ariaLabel='Ver artigos do look'
            width='100%'
          >
            Ver artigos do look
          </Button>
        </div>

      </div>
    );
  }

  function renderCollectionCard() {

    return (
      <figure className="relative">

        <div className="absolute top-3 left-3 z-10">
          <Avatar
            size='sm'
            user={submitter}
          />
        </div>

        <Link href={`/${gender.string}/gallery/${look.id}`} className="relative w-full aspect-[17/26] flex justify-center items-center">
          <Image
            src={getStorageImage(look.url_image)}
            alt={`Look de ${look.owner.name}`}
            className="object-cover scale-100 rounded"
            quality={5}
            fill={true}
          />
        </Link>

        <MenuLook
          submitter={submitter}
          collectionData={collectionData}
          collectionId={collectionId}
          isMember={isMember}
          look={look}
        />
      </figure>
    );
  }

  function renderSliderCard() {

    return (
      <div
        className='aspect-[17/26] rounded w-[160px] sm:w-[200px] md:w-[250px] relative'
      >
        <Link
          href={`/${gender.string}/gallery/${look.id}`}
          className="w-full h-full relative flex justify-center items-center"
        >
          <Image
            src={getStorageImage(look.url_image)}
            alt={`Look de ${look.users.name}`}
            className="object-cover scale-100 rounded"
            quality={5}
            fill={true}
          />

        </Link>



        <div className="absolute bottom-0 left-0 right-0 overflow-hidden w-full z-10">
          <div className="flex flex-wrap justify-between items-center pb-3 px-3">
            <Link
              href={`/profile/${look.users.id}?option=looks`}
              className="flex gap-2 min-w-0 items-center mt-3.5"
            >
              <Avatar
                size='sm'
                user={look.users}
              />

              <p className={`text-caption font-light truncate`}>
                {look.users.name}
              </p>
            </Link>

          </div>
        </div>

        <div className="bg-gradient-to-t from-dark opacity-70 h-16 absolute bottom-0 left-0 right-0 w-full"></div>

      </div>
    );
  }

  return (
    <>
      {cardType === 'normal' && renderNormalCard()}
      {cardType === 'collection' && renderCollectionCard()}
      {cardType === 'slider' && renderSliderCard()}
    </>
  )
}
