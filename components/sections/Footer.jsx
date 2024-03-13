import Image from "next/image";
import Link from "next/link";
import LogoWhite from "@/public/images/logo_twovest_white.svg";
import SocialMediaLogos from "../logos/SocialMediaLogos";
import PaymentLogos from "../logos/PaymentLogos";
import LanguageButton from "../buttons/LanguageButton";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="flex justify-center pt-6 pb-10">
        <Image src={LogoWhite} alt="Logótipo Branco da Twovest" priority />
      </div>
      <div className="flex flex-wrap justify-center text-white">
        <Link href="/">
          <div className="footer--text h-10 w-40 pr-4 border-r border-white_opacity_50">
            Contactos
          </div>
        </Link>
        <Link href="/">
          <div className="footer--text w-44 pl-8">Proteção de dados</div>
        </Link>
        <Link href="/">
          <div className="footer--text h-10 w-40 pr-4 border-r border-white_opacity_50">
            Help center
          </div>
        </Link>
        <Link href="/">
          <div className="footer--text w-44 pl-8">Termos de serviço</div>
        </Link>
        <Link href="/">
          <div className="footer--text h-10 w-40 pr-4 border-r border-white_opacity_50">
            Sobre nós
          </div>
        </Link>
        <Link href="/">
          <div className="footer--text w-44 pl-8">Aviso legal</div>
        </Link>
      </div>
      <div className="mt-8 mb-6">
        <SocialMediaLogos />
      </div>
      <hr className="mx-6 mb-6" />
      <div className="flex flex-wrap justify-between items-center mx-6 text-white">
        <div>
          <LanguageButton />
        </div>
        <p className="caption">&#169; 2023 Twovest</p>
      </div>
      <div className="bg-white py-3.5 mt-5">
        <PaymentLogos />
      </div>
    </footer>
  );
}

/* Verificar aviso da consola acerca das imagens e voltar a colocar footer fora do body*/
