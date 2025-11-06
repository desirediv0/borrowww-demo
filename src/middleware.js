
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get token from cookies (not localStorage)
    const token = request.cookies.get('token')?.value || null;
    const { pathname } = request.nextUrl;

    // If user is logged in, block access to /auth pages
    if (token && pathname.startsWith('/auth')) {
        const url = request.nextUrl.clone();
        url.pathname = '/'; // or '/dashboard' if you want
        return NextResponse.redirect(url);
    }

    // If user is not logged in, block access to protected pages (not /auth, /about, /contact, etc.)
    if (!token && !pathname.startsWith('/auth') && !['/', '/about', '/contact', '/faq'].some(p => pathname.startsWith(p))) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
