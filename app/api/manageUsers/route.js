import { NextResponse } from 'next/server';
import handleUsers from '@/utils/db/handleUsers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export async function GET(request) {

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        handleUsers(user.user_metadata)
    }


    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL)
}