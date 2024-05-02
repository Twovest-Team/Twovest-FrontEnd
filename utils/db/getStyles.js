import { supabase } from '@/utils/db/supabase';

const getStyles = async () => {
    const { data } = await supabase
        .from('styles')
        .select('*')
        .order('name', { ascending: true })
    
    
    return data;
}

export default getStyles;