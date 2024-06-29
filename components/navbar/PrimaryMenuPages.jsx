import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useGender from "@/hooks/client-hooks/useGender";

const menuItems = [
  { key: "SideMenu-PontosDeEntrega", href: "/", label: "Pontos de entrega" },
  { key: "Forum", href: "/", label: "Fórum" },
  { key: "SideMenu-PontosECupoes", href: "/", label: "Pontos&Cupões" },
  { key: "SideMenu-Contactos", href: "/", label: "Contactos" },
  { key: "SideMenu-HelpCenter", href: "/", label: "Help Center" },
];

export const PrimaryMenuPagesList = ({ toggleMenu }) => {
  const [gender] = useGender();

  return (
    <div>
      <div className="border-b border-grey mx-4 mt-8 mb-2"></div>
      <ul className="px-4">
        {gender && (
          <MenuItem
            key="SideMenu-GaleriaDeLooks"
            href={`/${gender.string}/gallery`}
            toggleMenu={toggleMenu}
            label="Galeria de Looks"
            description="🔥 Descobre novos looks e inspira-te!"
          />
        )}
        {menuItems.map(({ key, href, label }) => (
          <MenuItem key={key} href={href} toggleMenu={toggleMenu} label={label} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ key, href, toggleMenu, label, description }) => (
  <li key={key}>
    <Link onClick={toggleMenu} href={href} className="py-3 hover:px-3 transition-all duration-200 rounded hover:bg-grey_opacity_50 flex justify-between items-center">
      <div>
        <div className="font-semibold">{label}</div>
        {description && <div className="text-secondary text-caption">{description}</div>}
      </div>
      <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
    </Link>
  </li>
);
