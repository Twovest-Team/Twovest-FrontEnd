import { NextResponse } from 'next/server';
import handleUsers from '@/utils/db/handleUsers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {
        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            handleUsers(user.user_metadata);
        }

        return NextResponse.redirect(process.env.NEXT_PUBLIC_URL);
    } catch (error) {
        console.error('Error in GET request:', error);

        // You may want to handle the error appropriately, such as redirecting to an error page.
        return NextResponse.error(new Error('Unauthorized access'));
    }
}