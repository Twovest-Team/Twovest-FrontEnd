import { NextResponse } from 'next/server'

export async function middleware(request) {
    const response = NextResponse.next();

    const pathname = request.nextUrl.pathname

    if (pathname !== '/LandingPageMP') return NextResponse.redirect(new URL('/LandingPageMP', request.url))

    return response
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}
