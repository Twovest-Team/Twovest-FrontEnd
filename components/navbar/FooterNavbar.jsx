import SocialMediaLogos from "../logos/SocialMediaLogos";

const FooterNavbar = () => {
    return (
        <section className="flex justify-between px-4 py-5 mt-6 border-t border-grey items-center w-full">
            <div className="w-fit mr-auto">
                <SocialMediaLogos darkMode={true} />
            </div>
            <p className="caption text-secondary">&#169; 2024 Twovest</p>
        </section>
    )
}

export default FooterNavbar