import { supabase } from '@/utils/db/supabase';

const getBrands = async () => {
    const { data } = await supabase
        .from('brands')
        .select('*')
        .order('name', { ascending: true })
    
    
    return data;
}

export default getBrands