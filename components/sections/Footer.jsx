"use client";

import Image from "next/image";
import Link from "next/link";
import SocialMediaLogos from "../logos/SocialMediaLogos";
import PaymentLogos from "../logos/PaymentLogos";
import LanguageButton from "../buttons/LanguageButton";
import useWindow from "@/hooks/client-hooks/useWindow";

export default function Footer() {
  const { isMobile, isSm, isMd, isLg, isXl, is2Xl } = useWindow();

  return (
    <footer className="bg-dark">
      {(isMobile || isSm || isMd) && (
        <>
          <div className="flex justify-center pt-6 pb-10">
            <Image
              src={"/static/images/logo_twovest_white.svg"}
              width={150}
              height={200}
              alt="Logótipo Branco da Twovest"
            />
          </div>
          <div className="flex pb-10">
            <div className="w-1/2 flex flex-col items-center justify-start border-r border-white_opacity_50 text-white">
              <ul className="text-left ml-20 me-11">
                <li key={"Footer-Contactos"}>
                  <Link href="/contactos">
                    <p className="py-2">Contactos</p>
                  </Link>
                </li>
                <li key={"Footer-HelpCenter"}>
                  <Link href="/centro-de-ajuda">
                    <p className="py-2">Centro de ajuda</p>
                  </Link>
                </li>
                <li key={"Footer-SobreNos"}>
                  <Link href="/sobre-nos">
                    <p className="py-2">Sobre nós</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-1/2 flex flex-col justify-end items-center border-l border-white_opacity_50 text-white">
              <ul className="ml-10 me-10">
                <li key={"Footer-ProtecaoDeDados"}>
                  <Link href="/protecao-de-dados">
                    <p className="py-2">Proteção de dados</p>
                  </Link>
                </li>
                <li key={"Footer-TermosDeServico"}>
                  <Link href="/termos-de-servico">
                    <p className="py-2">Termos de serviço</p>
                  </Link>
                </li>
                <li key={"Footer-AvisoLegal"}>
                  <Link href="/aviso-legal">
                    <p className="py-2">Aviso legal</p>
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
        </>
      )}

      {(isLg || isXl || is2Xl) && (
        <>
          <div className="flex justify-center">
            <div className="flex pt-6 pb-10 pr-20">
              <Image
                src={"/static/images/logo_twovest_white.svg"}
                width={200}
                height={250}
                alt="Logótipo Branco da Twovest"
              />
            </div>
            <div className="flex flex-col pb-10 justify-start pt-6 items-start text-white text-sm text-start">
              <div className="inline-flex flex-row justify-start gap-7">
                <span key={"Footer-Contactos"}>
                  <Link href="/">
                    <p className="py-2">Contactos</p>
                  </Link>
                </span>
                <span key={"Footer-SobreNos"}>
                  <Link href="/">
                    <p className="py-2">Sobre nós</p>
                  </Link>
                </span>
                <span key={"Footer-TermosDeServico"}>
                  <Link href="/">
                    <p className="py-2">Termos de serviço</p>
                  </Link>
                </span>
                <span key={"Footer-TermosDeServico"}>
                  <Link href="/">
                    <p className="py-2">Métodos de pagamento</p>
                  </Link>
                </span>
              </div>
              <div className="inline-flex flex-row justify-start items-center gap-7">
                <span key={"Footer-HelpCenter"}>
                  <Link href="/">
                    <p className="py-2">Centro de ajuda</p>
                  </Link>
                </span>
                <span key={"Footer-ProtecaoDeDados"}>
                  <Link href="/">
                    <p className="py-2">Proteção de dados</p>
                  </Link>
                </span>
                <span key={"Footer-AvisoLegal"}>
                  <Link href="/">
                    <p className="py-2">Aviso legal</p>
                  </Link>
                </span>
                <span>
                  <PaymentLogos />
                </span>
              </div>
              <hr className="my-6 text-white w-full" />
              <div className="self-stretch px-1 py-2 justify-between items-center gap-2 inline-flex text-white">
                <div className="justify-start items-center">
                  <LanguageButton />
                </div>
                <div className="gap-2 items-end">
                  <div className="items-end gap-2 inline-flex justify-end">
                    <SocialMediaLogos />
                  </div>
                  <p className="caption justify-end flex">&#169; 2023 Twovest</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
