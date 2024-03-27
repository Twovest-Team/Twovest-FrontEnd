import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useGender from "@/hooks/client-hooks/useGender";

export const PrimaryMenuPagesList = ({ toggleMenu }) => {
  const [gender] = useGender();

  return (
    <div>
      <div className="border border-b border-grey mx-4 my-6"></div>

      <ul className="mx-4">
        {gender && (
          <li key={"SideMenu-GaleriaDeLooks"}>
            <Link
              onClick={toggleMenu}
              href={`/gallery/${gender.string}`}
              className="my-6 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">Galeria de Looks</div>
                <div className="text-secondary caption">
                  🔥 Descobre novos looks e inspira-te!
                </div>
              </div>
              <div>
                <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
              </div>
            </Link>
          </li>
        )}
        <li key={"SideMenu-PontosDeEntrega"}>
          <Link
            onClick={toggleMenu}
            href={"/"}
            className="my-6 font-semibold flex justify-between"
          >
            <div>Pontos de entrega</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Link>
        </li>
        <li key={"Forum"}>
          <Link
            onClick={toggleMenu}
            href={"/"}
            className="my-6 font-semibold flex justify-between"
          >
            <div>Fórum</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Link>
        </li>
        <li key={"SideMenu-PontosECupoes"}>
          <Link
            onClick={toggleMenu}
            href={"/"}
            className="my-6 font-semibold flex justify-between"
          >
            <div className="text-primary_main">Pontos&Cupões</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Link>
        </li>
        <li key={"SideMenu-Contactos"}>
          <Link
            onClick={toggleMenu}
            href={"/"}
            className="my-6 font-semibold flex justify-between"
          >
            <div>Contactos</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Link>
        </li>
        <li key={"SideMenu-HelpCenter"}>
          <Link
            onClick={toggleMenu}
            href={"/"}
            className="my-6 font-semibold flex justify-between"
          >
            <div>Help Center</div>
            <div>
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
