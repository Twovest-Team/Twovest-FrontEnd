import Image from "next/image";
import FacebookLogo from "@/public/images/facebook_logo.svg";
import InstagramLogo from "@/public/images/instagram_logo.svg";
import TwitterLogo from "@/public/images/x_twitter_logo.svg";
import YoutubeLogo from "@/public/images/youtube_logo.svg";
import TiktokLogo from "@/public/images/tiktok_logo.svg"



export default function SocialMediaLogos() {
  return (
    <div className="flex flex-wrap justify-center">
      <Image src={FacebookLogo} alt="Logótipo do Facebook" priority className="mr-5"/>
      <Image src={InstagramLogo} alt="Logótipo do Instagram" priority className="mr-5"/>
      <Image src={TwitterLogo} alt="Logótipo do X" priority className="mr-5"/>
      <Image src={YoutubeLogo} alt="Logótipo do Youtube" priority className="mr-5"/>
      <Image src={TiktokLogo} alt="Logótipo do TikTok" priority />
    </div>
  );
}
