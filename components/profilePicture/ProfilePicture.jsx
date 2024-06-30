import Image from "next/image";

const ProfilePicture = ({ imageProfile, userRole }) => {
  // Se um utilizador for influenciador, irá aparecer com o símbolo de verificado
  if (userRole === 1) {
    return (
      <div className="relative">
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
      className="border-[7px] border-white rounded-full object-cover"
      src={imageProfile}
      width={140}
      height={140}
      quality={60}
      alt="Profile Picture"
    />
  );
};

export default ProfilePicture;
