// Lista de imports com todos os endpoints
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import getAllColors from "@/utils/db/getAllColors";
import getAllMaterials from "@/utils/db/getAllMaterials";
import getAllStyles from "@/utils/db/getAllStyles";
import getProductStyles from "@/utils/db/getProductStyles";
import getSizesByType from "@/utils/db/getSizesByType";
import getProductById from "@/utils/db/getProductById";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import getLookById from "@/utils/db/getLookById";
import getProductsByViews from "@/utils/db/getProductsByViews";
import getBrands from "@/utils/db/getBrands";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import removeFromCart from "@/utils/db/cart/removeFromCart";
import useAuthServer from "@/hooks/server-hooks/useAuthServer";
import getCollections from "@/utils/db/collections/getCollections";
import getUserOrders from "@/utils/db/getUserOrders";
import getAuthServer from "@/utils/db/auth/getAuthServer";
import getCollectionMembers from "@/utils/db/collections/getCollectionMembers";
import { getCollectionData } from "@/utils/handlers/handleCollections";

// Desativa o caching e efetua sempre novos pedidos à BD para dados sempre atualizados
export const revalidate = 0;

const page = async () => {
    
  const user = await useAuthServer()
    // Variável onde se deve guardar a resposta da API
    const data = await getCollectionData(user, 71)

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        
      </main>
    )
}

export default page;
