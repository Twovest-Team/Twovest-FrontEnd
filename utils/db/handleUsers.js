import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const handleUsers = async (user) => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    if (user) {

        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', user.email)

        if (data.length === 0 && !error) {
            await supabase
                .from('users')
                .insert({ name: user.full_name, img: user.picture, email: user.email }, {returning: "minimal"})
        }


    }
}

export default handleUsers;