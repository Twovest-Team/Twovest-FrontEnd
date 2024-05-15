import supabase from '@/utils/db/clients/public/supabase';

/*Este endpoint é agora inútil, visto que a única diferença que tinha em relação ao getBrands era o limite de rows (9). Como tal, o getBrands
encontra-se agora a aceitar uma variável que define o limite de pedidos. */

const getBrandsHomepage = async () => {
    const { data } = await supabase
        .from('brands')
        .select('*')
        .order('name', { ascending: true })
        .limit(9)
    
    return data;
}

export default getBrandsHomepage