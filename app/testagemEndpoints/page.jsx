// Lista de imports com todos os endpoints
import getProductsByCategory from "@/utils/db/getProductsByCategory";
import getAllColors from "@/utils/db/getAllColors";
import getAllMaterials from "@/utils/db/getAllMaterials";
import getAllStyles from "@/utils/db/getAllStyles";
import getProductImages from "@/utils/db/getProductImages";
import getProductMaterials from "@/utils/db/getProductMaterials";
import getProcuctOffers from "@/utils/db/getProductOffers";
import getProductStyles from "@/utils/db/getProductStyles";
import getSizesByType from "@/utils/db/getSizesByType";


// Desativa o caching e efetua sempre novos pedidos à BD para dados sempre atualizados
export const revalidate = 0 

const page = async() => {

  // Variável onde se deve guardar a resposta da API
    const data = await getProductsByCategory(8, 'Homem') 

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(data, null, 2)}</pre>
  
      </main>
    )
}

export default page