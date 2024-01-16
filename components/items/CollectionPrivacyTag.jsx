import Image from "next/image";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

//Botão que mostra a privacidade ca card de coleção. Pode assumir 3 estados (pública, privada ou partilhada)
// Se partilhada, assume 4 estados diferentes, mediante o número de utilizadores (min 1, max 4)

export default function CollectionPrivacyTag({privacidade, utilizadores}) {

  const numeroDeUtilizadores = utilizadores.length;

  if (privacidade == 1) {
    return (
      <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
        <LockOutlinedIcon className="h-[13px] text-secondary" />
        <p className="caption text-secondary">Privada</p>
      </div>
    );
  } else if (privacidade == 2) {
    return (
      <div className="w-[100px] h-[30px] bg-grey_opacity_50 rounded-[100px] justify-center items-center inline-flex">
        <PublicOutlinedIcon className="h-[13px] text-secondary" />
        <p className="caption text-secondary">Pública</p>
      </div>
    );
  } else if (privacidade == 3) {
    if (numeroDeUtilizadores >= 4) {

        const ultimosUtilizadores = utilizadores.slice(-4);
        const Utilizador1 = ultimosUtilizadores[0];
        const Utilizador2 = ultimosUtilizadores[1];
        const Utilizador3 = ultimosUtilizadores[2];
        const Utilizador4 = ultimosUtilizadores[3];
    
        return (
          <div className="w-[100px] h-[30px] relative">
            <Image
              src={Utilizador1.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[68px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador1.id_user}
            />
            <Image
              src={Utilizador2.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id_user}
            />
            <Image
              src={Utilizador3.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[23px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador3.id_user}
            />
            <Image
              src={Utilizador4.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador4.id_user}
            />
          </div>
        );
      } else if (numeroDeUtilizadores == 3) {
        const Utilizador1 = utilizadores[0];
        const Utilizador2 = utilizadores[1];
        const Utilizador3 = utilizadores[2];
    
        return (
          <div className="w-[100px] h-[30px] relative">
            <Image
              src={Utilizador1.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className=" left-[45px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador1.id_user}
            />
            <Image
              src={Utilizador2.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[23px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id_user}
            />
            <Image
              src={Utilizador3.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador3.id_user}
            />
          </div>
        );
      } else if (numeroDeUtilizadores == 2) {
        const Utilizador1 = utilizadores[0];
        const Utilizador2 = utilizadores[1];
    
        return (
          <div className="w-[100px] h-[30px] relative">
            <Image
              src={Utilizador1.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-[23px] top-0 absolute rounded-full border-2 border-white"
              key={Utilizador1.id_user}
            />
            <Image
              src={Utilizador2.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador2.id_user}
            />
          </div>
        );
      } else if (numeroDeUtilizadores == 1) {
        const Utilizador1 = utilizadores[0];
    
        return (
          <div className="w-[100px] h-[30px] relative">
            <Image
              src={Utilizador1.users.img}
              alt="Look da coleção"
              width={30}
              height={30}
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
              className="left-0 top-0 absolute rounded-full border-2 border-white"
              key={Utilizador1.id_user}
            />
          </div>
        );
      }
  }
}


