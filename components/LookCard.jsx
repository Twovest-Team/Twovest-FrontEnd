import Image from "next/image";
//Botão de upvote no topo direito da card de look
import LookUpvoteButton from "./LookUpvoteButton";
//Botão de guardar (bookmark) no canto inferior direito da card de look
import SaveButton from "./SaveButton";

// Imagem de placeholder do componente
import ImagemLook from "@/public/images/gallery/looks/looks_mulher1.png";

export default function LookCard(look) {
  return (
    <div className="items-start text-center">
      <div className="relative rounded-[5px]">
        <Image
          src={ImagemLook}
          alt="Look da galeria"
          width={0}
          height={0}
          style={{ width: "100%", height: "520px" }}
          className="object-cover"
        />
        <LookUpvoteButton />
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center mt-3.5">
          <div className="rounded-full w-10 h-10 overflow-hidden mr-2">
            <Image
              src={ImagemLook}
              alt="Look da galeria"
              style={{ objectFit: "contain" }}
            />
          </div>
          <p className="caption font-light">Marcela.Ferreira</p>
        </div>
        <div className="mt-3.5">
          <SaveButton />
        </div>
      </div>
    </div>
  );
}
