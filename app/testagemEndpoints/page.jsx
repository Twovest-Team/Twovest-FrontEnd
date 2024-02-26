// Lista de imports com todos os endpoints
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import getAllColors from "@/utils/db/getAllColors";
import getAllMaterials from "@/utils/db/getAllMaterials";
import getAllStyles from "@/utils/db/getAllStyles";
import getProductImages from "@/utils/db/getProductImages";
import getProductMaterials from "@/utils/db/getProductMaterials";
import getProductOffers from "@/utils/db/getProductOffers";
import getProductStyles from "@/utils/db/getProductStyles";
import getSizesByType from "@/utils/db/getSizesByType";
import getProductById from "@/utils/db/getProductById";
import getLooksForGallery from "@/utils/db/getLooksForGallery";
import getLookById from "@/utils/db/getLookById";
import getLookProducts from "@/utils/db/getLookProducts";
import getAllCollections from "@/utils/db/collections/getAllCollections";
import getInfoForProfilePage from "@/utils/db/getInfoForProfilePage";
import getProductsByViews from "@/utils/db/getProductsByViews";
import getBrands from "@/utils/db/getBrands";
import getLooksForHomepage from "@/utils/db/getLooksHomepage";
import getAllCollections from "@/utils/db/collections/getAllCollections";


// Desativa o caching e efetua sempre novos pedidos à BD para dados sempre atualizados
export const revalidate = 0;

const page = async () => {
  // Variável onde se deve guardar a resposta da API
    const data = await getAllCollections(22)
  

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        
      </main>
    )
}

export default page;
