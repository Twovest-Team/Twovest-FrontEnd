import Image from "next/image";
import Link from "next/link";
import VerifiedIcon from "@/public/static/images/icons/verified.png";

export const UserIcon = ({ url, userRole, size, userName, userId }) => {
  let imageSize;

  if (size === "small") {
    imageSize = 25;

    if (userRole === 1) {
      // Se a "role" do utilizador for = 1, significa que este é um influenciador e recebe o símbolo de verificado
      return (
        <div className="relative">
          <Image
            src={VerifiedIcon}
            height={20}
            width={20}
            className="left-3 bottom-3 absolute"
            alt="Símbolo de pessoa verificada"
          ></Image>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }

    console.log(userRole)
    if (userRole === 2) {
      return (
        <Link href={`/profile/id=${userId}`}>
          <Image
            src={url}
            className="rounded-full border-primary_main border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </Link>
      );
    } else {
      return (
        <div>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }
  } else if (size === "medium") {
    imageSize = 35;

    if (userRole === 1) {
      return (
        <div className="relative">
          <Image
            src={VerifiedIcon}
            height={25}
            width={25}
            className="left-5 bottom-5 absolute"
            alt="Símbolo de pessoa verificada"
          ></Image>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }

    if (userRole === 2) {
      return (
        <Link href={`/profile/id=${userId}`}>
          <Image
            src={url}
            className="rounded-full border-primary_main border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </Link>
      );
    } else {
      return (
        <div>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }
  } else if (size === "large") {
    imageSize = 45;

    if (userRole === 1) {
      return (
        <div className="relative">
          <Image
            src={VerifiedIcon}
            height={30}
            width={30}
            className="left-6 bottom-6 absolute"
            alt="Símbolo de pessoa verificada"
          ></Image>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }

    if (userRole === 2) {
      return (
        <Link href={`/profile/id=${userId}`}>
          <Image
            src={url}
            className="rounded-full border-primary_main border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </Link>
      );
    } else {
      return (
        <div>
          <Image
            src={url}
            className="rounded-full border-grey border-2"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }
  } else {
    // Caso o componente não tenha um tamanho definido, recebe de default o tamanho pequeno
    imageSize = 25;

    if (userRole === 1) {
      return (
        <div className="relative">
          <Image
            src={VerifiedIcon}
            height={20}
            width={20}
            className="left-3 bottom-3 absolute"
            alt="Símbolo de pessoa verificada"
          ></Image>
          <Image
            src={url}
            className="rounded-full border-grey border"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }

    if (userRole === 2) {
      return (
        <Link href={`/profile/id=${userId}`}>
          <Image
            src={url}
            className="rounded-full border-primary_main border"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </Link>
      );
    } else {
      return (
        <div>
          <Image
            src={url}
            className="rounded-full border-grey border"
            width={imageSize}
            height={imageSize}
            alt={`profile image ${userName}`}
          />
        </div>
      );
    }
  }
};
