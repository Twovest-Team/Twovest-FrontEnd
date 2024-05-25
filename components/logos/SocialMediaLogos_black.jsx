import { LinkedIn } from "@mui/icons-material";
import facebook from "../../public/static/images/social_media/facebook_logo_black.svg";
import instagram from "../../public/static/images/social_media/instagram_logo_black.svg";
import tiktok from "../../public/static/images/social_media/tiktok_logo_black.svg";
import Image from "next/image";

export const SocialMediaLogos_black = () => {
    return (
        <div className="bottom-0 w-full overflow-hidden min-w-[280px] max-w-[460px]">
            <div className="border border-b border-grey my-6"></div>
            <div className="flex justify-between items-center mb-6 ">
                <div className="flex items-center mx-4">
                    <div className="navbar_socialMedia"><Image src={facebook} width={20} height={20} alt="facebook logo" /></div>
                    <div className="navbar_socialMedia"><Image src={instagram} width={20} height={20} alt="instagram logo" /></div>
                    <div className="navbar_socialMedia"><Image src={tiktok} width={20} height={20} alt="tiktok logo" /></div>
                    <div className="navbar_socialMedia"><Image src={LinkedIn} width={20} height={20} alt="linkedin logo" /></div>
                    {//margarida
                    } </div>
                <div className="mx-4">
                    <div className="caption">© 2023 Twovest</div>
                </div>
            </div>
        </div>

    )
}