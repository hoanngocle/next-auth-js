// https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname.startsWith('/extra') && request.nextauth.token?.role !== 'admin') {
            return NextResponse.rewrite(new URL('/denied', request.url));
        }

        if (
            request.nextUrl.pathname.startsWith('/client') &&
            request.nextauth.token?.role !== 'admin' &&
            request.nextauth.token?.role !== 'manager'
        ) {
            return NextResponse.rewrite(new URL('/denied', request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/extra', '/client', '/dashboard'] };
