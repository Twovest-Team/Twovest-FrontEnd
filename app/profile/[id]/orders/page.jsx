import NavigationTitle from "@/components/providers/NavigationTitle";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import PurchaseList from "@/components/sections/PurchaseList";
import { redirect } from "next/navigation";
import TopbarFilters from "@/components/items/TopbarFilters";
import { getTopbarFilters } from "@/utils/handlers/handleFilters";

export default async function Orders({ searchParams }) {
  
  const currentUser = await useAuthServer();

  if (!currentUser) {
    redirect('/')
  }

  const filteredTypes = getTopbarFilters(searchParams);

  if (currentUser) {
    return (
      <main className="flex min-h-svh flex-col">
        <NavigationTitle titleText={"Histórico de compras"} />
        <TopbarFilters elements={[
          'Todas', 'Entregues', 'Pendentes' ,'Canceladas'
        ]} />
        <PurchaseList types={filteredTypes} user={currentUser} />
      </main>
    );
  }
}
