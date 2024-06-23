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
import { reverseLooksOrder } from "@/utils/handlers/handleCollections";
import { useAppDispatch } from "@/redux/hooks";
import { showNotification } from "@/redux/slices/notificationSlice";
import { useState } from "react";


export default function CollectionPreview({ collection, lookId, showcaseImages }) {

  const { isMobile } = useWindow()
  const dispatch = useAppDispatch()
  const { currentUser } = useAuth()
  const { name, privacy, users: otherParticipants, looks } = collection;
  const length = looks.length;
  const [isSaved, setIsSaved] = useState(lookId ? looks.some(item => item.id == lookId) : null)

  function renderImages() {

    const figureWidth = showcaseImages ? 126: 86
    const figureHeight = showcaseImages ? 130: 90
    let previewLookCards = []
    const reversedLooks = reverseLooksOrder(looks)

    if (length > 0) {
      for (let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  quality={100}
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className={`${showcaseImages ? 'max-h-[130px]' : 'max-h-[90px]'} h-full left-0 top-0 z-20 absolute rounded-[16px] object-cover`}
                />
              )
            } else {
              previewLookCards.push(
                <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} z-10 left-[14px] top-0 absolute bg-dark_gray rounded-[16px]  border-white`} />
              )
            }
            break;
          case 1:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  quality={100}
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className={`${showcaseImages ? 'max-h-[130px]' : 'max-h-[90px]'} h-full left-[14px] top-0 z-10 absolute rounded-[16px] object-cover`}
                />
              )
            } else {
              previewLookCards.push(
                <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} z-10 left-[14px] top-0 absolute bg-grey rounded-[16px]  border-white`} />
              )
            }

            break;
          case 2:
            if (reversedLooks[i]) {
              previewLookCards.push(
                <Image
                  quality={100}
                  key={i}
                  src={getStorageImage(reversedLooks[i].url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className={`${showcaseImages ? 'max-h-[130px]' : 'max-h-[90px]'} h-full left-[28px] top-0 absolute rounded-[16px] object-cover`}
                />
              )
            } else {
              previewLookCards.push(
                <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[16px]  border-white`} />
              )
            }

            break;
        }
      }
    } else {
      previewLookCards = (
        <>
          <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} z-20 left-0 top-0 absolute bg-secondary rounded-[16px]  border-white text-white flex justify-start pt-2 pl-2`}>
            <BookmarkRoundedIcon className="text-white" sx={{ fontSize: 22 }} />
          </div>
          <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} z-10 left-[14px] top-0 absolute bg-grey rounded-[16px]  border-white`} />
          <div className={`${showcaseImages ? 'w-[126px] h-[130px]' : 'w-[86px] h-[90px]'} left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[16px]  border-white`} />
        </>
      )
    }

    return (
      <div className={`${showcaseImages ? 'h-[130px] mr-5' : 'h-[90px]'} grid`}>
        <div className={`${showcaseImages ? 'w-[126px]' : 'w-[110px]'} h-full relative [&>*]:border-4 [&>img]:border-white`}>
          {previewLookCards}
        </div>
      </div>

    )
  }

  function renderDetails() {
    return (
      <div className={`ml-4 gap-2 flex flex-col ${!lookId ? 'justify-between' : 'justify-center'} items-stretch h-full`}>

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

    const buttonProps = {
      onClick: isSaved ? handleRemoveLook : handleSaveLook,
      icon: isSaved ? <BookmarkRoundedIcon sx={{ fontSize: 25 }} /> : <BookmarkBorderOutlinedIcon sx={{ fontSize: 25 }} />,
      className: 'border border-grey_opacity_50 ' + (!isSaved ? 'shadow-sm' : ''),
      type: isSaved ? 'black' : 'white',
      ariaLabel: `Guardar look na coleção: ${name}`,
    };

    if (isMobile) {
      buttonProps.padding = '16px';
      buttonProps.onlyIcon = true;
    } else {
      buttonProps.height = '48px';
      buttonProps.width = '142px';
    }

    const buttonText = !isMobile && (isSaved ? 'Remover' : 'Guardar');

    async function handleRemoveLook() {
      setIsSaved(false)

      const isRemoveSuccessfull = await deleteCollectionLook(collection.id, lookId)
      if (isRemoveSuccessfull) {
        dispatch(showNotification('removedLook'));
      }
      if (!isRemoveSuccessfull) {
        setIsSaved(true)
        dispatch(showNotification('errorRemovingLook'));

      }
    }

    async function handleSaveLook() {
      setIsSaved(true)
      const isSaveSuccessfull = await addToCollection(collection.id, lookId, currentUser.id)
      if (isSaveSuccessfull) {
        dispatch(showNotification('savedLook'));
      }
      if (!isSaveSuccessfull) {
        setIsSaved(false)
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
          <div className="flex-grow flex justify-end h-full items-center">
            <Button padding="0 1.2rem" justify="space-between" {...buttonProps}>
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
        {!showcaseImages &&
          <>
            {renderDetails()}
            {renderOptions()}
          </>
        }
      </>
    )
  }

  return (
    <>

      {/* PREVIEW CARD WHEN SHOWCASING COLLECTION */}
      {!lookId &&
        <Link href={`/collection/${collection.id}`} className="items-start w-fit w-full flex flex-row my-1">
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
