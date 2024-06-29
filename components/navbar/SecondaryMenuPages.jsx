import Link from "next/link";

const menuItems = [
  { key: "SideMenu-SobreNos", href: "/aboutus", label: "Sobre nós" },
  { key: "SideMenu-ProtecaoDeDados", href: "/", label: "Proteção de dados" },
  { key: "SideMenu-TermosDeServico", href: "/", label: "Termos de serviço" },
  { key: "SideMenu-AvisoLegal", href: "/", label: "Aviso legal" },
];

export const SecondaryMenuPagesList = ({ toggleMenu }) => {
  return (
    <div>
      <div className="border-b border-grey mx-4 my-3"></div>
      <ul className="mx-4">
        {menuItems.map(({ key, href, label }) => (
          <MenuItem key={key} href={href} toggleMenu={toggleMenu} label={label} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ key, href, toggleMenu, label }) => (
  <li className="my-6" key={key}>
    <Link href={href} onClick={toggleMenu}>
      {label}
    </Link>
  </li>
);
