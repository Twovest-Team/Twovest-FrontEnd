import { supabase } from '@/utils/db/supabase';

const getBrands = async () => {
    const { data } = await supabase
        .from('brands')
        .select('*');
    
    
    return data;
}

export default getBrands