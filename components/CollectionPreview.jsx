import Image from "next/image";
import CollectionSharedAvatars from "./CollectionSharedAvatars";
import CollectionPrivacyButton from "./CollectionPrivacyButton";

import ShareIcon from "@mui/icons-material/Share";

//Array de utilizadores a passar à componente que mostra com quem é partilhada a coleção
const utilizadoresPartilhados = [
  {
    id: 666,
    nome: "Ola Englund",
    img: "englund.jpg",
  },
  {
    id: 315,
    nome: "Vera Foster",
    img: "vera.jpg",
  },
  {
    id: 3,
    nome: "Bahadir Ozturk",
    img: "turco.jpg",
  },
  {
    id: 36,
    nome: "Nayleth",
    img: "nayleth2.jpg",
  },
];

export default function CollectionPreview(props) {
  const caminho = "/images/teste_colecao_looks/";
  const arrayDeLooks = props.looks;
  const numeroDeLooks = arrayDeLooks.length;

  console.log(numeroDeLooks);

  if (numeroDeLooks >= 3) {
    const ultimosLooks = arrayDeLooks.slice(-3);
    const Look1 = ultimosLooks[0];
    const Look2 = ultimosLooks[1];
    const Look3 = ultimosLooks[2];

    return (
      <div className="flex flex-row items-start h-[90px]">
        <div className="mr-4 w-[110px]  h-[90px] relative">
          <Image
            src={`${caminho}${Look1.img}`}
            alt="Look da coleção"
            width={80}
            height={90}
            style={{ width: "80px", height: "90px", objectFit: "cover" }}
            className="left-[29px] top-0 absolute rounded-[7px] border-2 border-white"
          />
          <Image
            src={`${caminho}${Look2.img}`}
            alt="Look da coleção"
            width={80}
            height={90}
            style={{ width: "80px", height: "90px", objectFit: "cover" }}
            className="left-[14px] top-0 absolute rounded-[7px] border-2 border-white"
          />
          <Image
            src={`${caminho}${Look3.img}`}
            alt="Look da coleção"
            width={80}
            height={90}
            style={{ width: "80px", height: "90px", objectFit: "cover" }}
            className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
          />
        </div>

        <div className="flex flex-col gap-4 h-[90px]">
          <div>
            <p className="text-ellipsis overflow-hidden font-semibold">
              Looks para casamento
            </p>
            <p className="caption text-secondary">31 Looks</p>
          </div>
          <CollectionSharedAvatars utilizadores={utilizadoresPartilhados} />
        </div>
        <div className="ml-auto">
          <ShareIcon />
        </div>
      </div>
    );
  } else if (numeroDeLooks == 2) {
    const Look1 = arrayDeLooks[0];
    const Look2 = arrayDeLooks[1];

    return (
        <div className="flex flex-row items-start h-[90px]">
          <div className="mr-4 w-[110px]  h-[90px] relative">
          <div className="w-[80px] h-[90px] bg-grey left-[29px] top-0 absolute rounded-[7px] border-2 border-white"></div>
            <Image
              src={`${caminho}${Look1.img}`}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="left-[14px] top-0 absolute rounded-[7px] border-2 border-white"
            />
            <Image
              src={`${caminho}${Look2.img}`}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
            />
          </div>
  
          <div className="flex flex-col gap-4 h-[90px]">
            <div>
              <p className="text-ellipsis overflow-hidden font-semibold">
                Looks para casamento
              </p>
              <p className="caption text-secondary">31 Looks</p>
            </div>
            <CollectionSharedAvatars utilizadores={utilizadoresPartilhados} />
          </div>
          <div className="ml-auto">
            <ShareIcon />
          </div>
        </div>
      );
  } else {
    const Look1 = arrayDeLooks[0];
    
    return (
        <div className="flex flex-row items-start h-[90px]">
          <div className="mr-4 w-[110px]  h-[90px] relative">
          <div className="w-[80px] h-[90px] bg-grey_opacity_50 left-[29px] top-0 absolute rounded-[7px] border-2 border-white"></div>
          <div className="w-[80px] h-[90px] bg-grey left-[14px] top-0 absolute rounded-[7px] border-2 border-white"></div>
            <Image
              src={`${caminho}${Look1.img}`}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
            />
          </div>
  
          <div className="flex flex-col gap-4 h-[90px]">
            <div>
              <p className="text-ellipsis overflow-hidden font-semibold">
                Looks para casamento
              </p>
              <p className="caption text-secondary">31 Looks</p>
            </div>
            <CollectionSharedAvatars utilizadores={utilizadoresPartilhados} />
          </div>
          <div className="ml-auto">
            <ShareIcon />
          </div>
        </div>
      );
  }
}

/*
Estados de privacidade possíveis: 
------------PARTILHADO
<CollectionSharedAvatars utilizadores={utilizadoresPartilhados} />
------------PÚBLICO
<CollectionPrivacyButton privacidade="publica"/>
------------PARTILHADO
<CollectionPrivacyButton privacidade="privada"/>

*/
