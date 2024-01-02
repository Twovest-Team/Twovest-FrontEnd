import Image from "next/image"
import LogoWhite from '@/public/images/logo_twovest_white.svg';

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
            <div className="w-36 border-r white_opacity_50">Contactos</div>
            <div className="w-36 ml-8">Proteção de dados</div>
            <div className="w-36 border-r white_opacity_50">Help center</div>
            <div className="w-36 ml-8">Termos de serviço</div>
            <div className="w-36 border-r white_opacity_50">Sobre nós</div>
            <div className="w-36 ml-8">Aviso legal</div>
            </div>

            /* Vou precisar de ter uma caixa com flex-wrap e max-width para os elementos de texto  */
        </footer>
    )
}