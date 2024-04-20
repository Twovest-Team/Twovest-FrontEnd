import Image from "next/image";
import Link from "next/link";
import SocialMediaLogos from "../logos/SocialMediaLogos";
import PaymentLogos from "../logos/PaymentLogos";
import LanguageButton from "../buttons/LanguageButton";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="flex justify-center pt-6 pb-10">
        <Image src={'/static/images/logo_twovest_white.svg'} width={150} height={200} alt="Logótipo Branco da Twovest" />
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div className="items-center border-r border-white_opacity_50 text-white text-center">
          <ul>
            <li className="h-[50px]" key={"Footer-Contactos"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Contactos
                </p>
              </Link>
            </li>
            <li className="h-[50px]" key={"Footer-HelpCenter"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Help center
                </p>
              </Link>
            </li>
            <li className="h-[50px]" key={"Footer-SobreNos"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Sobre nós
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="items-center border-l border-white_opacity_50 text-white text-center">
          <ul>
            <li className="h-[50px]" key={"Footer-ProtecaoDeDados"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Proteção de dados
                </p>
              </Link>
            </li>
            <li className="h-[50px]" key={"Footer-TermosDeServico"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Termos de serviço
                </p>
              </Link>
            </li>
            <li className="h-[50px]" key={"Footer-AvisoLegal"}>
              <Link href="/">
                <p className="h-full w-full flex items-center justify-center">
                  Aviso legal
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
      <div className="bg-white py-3.5 mt-5">
        <PaymentLogos />
      </div>
    </footer>
  );
}
