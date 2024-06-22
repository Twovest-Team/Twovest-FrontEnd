import { socialMedia } from "@/constants";
import Link from "next/link";

export default function SocialMediaLogos() {

  return (
    <div className="flex flex-wrap justify-center gap-3 text-white">
      {socialMedia.map(item => (
        <Link target="_blank" key={item.title} href={item.href}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
