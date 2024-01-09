import Image from "next/image";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

//Botão que mostra a privacidade ca card de coleção. Pode assumir 3 estados (pública, privada ou partilhada)
// Se partilhada, assume 4 estados diferentes, mediante o número de utilizadores (min 1, max 4)

export default function CollectionPrivacyTag(props) {
  const caminho = "/images/teste_colecao_partilhada_avatares/";
  const ArrayUtilizadores = props.utilizadores;
  const numeroDeUtilizadores = ArrayUtilizadores.length;

  if (props.privacidade == "privada") {
    return (
      <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
        <LockOutlinedIcon className="h-[13px] text-secondary" />
        <p className="caption text-secondary">Privada</p>
      </div>
    );
  } else if (props.privacidade == "publica") {
    return (
      <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
        <PublicOutlinedIcon className="h-[13px] text-secondary" />
        <p className="caption text-secondary">Pública</p>
      </div>
    );
  } else if (props.privacidade == "partilhada") {
    if (numeroDeUtilizadores >= 4) {

        const ultimosUtilizadores = ArrayUtilizadores.slice(-4);
        const Utilizador1 = ultimosUtilizadores[0];
        const Utilizador2 = ultimosUtilizadores[1];
        const Utilizador3 = ultimosUtilizadores[2];
        const Utilizador4 = ultimosUtilizadores[3];
    
        return (
          <div className="w-[100px] h-[30px] relative">
            <Image
              src={`${caminho}${Utilizador1.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[68px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador1.id}
            />
            <Image
              src={`${caminho}${Utilizador2.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id}
            />
            <Image
              src={`${caminho}${Utilizador3.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[23px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador3.id}
            />
            <Image
              src={`${caminho}${Utilizador4.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador4.id}
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
              key={Utilizador1.id}
            />
            <Image
              src={`${caminho}${Utilizador2.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[23px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id}
            />
            <Image
              src={`${caminho}${Utilizador3.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador3.id}
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
              key={Utilizador1.id}
            />
            <Image
              src={`${caminho}${Utilizador2.img}`}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id}
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
              key={Utilizador1.id}
            />
          </div>
        );
      }
  }
}


