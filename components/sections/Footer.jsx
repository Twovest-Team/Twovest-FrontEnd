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
      <div className="grid grid-cols-2 pb-10">
        <div className="items-center border-r border-white_opacity_50 text-white text-center">
          <ul>
            <Link href="/">
              <li className="h-[50px]">Contactos</li>
            </Link>
            <Link href="/">
              <li className="h-[50px]">Help center</li>
            </Link>
            <Link href="/">
              <li className="h-[50px]">Sobre nós</li>
            </Link>
          </ul>
        </div>
        <div className="items-center border-l border-white_opacity_50 text-white text-center">
          <ul>
            <Link href="/">
              <li className="h-[50px]">Proteção de dados</li>
            </Link>
            <Link href="/">
              <li className="h-[50px]">Termos de serviço</li>
            </Link>
            <Link href="/">
              <li className="h-[50px]">Aviso legal</li>
            </Link>
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
      <div className="bg-white py-3.5 mt-5">
        <PaymentLogos />
      </div>
    </footer>
  );
}
