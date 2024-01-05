import Image from "next/image";

export default function CollectionSharedAvatars(props) {
  const caminho = "/images/teste_colecao_partilhada_avatares/";
  const ArrayUtilizadores = props.utilizadores;
  const numeroDeUtilizadores = ArrayUtilizadores.length;

  if (numeroDeUtilizadores == 4) {
    const Utilizador1 = ArrayUtilizadores[0];
    const Utilizador2 = ArrayUtilizadores[1];
    const Utilizador3 = ArrayUtilizadores[2];
    const Utilizador4 = ArrayUtilizadores[3];

    return (
      <div className="w-[100px] h-[30px] relative">
        <Image
          src={`${caminho}${Utilizador1.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[68px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador2.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador3.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador4.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
        />
      </div>
    );
  } else if (numeroDeUtilizadores == 3) {
    const Utilizador1 = ArrayUtilizadores[0];
    const Utilizador2 = ArrayUtilizadores[1];
    const Utilizador3 = ArrayUtilizadores[2];

    return (
      <div className="w-[100px] h-[30px] relative">
        <Image
          src={`${caminho}${Utilizador1.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador2.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador3.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
        />
      </div>
    );
  } else if (numeroDeUtilizadores == 2) {
    const Utilizador1 = ArrayUtilizadores[0];
    const Utilizador2 = ArrayUtilizadores[1];

    return (
      <div className="w-[100px] h-[30px] relative">
        <Image
          src={`${caminho}${Utilizador1.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-[23px] top-0 absolute rounded-full border-2 border-white"
        />
        <Image
          src={`${caminho}${Utilizador2.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
        />
      </div>
    );
  } else if (numeroDeUtilizadores == 1) {
    const Utilizador1 = ArrayUtilizadores[0];

    return (
      <div className="w-[100px] h-[30px] relative">
        <Image
          src={`${caminho}${Utilizador1.img}`}
          alt="Look da coleção"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
          className="left-0 top-0 absolute rounded-full border-2 border-white"
        />
      </div>
    );
  }
}
