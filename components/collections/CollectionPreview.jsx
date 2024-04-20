'use client'

import Image from "next/image";
import CollectionPrivacyTag from "./CollectionPrivacyTag";
import ShareButton from "../buttons/icons/ShareButton";
import Link from "next/link";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import IconButton from "../buttons/icons/IconButton";
import getStorageImage from "@/utils/getStorageImage";
import Button from "../buttons/Button";
import useWindow from "@/hooks/client-hooks/useWindow";


//Componente de card da coleção
// Mostra diferentes tipos de card dependendo no número de coleções presentes (3 ou mais, 2 , ou 1 ), da sua privacidade
//(publica, privada ou partilhada) e também muda o nome e o número de looks

export default function CollectionPreview({ collection, lookToSave }) {

  const { isMobile, height } = useWindow()

  const { collections: { name, privacy }, users: otherParticipants, looks } = collection;
  const length = looks.length;

  console.log(collection)
  console.log(lookToSave)

  function renderImages() {

    const figureWidth = 86
    const figureHeight = 90
    let previewLookCards = []

    if (length > 0) {
      for (let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            if (looks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(looks[i].looks.url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] left-0 top-0 z-20 absolute rounded-[10px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-dark_gray rounded-[10px] border-[3.5px] border-white`} />
              )
            }
            break;
          case 1:
            if (looks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(looks[i].looks.url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] left-[14px] top-0 z-10 absolute rounded-[10px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded-[10px] border-[3.5px] border-white`} />
              )
            }

            break;
          case 2:
            if (looks[i]) {
              previewLookCards.push(
                <Image
                  key={i}
                  src={getStorageImage(looks[i].looks.url_image)}
                  alt="Look da coleção"
                  width={figureWidth}
                  height={figureHeight}
                  className="max-h-[90px] left-[28px] top-0 absolute rounded-[10px] object-cover"
                />
              )
            } else {
              previewLookCards.push(
                <div className={`w-[86px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[10px] border-[3.5px] border-white`} />
              )
            }

            break;
        }
      }
    } else {
      previewLookCards = (
        <>
          <div className="w-[86px] h-[90px] z-20 left-0 top-0 absolute bg-secondary rounded-[10px] border-[3.5px] border-white text-white flex justify-start pt-2 pl-2">
            <BookmarkRoundedIcon className="text-white" sx={{ fontSize: 22 }} />
          </div>
          <div className="w-[86px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded-[10px] border-[3.5px] border-white" />
          <div className="w-[86px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded-[10px] border-[3.5px] border-white" />
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
      <div className={`ml-4 flex flex-col ${!lookToSave ? 'justify-between' : 'justify-center'} items-stretch h-full`}>

        {!lookToSave &&
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

        {lookToSave &&
          <>
            <p className="font-semibold line-clamp-1">{name}</p>
            <p className="caption text-start text-secondary">{length + (length == 1 ? ' look' : ' looks')}</p>
          </>
        }


      </div>
    )
  }

  function renderOptions() {
    return (
      <>
        {privacy == 2 && !lookToSave &&
          <div className="ml-auto"> <ShareButton /></div>
        }

        {lookToSave &&
          <div className="flex-grow flex justify-end h-full items-center mr-8">

            {isMobile ?
              <Button className='shadow border border-grey_opacity_50' padding={4} type={'white'} onlyIcon={true} ariaLabel={`Guardar look na coleção: ${name}`}>
                <BookmarkBorderOutlinedIcon sx={{ fontSize: 25 }} />
              </Button>
              :
              <Button padding={5} height={12} className='shadow border border-grey_opacity_50' type={'white'} ariaLabel={`Guardar look na coleção: ${name}`}>
                <BookmarkBorderOutlinedIcon sx={{ fontSize: 25 }} />
                Guardar
              </Button>
            }



          </div>
        }
      </>
    )
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
      {!lookToSave &&
        <Link href={`/collection/${collection.id_collection}`} className="items-start h-[90px] w-full flex flex-row my-1">
          {renderContent()}
        </Link>
      }

      {/* PREVIEW CARD WHEN SAVING A LOOK TO COLLECTION */}
      {lookToSave &&
        <div className="items-start h-[90px] w-full flex flex-row my-1">
          {renderContent()}
        </div>
      }
    </>
  )
}
