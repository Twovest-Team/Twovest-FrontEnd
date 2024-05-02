import Image from "next/image";
import VerifiedIcon from "@/public/static/images/icons/verified.png";

const ProfilePicture = ({ imageProfile, userRole }) => {
  // Se um utilizador for influenciador, irá aparecer com o símbolo de verificado
  if (userRole === 1) {
    return (
      <div className="relative">
        <Image
          src={VerifiedIcon}
          height={50}
          width={50}
          className="left-16 bottom-16 absolute"
          alt="Símbolo de pessoa verificada"
        ></Image>
        <Image
          src={imageProfile}
          width={100}
          height={100}
          quality={60}
          style={{
            borderRadius: "100px",
            objectFit: "cover",
            overflow: "hidden",
          }}
          alt="Profile Picture"
        />
      </div>
    );
  } else {
  }
  return (
    <Image
      src={imageProfile}
      width={100}
      height={100}
      quality={60}
      style={{
        borderRadius: "100px",
        objectFit: "cover",
        overflow: "hidden",
      }}
      alt="Profile Picture"
    />
  );
};

export default ProfilePicture;
