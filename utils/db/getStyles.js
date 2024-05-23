import supabase from "./clients/public/supabase";

const getStyles = async () => {
    const { data } = await supabase
        .from('styles')
        .select('*')
        .order('name', { ascending: true })
    
    
    return data;
}

export default getStyles;