import supabase from '@/utils/db/clients/public/supabase';
const getAllOffers = async (productId) => {
    try {
        const { data, error } = await supabase
            .from("offers")
            .select(
                `
                *,
                products (*),
                conditions (*),
                sizes (*),
                colors (*)
            `
            )
            .eq("id_product", productId)
            

        return data;
    } catch (error) {
       
        console.error("Error fetching offers:", error.message);
        return null;
    }
};

export default getAllOffers;