import { NextResponse } from 'next/server';
import getGender from './utils/getGender';

export async function middleware(request) {
    const cookieOnboarding = request.cookies.has('onboarding');
    const cookieGender = request.cookies.has('gender');
    const pathname = request.nextUrl.pathname;

    const searchParams = request.nextUrl.searchParams;
    const hasInviteQuery = searchParams.has('invite');

    const getGenderParam = () => {
        if (pathname.includes('/men')) return 'men';
        if (pathname.includes('/women')) return 'women';
        return null;
    };

    const param = getGenderParam();

    let response = NextResponse.next();

    if (!cookieOnboarding) {
        if (!hasInviteQuery) {
            response = NextResponse.redirect(new URL(`${pathname}?onboarding=true`, request.url));
        }

        response.cookies.set('onboarding', '1');
    }

    if (param) {
        response.cookies.set('gender', JSON.stringify(getGender(param)));
    } else if (!cookieGender) {
        response.cookies.set('gender', JSON.stringify(getGender('women')));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
