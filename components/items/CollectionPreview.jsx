import Image from "next/image";
import CollectionPrivacyTag from "./CollectionPrivacyTag";
import ShareButton from "../buttons/icons/ShareButton";

//Componente de card da coleção
// Mostra diferentes tipos de card dependendo no número de coleções presentes (3 ou mais, 2 , ou 1 ), da sua privacidade
//(publica, privada ou partilhada) e também muda o nome e o número de looks

export default function CollectionPreview({ colecao, perfilProprio }) {

  const nomeColecao = colecao.collections.name;
  const privacidadeColecao = colecao.collections.privacy;
  const outrosUtilizadores = colecao.users;
  

  var lookPrivado = false;
  if (privacidadeColecao === 1) {
    lookPrivado = true;
  }

  var lookNaoPublico = false
  if(privacidadeColecao != 2)
  {
    lookNaoPublico = true
  }

  const looks = colecao.looks;
  const numeroDeLooks = looks.length;

  if (numeroDeLooks >= 3) {
    const Look1 = looks[0];
    const Look2 = looks[1];
    const Look3 = looks[2];

    if(!perfilProprio && lookNaoPublico)
    {
      return (
        null
      )
    }
    else{
    return (
      <div className="items-start h-[90px] w-full flex flex-row">
        <div className="h-[90px] grid">
          <div className="collectionCard--image w-20 col-start-1 row-start-1 ml-[29px]">
            <Image
              src={Look1.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look1.id_look}
            />
          </div>
          <div className="collectionCard--image w-20 col-start-1 row-start-1 ml-[14px]">
            <Image
              src={Look2.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look2.id_look}
            />
          </div>
          <div className="w-20 col-start-1 row-start-1">
            <Image
              src={Look3.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look3.id_look}
            />
          </div>
        </div>

        <div className="ml-4 flex flex-col gap-4">
          <div>
            <p className="font-semibold line-clamp-1">{nomeColecao}</p>
            <p className="caption text-secondary">{numeroDeLooks} looks</p>
          </div>
          <CollectionPrivacyTag
            privacidade={privacidadeColecao}
            utilizadores={outrosUtilizadores}
          />
        </div>
        <div className="ml-auto">{lookPrivado ? null : <ShareButton />}</div>
      </div>
    );
  }
  } else if (numeroDeLooks == 2) {
    const Look1 = looks[0];
    const Look2 = looks[1];

    if(!perfilProprio && lookNaoPublico)
    {
      return (
        null
      )
    }
    else{
    return (
      <div className="items-start h-[90px] w-full flex flex-row">
        <div className="h-[90px] grid">
          <div className="collectionCard--image w-20 h-[90px] col-start-1 row-start-1 ml-[29px] bg-grey rounded-[7px] border-2 border-white"></div>
          <div className="collectionCard--image w-20 col-start-1 row-start-1 ml-[14px]">
            <Image
              src={Look1.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look1.id_look}
            />
          </div>
          <div className="w-20 col-start-1 row-start-1">
            <Image
              src={Look2.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look2.id_look}
            />
          </div>
        </div>

        <div className="ml-4 flex flex-col gap-4">
          <div>
            <p className="font-semibold line-clamp-1">{nomeColecao}</p>
            <p className="caption text-secondary">{numeroDeLooks} looks</p>
          </div>
          <CollectionPrivacyTag
            privacidade={privacidadeColecao}
            utilizadores={outrosUtilizadores}
          />
        </div>
        <div className="ml-auto">{lookPrivado ? null : <ShareButton />}</div>
      </div>
    );}
  } else {
    const Look1 = looks[0];

    if(!perfilProprio && lookNaoPublico)
    {
      return (
        null
      )
    }
    else{
    return (
      <div className="items-start h-[90px] w-full flex flex-row">
        <div className="h-[90px] grid">
          <div className="collectionCard--image w-20 h-[90px] col-start-1 row-start-1 ml-[29px] bg-grey_opacity_50 rounded-[7px] border-2 border-white"></div>
          <div className="collectionCard--image w-20 h-[90px] col-start-1 row-start-1 ml-[14px] bg-grey_opacity_50 rounded-[7px] border-2 border-white"></div>
          <div className="w-20 col-start-1 row-start-1">
            <Image
              src={Look1.looks.url_image}
              alt="Look da coleção"
              width={80}
              height={90}
              style={{ width: "80px", height: "90px", objectFit: "cover" }}
              className="rounded-[7px] border-2 border-white"
              key={Look1.id_look}
            />
          </div>
        </div>

        <div className="ml-4 flex flex-col gap-4">
          <div>
            <p className="font-semibold line-clamp-1">{nomeColecao}</p>
            <p className="caption text-secondary">{numeroDeLooks} look</p>
          </div>
          <CollectionPrivacyTag
            privacidade={privacidadeColecao}
            utilizadores={outrosUtilizadores}
          />
        </div>
        <div className="ml-auto">{lookPrivado ? null : <ShareButton />}</div>
      </div>
    );}
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
