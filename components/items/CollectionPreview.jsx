import Image from "next/image";
import CollectionPrivacyTag from "./CollectionPrivacyTag";
import ShareButton from "../buttons/icons/ShareButton";

//Componente de card da coleção
// Mostra diferentes tipos de card dependendo no número de coleções presentes (3 ou mais, 2 , ou 1 ), da sua privacidade
//(publica, privada ou partilhada) e também muda o nome e o número de looks

//Array de utilizadores a passar à componente que mostra com quem é partilhada a coleção (se for partilhada)
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
    nome: "Arthur Lowes",
    img: "arthur.jpg",
  },
  {
    id: 87,
    nome: "Nayleth",
    img: "nayleth2.jpg",
  },
  {
    id: 2,
    nome: "Irma Boom",
    img: "irma.png",
  },
  {
    id: 95,
    nome: "Janice Wheeler",
    img: "janice.jpg",
  }
];


export default function CollectionPreview(props) {
  const caminho = "/images/teste_colecao_looks/";
  const arrayDeLooks = props.looks.publicacoes;
  const numeroDeLooks = arrayDeLooks.length;

  var lookPrivado = false;

  const privacidade = props.looks.privacidade;

  if(privacidade == "privada")
  {
    lookPrivado = true;
  }

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
            key={Look1.id}
          />
          <Image
            src={`${caminho}${Look2.img}`}
            alt="Look da coleção"
            width={80}
            height={90}
            style={{ width: "80px", height: "90px", objectFit: "cover" }}
            className="left-[14px] top-0 absolute rounded-[7px] border-2 border-white"
            key={Look2.id}
          />
          <Image
            src={`${caminho}${Look3.img}`}
            alt="Look da coleção"
            width={80}
            height={90}
            style={{ width: "80px", height: "90px", objectFit: "cover" }}
            className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
            key={Look3.id}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold line-clamp-1">
              {props.looks.nome}
            </p>
            <p className="caption text-secondary">{numeroDeLooks} Looks</p>
          </div>
          <CollectionPrivacyTag privacidade={privacidade} utilizadores={utilizadoresPartilhados}/>
        </div>
        <div className="ml-auto">
          {lookPrivado ? null : <ShareButton />}
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
              key={Look1.id}
            />
            <Image
              src={`${caminho}${Look2.img}`}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-[7px] border-2 border-white"
              key={Look2.id}
            />
          </div>
  
          <div className="flex flex-col gap-4 h-[90px]">
            <div>
              <p className="font-semibold line-clamp-1">
                {props.looks.nome}
              </p>
              <p className="caption text-secondary">{numeroDeLooks} Looks</p>
            </div>
            <CollectionPrivacyTag privacidade={privacidade} utilizadores={utilizadoresPartilhados}/>
          </div>
          <div className="ml-auto">
          {lookPrivado ? null : <ShareButton />}
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
              key={Look1.id}
            />
          </div>
  
          <div className="flex flex-col gap-4 h-[90px]">
            <div>
              <p className="font-semibold line-clamp-1">
                {props.looks.nome}
              </p>
              <p className="caption text-secondary">{numeroDeLooks} Look</p>
            </div>
            <CollectionPrivacyTag privacidade={privacidade} utilizadores={utilizadoresPartilhados}/>
          </div>
          <div className="ml-auto">
          {lookPrivado ? null : <ShareButton />}
          </div>
        </div>
      );
  }
}

/*
Estados de privacidade possíveis: 
------------PARTILHADO
<<CollectionPrivacyTag privacidade="partilhada" utilizadores={utilizadoresPartilhados}/>
------------PÚBLICO
<CollectionPrivacyTag privacidade="publica" utilizadores={utilizadoresPartilhados}/>
------------PARTILHADO
<CollectionPrivacyTag privacidade="privada" utilizadores={utilizadoresPartilhados}/>

*/
