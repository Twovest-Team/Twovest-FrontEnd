import Image from "next/image";
import CollectionPrivacyTag from "./CollectionPrivacyTag";
import ShareButton from "../buttons/icons/ShareButton";
import Link from "next/link";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

//Componente de card da coleção
// Mostra diferentes tipos de card dependendo no número de coleções presentes (3 ou mais, 2 , ou 1 ), da sua privacidade
//(publica, privada ou partilhada) e também muda o nome e o número de looks

export default function CollectionPreview({ collection, userId }) {

  const name = collection.collections.name;
  const privacy = collection.collections.privacy;
  const otherParticipants = collection.users;
  const looks = collection.looks;
  const looksLength = looks.length;

  //console.log(looks.length)
  let previewLookCards = []
  if (looks.length > 0) {
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 0:
          if (looks[i]) {
            previewLookCards.push(
              <Image
                key={i}
                src={looks[i].looks.url_image}
                alt="Look da coleção"
                width={80}
                height={90}
                style={{ width: "80px", height: "90px", objectFit: "cover" }}
                className="left-0 top-0 z-20 absolute rounded border-2 border-white object-cover"
              />
            )
          } else {
            previewLookCards.push(
              <div className="w-[80px] h-[90px] z-10 left-[14px] top-0 absolute bg-dark_gray rounded border-2 border-white" />
            )
          }
          break;
        case 1:
          if (looks[i]) {
            previewLookCards.push(
              <Image
                key={i}
                src={looks[i].looks.url_image}
                alt="Look da coleção"
                width={80}
                height={90}
                style={{ width: "80px", height: "90px", objectFit: "cover" }}
                className="left-[14px] top-0 z-10 absolute rounded border-2 border-white object-cover"
              />
            )
          } else {
            previewLookCards.push(
              <div className="w-[80px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded border-2 border-white" />
            )
          }

          break;
        case 2:
          if (looks[i]) {
            previewLookCards.push(
              <Image
                key={i}
                src={looks[i].looks.url_image}
                alt="Look da coleção"
                width={80}
                height={90}
                style={{ width: "80px", height: "90px", objectFit: "cover" }}
                className="left-[28px] top-0 absolute rounded border-2 border-white object-cover"
              />
            )
          } else {
            previewLookCards.push(
              <div className="w-[80px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded border-2 border-white" />

            )
          }

          break;
      }
    }
  }

  //IF looks.lenght === 0 (não tem looks e só mostrar para a própria pessoa)
  return (
    <Link href={`/profile/${userId}/collection/${collection.id_collection}`} className="items-start h-[90px] w-full flex flex-row my-1">


      <div className="h-[90px] grid">

        <div className="w-[108px] h-full relative">
          {looks.length > 0 ?
            <>
              {previewLookCards}
            </>
            :
            <>
              <div className="w-[80px] h-[90px] z-20 left-0 top-0 absolute bg-secondary shadow-sm rounded border-2 border-white text-white flex justify-center items-center">
                <BookmarkBorderOutlinedIcon className="text-white" sx={{ fontSize: 28 }}/>
              </div>
              <div className="w-[80px] h-[90px] z-10 left-[14px] top-0 absolute bg-grey rounded border-2 border-white" />
              <div className="w-[80px] h-[90px] left-[28px] top-0 absolute bg-grey_opacity_50 rounded border-2 border-white" />
            </>

          }
        </div>

      </div>




      <div className="ml-4 flex flex-col justify-between items-stretch h-full">
        <div>
          <p className="font-semibold line-clamp-1">{name}</p>
          <p className="caption text-start text-secondary">{looksLength} looks</p>
        </div>
        <CollectionPrivacyTag
          privacy={privacy}
          users={privacy === 3 ? otherParticipants : null}
        />
      </div>

      {privacy == 2 &&
        <div className="ml-auto"> <ShareButton /></div>
      }


    </Link>
  )


}
