import facebook from "../../public/static/images/social_media/facebook_logo_black.svg";
import instagram from "../../public/static/images/social_media/instagram_logo_black.svg";
// import tiktok from "../../public/static/images/social_media/tiktok_logo_black.svg";
// import twitter from "../../public/static/images/social_media/x_twitter_logo_black.svg";
// import youtube from "../../public/static/images/social_media/youtube_logo_black.svg";
import Image from "next/image";

export const SocialMediaLogos_black = () =>{
    return(
        <div className="bottom-0 w-full overflow-hidden min-w-[280px]">
            <div className="border border-b border-grey my-6"></div>
            <div className="flex justify-between items-center mb-6 ">
                <div className="flex items-center mx-4">
                    <div className="navbar_socialMedia">
                        <a href="https://www.facebook.com/profile.php?id=61558434747794&locale=pt_PT" target="_blank" rel="noopener noreferrer">
                            <Image src={facebook} width={20} height={20} alt="facebook logo"/>
                        </a>
                    </div>
                    <div className="navbar_socialMedia">
                        <a href="https://www.instagram.com/twovest.store/" target="_blank" rel="noopener noreferrer">
                            <Image src={instagram} width={20} height={20} alt="instagram logo"/>
                        </a>
                    </div>
                    {/* <div className="navbar_socialMedia"><Image src={twitter} width={20} height={20} alt="twitter logo"/></div>
                    <div className="navbar_socialMedia"><Image src={youtube} width={20} height={20} alt="youtube logo"/></div>
                    <div className="navbar_socialMedia"><Image src={tiktok} width={20} height={20} alt="tiktok logo"/></div> */}
                </div>
                <div className="mx-4">
                    <div className="caption">© 2024 Twovest</div>
                </div>
        </div>
        </div>
        
    )
}