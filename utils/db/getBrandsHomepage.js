import { supabase } from '@/utils/db/supabase';

const getBrandsHomepage = async () => {
    const { data } = await supabase
        .from('brands')
        .select('*')
        .order('name', { ascending: true })
        .limit(4)
    
    return data;
}

export default getBrandsHomepage