import Image from "next/image";
import Link from "next/link";

export const UserIcon = ({url, userRole, size, userName, userId}) =>{

    if (size === "small") {
        imageSize = 25;
      } else if (size === "medium") {
        imageSize = 35;
      } else if (size === "large") {
        imageSize = 45;
      } else {
        imageSize = 25;
      }

    if (userRole === "influencer") {
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
            {/* Render some other content if userRole is not "influencer" */}
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