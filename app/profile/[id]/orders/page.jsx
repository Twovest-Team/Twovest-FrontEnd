import NavigationTitle from "@/components/providers/NavigationTitle";
import FiltersPurchaseHistory from "@/components/sliders/FiltersPurchaseHistory";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import PurchaseList from "@/components/sections/PurchaseList";
import { redirect } from "next/navigation";

export default async function Orders({ searchParams }) {
  const currentUser = await useAuthServer();
  if (!currentUser) {
    redirect('/')
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
