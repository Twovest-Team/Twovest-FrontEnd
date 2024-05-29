import Image from "next/image";
import Link from "next/link";
import SocialMediaLogos from "../logos/SocialMediaLogos";
// import PaymentLogos from "../logos/PaymentLogos";
import LanguageButton from "../buttons/LanguageButton";
import UaLogo from "@/app/LandingPageMP/photosMP/uaLogo.png";
import LogoWhite from './logo_twovest_white.svg';

export default function Footer() {
    return (
        <footer className="bg-dark">
            <div className="flex justify-center pt-6 pb-10">
                <Image src={LogoWhite} width={150} height={200} alt="Logótipo Branco da Twovest" />
            </div>
            <div className="grid grid-cols-1 pb-10">
                <div className="items-center text-white text-center">
                    <ul>
                        <li className="h-[50px]" key={"Footer-Contactos"}>
                            <Link href="/">
                                <p className="h-full w-full flex items-center justify-center">
                                    Projeto elaborado no âmbito do
                                </p>
                            </Link>
                        </li>
                        <li className="h-[50px]" key={"Footer-HelpCenter"}>
                            <Link href="/">
                                <p className="h-full w-full flex items-center justify-center">
                                    Mestrado em Comunicação e Tecnologias Web
                                </p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full pb-10">
                <SocialMediaLogos />
            </div>
            <hr className="mx-6 mb-6" />
            <div className="flex flex-wrap justify-between items-center mx-6 text-white">
                <div>
                    <LanguageButton />
                </div>
                <p className="caption">&#169; 2023 Twovest</p>
            </div>
            <div className="bg-white py-3.5 mt-5 flex items-center justify-center">
                {/* <PaymentLogos /> */}
                <Image src={UaLogo} alt="Logótipo da Universidade de Aveiro" width={100} height={100} />
            </div>
        </footer>
    );
}
