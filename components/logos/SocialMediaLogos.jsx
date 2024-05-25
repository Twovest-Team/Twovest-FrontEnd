import Image from "next/image";
import FacebookLogo from "@/public/static/images/social_media/facebook_logo.svg";
import InstagramLogo from "@/public/static/images/social_media/instagram_logo.svg";
import TiktokLogo from "@/public/static/images/social_media/tiktok_logo.svg"
import { LinkedInLogo} from "@mui/icons-material";



export default function SocialMediaLogos() {
  return (
    <div className="flex flex-wrap justify-center">
      <a href="www.facebook.com"><Image src={FacebookLogo} alt="Logótipo do Facebook" width={20} height={20} styles={{width: 'auto', height: 'auto'}} className="mr-5"/></a>
      <a href="www.instagram.com"><Image src={InstagramLogo} alt="Logótipo do Instagram" width={20} height={20} styles={{width: 'auto', height: 'auto'}} className="mr-5"/></a>
      <a href="www.linkedin.com"><Image src={LinkedInLogo} alt="Logótipo do Linkedin" width={18} height={18} styles={{width: 'auto', height: 'auto'}} className="mr-5"/></a>
      <a href="www.tiktok.com"><Image src={TiktokLogo} alt="Logótipo do TikTok" width={18} height={20} styles={{width: 'auto', height: 'auto'}} /></a>
    </div>
    //-----Margarida-----//
  );
}
