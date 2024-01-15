import Image from "next/image";
//Botão de upvote no topo direito da card de look
import LookUpvoteButton from "../buttons/icons/LookUpvoteButton";
//Botão de guardar (bookmark) no canto inferior direito da card de look
import SaveButton from "../buttons/icons/SaveButton";

// Componente que mostra o nome de utilizador apenas se estiver em vista de 1 coluna
import LookUsername from "../items/LookUsername";

/*Card de look da galeria, funcional tanto para vista de 1 coluna como 2 colunas.
Utiliza tanto o componente de Upvote (LookUpvoteButton) como de guardar look, icone de bookmarc
(SaveButton)
 */

export default function LookCard({ look, slider, looks, nome, avatar }) {
  console.log(looks)
  return (
      <div className={`w-full ${!slider ? 'max-w-[460px]' : slider === true && 'min-w-[160px]'} `}>
      <div className="w-full aspect-[17/26] relative flex justify-center items-center">
        <Image
          src={!slider ? look.url_image : slider === true && looks.url_image}
          alt="Look da galeria"
          className="object-cover scale-100 rounded"
          fill={true}
        />
        {!slider ? <LookUpvoteButton upvotes={look.upvotes}/> : slider === true && null}
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center mt-3.5">
          <div className="rounded-full w-10 h-10 overflow-hidden mr-2">
            <Image
              src={!slider ? look.users.img : slider === true && avatar}
              alt="Look da galeria"
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>
          <LookUsername username={!slider ? look.users.name : slider === true && nome} />
        </div>
        <div className="mt-3.5">
        {!slider ? <SaveButton /> : slider === true && null}
        </div>
      </div>
    </div>
  );
}
