import { socialMedia } from "@/constants";
import Link from "next/link";

export default function SocialMediaLogos({darkMode}) {

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${darkMode ? 'text-black' : 'text-white'}`}>
      {socialMedia.map(item => (
        <Link target="_blank" key={item.title} href={item.href}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
