import supabase from "@/utils/db/clients/public/supabase";

export default async function getBrandTotalItems(id) {

    try {
        const { count, error } = await supabase
            .from("products")
            .select('*', { count: 'exact', head: true })
            .eq('id_brand', id)

        if (error) throw error
        if (count) return count
    } catch (error) {
        console.log(error);
        return { error };
    }

}