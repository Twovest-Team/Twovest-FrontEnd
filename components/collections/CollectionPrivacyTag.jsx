import Image from "next/image";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

//Botão que mostra a privacy da card de coleção. Pode assumir 3 estados (pública, privada ou partilhada)
// Se partilhada, assume 4 estados diferentes, mediante o número de users (min 1, max 4)

export default function CollectionPrivacyTag({ privacy, users }) {

  let userIcons = []
  if (privacy == 3 && users) {

    for (let i = 0; i < users.length; i++) {

      let leftPosition;

      switch (i) {
        case 0:
          leftPosition = 67.59
          break;
        case 1:
          leftPosition = 45.06
          break;
        case 2:
          leftPosition = 22.53
          break;
        case 3:
          leftPosition = 0
          break;
      }

      userIcons.push(
        <Image
          src={users[i].users.img}
          alt="Look da coleção"
          width={35}
          height={35}
          quality={40}
          className={`rounded-full left-[${leftPosition}px] border-2 absolute bottom-0 border-white object-cover`}
          key={users[i].id_user}
        />
      )
    }
  }

  if (privacy == 1|| privacy == 2) {
    return (
      <div className="px-5 py-2 bg-grey_opacity_50 rounded-full w-fit">
        <p className="caption text-secondary font-semibold">
          {privacy == 1 && 'Privada'}
          {privacy == 2 && 'Pública'}
        </p>
      </div>
    );
  }else if (privacy == 3 && users) {
    return (
      <div className={`flex gap-2 relative w-[100px] h-[35px]`}>
        {userIcons}
      </div>
    )


  }
}


