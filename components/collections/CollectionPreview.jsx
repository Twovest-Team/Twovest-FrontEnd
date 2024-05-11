'use client'

import Image from "next/image";
import CollectionPrivacyTag from "./CollectionPrivacyTag";
import ShareButton from "../buttons/icons/ShareButton";
import Link from "next/link";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import getStorageImage from "@/utils/getStorageImage";
import Button from "../buttons/Button";
import useWindow from "@/hooks/client-hooks/useWindow";
import deleteCollectionLook from "@/utils/db/collections/deleteCollectionLook";
import addToCollection from "@/utils/db/collections/addToCollection";
import useAuth from "@/hooks/client-hooks/useAuth";
import { reverseLooksOrder } from "@/utils/handleCollections";
import { useAppDispatch } from "@/redux/hooks";
import { showNotification } from "@/redux/slices/notificationSlice";
import Notification from "../modals/Notification";


//Componente de card da coleção
// Mostra diferentes tipos de card dependendo no número de coleções presentes (3 ou mais, 2 , ou 1 ), da sua privacidade
//(publica, privada ou partilhada) e também muda o nome e o número de looks

export default function CollectionPreview({ collection, lookId }) {

  const { isMobile, height } = useWindow()
  const dispatch = useAppDispatch()
  const { currentUser } = useAuth()
  const { name, privacy, users: otherParticipants, looks } = collection;
  const length = looks.length;

  function renderImages() {

    const figureWidth = 86
    const figureHeight = 90
    let previewLookCards = []
    const reversedLooks = reverseLooksOrder(looks)

    if (length > 0) {
      for (let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] h-[90px] left-0 top-0 z-20 absolute rounded-[16px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-dark_gray rounded-[16px] border-[3.5px] border-white`} />
              )
            }
            break;
          case 1:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] h-[90px] left-[14px] top-0 z-10 absolute rounded-[16px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded-[16px] border-[3.5px] border-white`} />
              )
            }

            break;
          case 2:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] h-[90px] left-[28px] top-0 absolute rounded-[16px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[16px] border-[3.5px] border-white`} />
              )
            }

            break;
        }
      }
    } else {
      previewLookCards = (
        <>
          <div className="w-[86px] h-[90px] z-20 left-0 top-0 absolute bg-secondary rounded-[16px] border-[3.5px] border-white text-white flex justify-start pt-2 pl-2">
            <BookmarkRoundedIcon className="text-white" sx={{ fontSize: 22 }} />
          </div>
          <div className="w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded-[16px] border-[3.5px] border-white" />
          <div className="w-[86px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[16px] border-[3.5px] border-white" />
        </>
      )
    }

    return (
      <div className="h-[90px] grid">
        <div className="w-[108px] h-full relative [&>img]:border-[3.5px] [&>img]:border-white">
          {previewLookCards}
        </div>
      </div>

    )
  }

  function renderDetails() {
    return (
      <div className={`ml-4 flex flex-col ${!lookId ? 'justify-between' : 'justify-center'} items-stretch h-full`}>

        {!lookId &&
          <>
            <div>
              <p className="font-semibold line-clamp-1">{name}</p>
              <p className="caption text-start text-secondary">{length + (length == 1 ? ' look' : ' looks')}</p>
            </div>

            <CollectionPrivacyTag
              privacy={privacy}
              users={privacy === 3 ? otherParticipants : null}
            />
          </>
        }

        {lookId &&
          <>
            <p className="font-semibold line-clamp-1">{name}</p>
            <p className="caption text-start text-secondary">{length + (length == 1 ? ' look' : ' looks')}</p>
          </>
        }


      </div>
    )
  }

  function renderOptions() {
    const isSaved = looks.some(item => item.id == lookId);

    const buttonProps = {
      onClick: isSaved ? handleRemoveLook : handleSaveLook,
      icon: isSaved ? <BookmarkRoundedIcon sx={{ fontSize: 25 }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 25 }} />,
      className: 'shadow border border-grey_opacity_50',
      type: isSaved ? 'black' : 'white',
      ariaLabel: `Guardar look na coleção: ${name}`,
    };

    if (isMobile) {
      buttonProps.padding = 4;
      buttonProps.onlyIcon = true;
    } else {
      buttonProps.height = 12;
      buttonProps.width = '[142px]';
    }

    const buttonText = !isMobile && (isSaved ? 'Remover' : 'Guardar');

    async function handleRemoveLook() {
      const isRemoveSuccessfull = await deleteCollectionLook(collection.id, lookId)
      if (isRemoveSuccessfull) {
        dispatch(showNotification('removedLook'));
      }
      if (!isRemoveSuccessfull){
        dispatch(showNotification('errorRemovingLook'));

      }
    }

    async function handleSaveLook() {
      const isSaveSuccessfull = await addToCollection(collection.id, lookId, currentUser.id)
      if (isSaveSuccessfull) {
        dispatch(showNotification('savedLook'));
      }
      if (!isSaveSuccessfull){
        dispatch(showNotification('errorSavingLook'));
      }
    }

    return (
      <>
        {privacy == 2 && !lookId && (
          <div className="ml-auto">
            <ShareButton type="normal" />
          </div>
        )}

        {lookId && (
          <div className="flex-grow flex justify-end h-full items-center mr-5">
            <Button {...buttonProps}>
              {buttonProps.icon}
              {buttonText}
            </Button>
          </div>
        )}
      </>
    );
  }


  function renderContent() {
    return (
      <>
        {renderImages()}
        {renderDetails()}
        {renderOptions()}
      </>
    )
  }

  return (
    <>

      {/* PREVIEW CARD WHEN SHOWCASING COLLECTION */}
      {!lookId &&
        <Link href={`/collection/${collection.id}`} className="items-start h-[90px] w-full flex flex-row my-1">
          {renderContent()}
        </Link>
      }

      {/* PREVIEW CARD WHEN SAVING A LOOK TO COLLECTION */}
      {lookId &&
        <>
          <div className="items-start h-[90px] w-full flex flex-row my-1">
            {renderContent()}
          </div>

        </>
      }
    </>
  )
}
