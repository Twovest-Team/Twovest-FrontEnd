import Image from "next/image";
//Botão de upvote no topo direito da card de look
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
//Botão de guardar (bookmark) no canto inferior direito da card de look
import SaveLookButton from "../collections/SaveLookButton";

// Componente que mostra o nome de utilizador apenas se estiver em vista de 1 coluna
import LookUsername from "../items/LookUsername";
import Link from "next/link";
import SaveToCollectionModal from "@/components/modals/SaveToCollectionModal";
import { UserIcon } from "../user/UserIcon";

/*Card de look da galeria, funcional tanto para vista de 1 coluna como 2 colunas.
Utiliza tanto o componente de Upvote (LookUpvoteButton) como de guardar look, icone de bookmark
(SaveLookButton)
 */

export default function LookCard_Profile({ look, slider, nome, avatar }) {

  //console.log(look);
  return (
    <>
      <div
        className={`${!slider ? "max-w-[460px]" : slider && "w-[160px] min-w-[160px]"
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

            <UserIcon url={avatar} userRole={look.users.role} size="small" userName={look.users.name} userId={look.users.id}/>
            <LookUsername
              slider={slider}
              username={!slider ? look.users.name : slider === true && nome}
            />
          </Link>

          {/* <div className="mt-3.5">
            {!slider ? <SaveLookButton /> : slider === true && null}
          </div> */}
        </div>
      </div>
    </>
  );
}
