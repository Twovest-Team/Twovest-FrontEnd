import Image from "next/image"
import LogoWhite from '@/public/images/logo_twovest_white.svg';
import SocialMediaLogos from "./SocialMediaLogos";
import PaymentLogos from "./PaymentLogos";
import LanguageButton from "./LanguageButton";

export default function Footer () {
    return(
        <footer className="bg-dark">
            <div className="flex justify-center pt-6 pb-10">
            <Image 
            src = {LogoWhite}
            alt="Logótipo Branco da Twovest"
            priority
            />
            </div>
            <div className="flex flex-wrap justify-center text-white">
            <div className="footer--text w-40 pr-4 border-r white_opacity_50">Contactos</div>
            <div className="footer--text w-40 pl-4">Proteção de dados</div>
            <div className="footer--text w-40 pr-4 border-r white_opacity_50">Help center</div>
            <div className="footer--text w-40 pl-4">Termos de serviço</div>
            <div className="footer--text w-40 pr-4 border-r white_opacity_50">Sobre nós</div>
            <div className="footer--text w-40 pl-4">Aviso legal</div>
            </div>
            <div className="mt-8 mb-6">
            <SocialMediaLogos />
            </div>
            <hr className="mx-6 mb-6"/>
            <div className="flex flex-wrap justify-left mx-6 text-white">
            <div className="mr-40">
            <LanguageButton />
            </div>
            <div>
            @ 2023 twovest
            </div>
            </div>
            
            <div className="bg-white py-3.5 mt-5">
            <PaymentLogos />
            </div>

        </footer>
    )
}

/* Verificar aviso da consola acerca das imagens e voltar a colocar footer fora do body*/