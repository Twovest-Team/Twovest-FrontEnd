import { supabase } from '@/utils/db/supabase';

const getBrandData = async (brandName) => {
    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('name', brandName);
    
    if(error){
        console.log(error)
    }else{
        return data[0];
    }
    
}

export default getBrandData