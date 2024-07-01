import { NextResponse } from 'next/server';

// Define genders array outside of the middleware function
const genders = [
    { id: 0, string: 'women', stringPT: 'Mulher' },
    { id: 1, string: 'men', stringPT: 'Homem' }
];

const getGenderObject = (param) => {
    return genders.find(object => object.id == param || object.string == param);
};

const getGenderParam = (pathname) => {
    if (pathname.includes('/men')) return 'men';
    if (pathname.includes('/women')) return 'women';
    return null;
};

export async function middleware(request) {
    const { cookies, nextUrl } = request;

    const cookieOnboarding = cookies.has('onboarding');
    const cookieGender = cookies.has('gender');
    const cookieWarning = cookies.has('warning');

    let pathname = nextUrl.pathname;
    const param = getGenderParam(pathname)

    let response = NextResponse.next();

    
    if(pathname === '/' && !param){
        pathname = pathname.concat('', 'women')
        response = NextResponse.redirect(new URL(`${pathname}`, request.url));
    }

    if (!cookieOnboarding) {
        response = NextResponse.redirect(new URL(`${pathname}?onboarding=true`, request.url));
        response.cookies.set('onboarding', '1');
    }

    if (!cookieWarning) {
        response = NextResponse.redirect(new URL(`${pathname}?cookiesWarning=true`, request.url));
        response.cookies.set('warning', '1');
    }

    if(param){
        response.cookies.set('gender', JSON.stringify(getGenderObject(param)));
    }

    if(!param && !cookieGender){
        response.cookies.set('gender', JSON.stringify(getGenderObject('women')));
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
