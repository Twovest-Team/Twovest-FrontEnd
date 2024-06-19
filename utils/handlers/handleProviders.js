
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const handleProviders = async (provider) => {

    const supabase = createClientComponentClient();

    switch (provider) {
        case 'Google':
            await supabase.auth.signInWithOAuth({
                provider: "Google",
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`
                }
            });
        case 'Facebook':
            break;
        case 'Apple':
            break;
    }

}

export default handleProviders