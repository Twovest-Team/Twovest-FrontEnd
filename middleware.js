import { NextResponse } from 'next/server';

// Define genders array outside of the middleware function
const genders = [
    { id: 0, string: 'women', stringPT: 'Mulher' },
    { id: 1, string: 'men', stringPT: 'Homem' }
];

// Function to get gender object by id or string
const getGenderObject = (param) => {
    return genders.find(object => object.id == param || object.string == param);
};

// Function to determine gender parameter based on pathname
const getGenderParam = (pathname) => {
    if (pathname.includes('/men')) return 'men';
    if (pathname.includes('/women')) return 'women';
    return null;
};

export async function middleware(request) {
    const { cookies, nextUrl } = request;

    const cookieOnboarding = cookies.has('onboarding');
    const cookieGender = cookies.has('gender');
    const pathname = nextUrl.pathname;
    const searchParams = nextUrl.searchParams;
    const hasInviteQuery = searchParams.has('invite');
    const param = getGenderParam(pathname);

    let response = NextResponse.next();

    if (!cookieOnboarding) {
        if (!hasInviteQuery) {
            response = NextResponse.redirect(new URL(`${pathname}?onboarding=true`, request.url));
        }
        response.cookies.set('onboarding', '1');
    }

    if (param) {
        response.cookies.set('gender', JSON.stringify(getGenderObject(param)));
    } else if (!cookieGender) {
        response.cookies.set('gender', JSON.stringify(getGenderObject('women')));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
