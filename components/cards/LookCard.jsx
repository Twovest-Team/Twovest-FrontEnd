import Image from "next/image";
//Botão de upvote no topo direito da card de look
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
//Botão de guardar (bookmark) no canto inferior direito da card de look
import SaveButton from "../buttons/icons/SaveButton";

// Componente que mostra o nome de utilizador apenas se estiver em vista de 1 coluna
import LookUsername from "../items/LookUsername";
import Link from "next/link";

/*Card de look da galeria, funcional tanto para vista de 1 coluna como 2 colunas.
Utiliza tanto o componente de Upvote (LookUpvoteButton) como de guardar look, icone de bookmark
(SaveButton)
 */

export default function LookCard({ look, slider, nome, avatar }) {
  return (
    <div
<<<<<<< HEAD
      className={`w-full ${
        !slider ? "max-w-[460px]" : slider === true && "w-[160px] min-w-[160px]"
=======
      className={`${
        !slider ? "max-w-[460px]" : slider && "w-[160px] min-w-[160px]"
>>>>>>> c7061f8aff9622aa0c34c205661ffbf38889b3da
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
          quality={80}
          fill={true}
          quality={5}
        />
        {!slider ? (
          <LookUpvoteButton upvotes={look.upvotes} />
        ) : (
          slider === true && null
        )}
      </Link>
      <div className="flex flex-wrap justify-between items-center">
        <Link
          href={`/profile?id=${look.users.id}`}
          className="flex gap-2  min-w-0 items-center mt-3.5"
        >
          <Image
            src={!slider ? look.users.img : slider === true && avatar}
            alt="Look da galeria"
            width={35}
            height={35}
<<<<<<< HEAD
            quality={5}
=======
            quality={30}
>>>>>>> c7061f8aff9622aa0c34c205661ffbf38889b3da
            className="rounded-full"
          />

          <LookUsername
<<<<<<< HEAD
            slider={true}
=======
            slider={slider}
>>>>>>> c7061f8aff9622aa0c34c205661ffbf38889b3da
            username={!slider ? look.users.name : slider === true && nome}
          />
        </Link>

        <div className="mt-3.5">
          {!slider ? <SaveButton /> : slider === true && null}
        </div>
      </div>
    </div>
  );
}
