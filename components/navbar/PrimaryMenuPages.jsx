import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const PrimaryMenuPagesList = ({ gender, toggleMenu }) => {

  const menuItems = [
    { key: "SideMenu-HelpCenter", href: "/", label: "Help Center" },
    { key: "SideMenu-Contactos", href: "/", label: "Contactos" },
    { key: "SideMenu-PontosDeEntrega", href: "/", label: "Pontos de entrega", disabled: true },
    { key: "Forum", href: "/", label: "Fórum", disabled: true },
  ];


  return (
    <div>
      <div className="border-b border-grey mx-4 mt-6 mb-3"></div>
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
        {menuItems.map(({ key, href, label, disabled }) => (
          <MenuItem disabled={disabled} key={key} href={href} toggleMenu={toggleMenu} label={label} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ key, href, toggleMenu, label, description, disabled }) => (
  <li key={key}>
    <Link
      onClick={toggleMenu}
      href={href}
      className={` ${disabled ? 'pointer-events-none' : ''} py-3 hover:px-3 transition-all duration-200 rounded hover:bg-grey_opacity_50 flex justify-between items-center`}>
      <div className="flex gap-2">
        <div className="flex flex-col">
          <div className='font-semibold'>{label}</div>
          {description && <div className="text-secondary text-caption">{description}</div>}
        </div>

        {disabled && <p className="text-white opacity-100 bg-black px-2 py-1 text-[10px] font-semibold rounded">SOON</p>}
      </div>
      {<ArrowForwardIosIcon sx={{ fontSize: 18 }} />}
    </Link>
  </li>
);
