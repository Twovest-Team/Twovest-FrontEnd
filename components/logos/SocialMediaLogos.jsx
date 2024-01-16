import Image from "next/image";
import FacebookLogo from "@/public/images/social_media/facebook_logo.svg";
import InstagramLogo from "@/public/images/social_media/instagram_logo.svg";
import TwitterLogo from "@/public/images/social_media/x_twitter_logo.svg";
import YoutubeLogo from "@/public/images/social_media/youtube_logo.svg";
import TiktokLogo from "@/public/images/social_media/tiktok_logo.svg"



export default function SocialMediaLogos() {
  return (
    <div className="flex flex-wrap justify-center">
      <Image src={FacebookLogo} alt="Logótipo do Facebook" width={20} height={20} styles={{width: 'auto', height: 'auto'}} className="mr-5"/>
      <Image src={InstagramLogo} alt="Logótipo do Instagram" width={20} height={20} styles={{width: 'auto', height: 'auto'}} className="mr-5"/>
      <Image src={TwitterLogo} alt="Logótipo do X" width={18} height={18} styles={{width: 'auto', height: 'auto'}} className="mr-5"/>
      <Image src={YoutubeLogo} alt="Logótipo do Youtube" width={20} height={14} styles={{width: 'auto', height: 'auto'}} className="mr-5"/>
      <Image src={TiktokLogo} alt="Logótipo do TikTok" width={18} height={20} styles={{width: 'auto', height: 'auto'}} />
    </div>
  );
}
