import Image from "next/image";

const ProfilePicture = ({imageProfile}) => {
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
