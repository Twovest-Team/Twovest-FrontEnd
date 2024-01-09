import { supabase } from '@/utils/db/supabase'

const getProcuctOffers = async(id) => {
    const { data } = await supabase
    .from('offers')
    .select(`
    id,
    price,
    qty,
    colors (
        name
    ),
    sizes (
        size,
        type
    ),
    conditions (
        id,
        name
    )
    `)
    .eq('id_product', id)
    .gt('qty', 0)

    return data
}

export default getProcuctOffers