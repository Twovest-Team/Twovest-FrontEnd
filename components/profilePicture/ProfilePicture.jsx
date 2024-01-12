import imageProfile from "@/public/images/teste_image_perfil/imagemperfil.jpg";
import Image from "next/image";

const ProfilePicture = () => {
  return (
    <Image
      src={imageProfile}
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "100px",
        objectFit: "cover",
        overflow: "hidden",
      }}
      alt="Profile Picture"
    />
  );
};

export default ProfilePicture;
