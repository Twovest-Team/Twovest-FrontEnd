import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const handleUsers = async (user) => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    /* console.log(user) */
    if (user) {

        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', user.email)

        if (data.length === 0 && !error) {
            if(user.picture == null){
                user.picture="https://nchduotxkzvmghizornd.supabase.co/storage/v1/object/public/users_profile_pictures/users_default_img.jpg";
            }
            await supabase
                .from('users')
                .insert({ name: user.full_name, img: user.picture, email: user.email }, {returning: "minimal"})
                /* .insert({ name: user.username, img: user.image, email: user.email }, {returning: "minimal"}) */
                
        }

    }
}

export default handleUsers;