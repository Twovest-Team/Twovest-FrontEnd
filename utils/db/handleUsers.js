import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import getStorageImage from "../getStorageImage";

const handleUsers = async (user) => {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    //console.log(user);
    if (user) {

        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', user.email)

        if (data.length === 0 && !error) {
            if(user.picture == null){
                user.picture= '/users/default/default.png';
            }
            if(user.provider == "" || user.provider == null){
                user.provider == "Google";
            }
            await supabase
                .from('users')
                .insert({ name: user.full_name, img: user.picture, email: user.email, provider: user.provider }, {returning: "minimal"})
                /* .insert({ name: user.username, img: user.image, email: user.email }, {returning: "minimal"}) */
                
        }

    }
}

export default handleUsers;