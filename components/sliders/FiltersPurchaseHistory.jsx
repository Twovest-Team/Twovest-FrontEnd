"use client";

import ContentSlider from "./ContentSlider";
import useScroll from "@/hooks/client-hooks/useScroll";
import Button from "../buttons/Button";

const FiltersPurchaseHistory = ({ currentCategory }) => {
  const [scrollX, scrollY] = useScroll();
  const scrollCSS = scrollY && scrollY >= 75 ? "shadow-md h-24" : "h-16";

  return (
    <ContentSlider
      className={`sticky top-[75px] z-10 w-full transition-all duration-300 bg-white ${scrollCSS} flex items-center`}
    >
      <li key={"FiltersPurchaseHistory-ButtonAll"}>
        <Button
          height="44px"
          href={"/profile/options/orders"}
          type={!currentCategory ? "black" : "grey"}
          ariaLabel="Todas as encomendas efetuadas"
        >
          Todas
        </Button>
      </li>

      <li key="FiltersPurchaseHistory-ButtonEntregues">
        <Button
          key="FiltersPurchaseHistory-ButtonEntregues"
          height="44px"
          href={`/profile/options/orders?type=delivered`}
          type={currentCategory === "delivered" ? "black" : "grey"}
          ariaLabel={`Estado de encomenda: Entregue`}
        >
          Entregues
        </Button>
      </li>

      <li key="FiltersPurchaseHistory-ButtonPendentes">
        <Button
          key="FiltersPurchaseHistory-ButtonPendentes"
          height="44px"
          href={`/profile/options/orders?type=pending`}
          type={currentCategory === "pending" ? "black" : "grey"}
          ariaLabel={`Estado de encomenda: Pendente`}
        >
          Pendentes
        </Button>
      </li>

      <li key="FiltersPurchaseHistory-ButtonCanceladas">
        <Button
          key="FiltersPurchaseHistory-ButtonCanceladas"
          height="44px"
          href={`/profile/options/orders?type=canceled`}
          type={currentCategory === "canceled" ? "black" : "grey"}
          ariaLabel={`Estado de encomenda: Cancelada`}
        >
          Canceladas
        </Button>
      </li>
    </ContentSlider>
  );
};

export default FiltersPurchaseHistory;
