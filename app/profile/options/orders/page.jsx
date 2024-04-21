import NavigationTitle from "@/components/providers/NavigationTitle";
import FiltersPurchaseHistory from "@/components/sliders/FiltersPurchaseHistory";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import PurchaseList from "@/components/sections/PurchaseList";
import { NoResultsNotice } from "@/components/sections/NoResultsNotice";
// Isto é a página "Histórico de Compras"
// twovest.com/options/orders
export default async function Orders({ searchParams }) {
  const currentUser = await useAuthServer();
  if (!currentUser) {
    return (
      <NoResultsNotice
        title={"Não encontramos encomendas."}
        text={
          "Não tens sessão iniciada. Inicia a tua sessão para consultares as tuas encomendas"
        }
        btnText={"Ir para Geral"}
      />
    );
  }

  const type = searchParams.type;
  if (currentUser) {
    return (
      <main>
        <NavigationTitle titleText={"Histórico de compras"} />
        <FiltersPurchaseHistory currentCategory={type} />
        <PurchaseList type={type} user={currentUser} />
      </main>
    );
  }
}
