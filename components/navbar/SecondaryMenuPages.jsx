import Link from "next/link";

export const SecondaryMenuPagesList = ({ toggleMenu }) => {
  return (
    <div>
      <div className="border border-b border-grey mx-4 my-6"></div>

      <ul className="mx-4">
        <li className="my-6" key={"SideMenu-SobreNos"}>
          <Link href={"/"} onClick={toggleMenu}>
            Sobre nós
          </Link>
        </li>
        <li className="my-6" key={"SideMenu-ProtecaoDeDados"}>
          <Link href={"/"} onClick={toggleMenu}>
            Proteção de dados
          </Link>
        </li>
        <li className="my-6" key={"SideMenu-TermosDeServico"}>
          <Link href={"/"} onClick={toggleMenu}>
            Termos de serviço
          </Link>
        </li>
        <li className="my-6" key={"SideMenu-AvisoLegal"}>
          <Link href={"/"} onClick={toggleMenu}>
            Aviso legal
          </Link>
        </li>
      </ul>
    </div>
  );
};
