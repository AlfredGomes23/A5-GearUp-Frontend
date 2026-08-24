import { NextRequest, NextResponse } from 'next/server';
import { verifyReqUser } from './services/verifyReqUser';
import { UserRole } from './types/enums';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './utils/routes';
import { roleBasedAccess } from './utils/roleBasedAccess';
import logout from './app/auth/_actions/logoutAction';


export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)', // don't protect this route
    ]
};


const proxy = async (request: NextRequest) => {
    const { pathname } = request?.nextUrl;
    // console.log("route: ", pathname);

    const goto = (path: string) => NextResponse.redirect(new URL(path, request.url));

    try {
        // get-verify the token and decode the user
        const verifiedReqUser = await verifyReqUser(request?.cookies);
        const reqUserRole = verifiedReqUser?.role as UserRole | undefined;
        // console.log("req user role ", reqUserRole);

        // confirm authored user role
        // if (!Object.values(UserRole).includes(reqUserRole as UserRole)) {
        //     console.error("Missing User Role.");
        //     await logout();
        //     return NextResponse.redirect(new URL("/auth/login", request.url));
        //     // throw new Error("Missing User Role.");
        // };

        // prevent logged in user from auth page
        const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
        if (reqUserRole && isAuthRoute) {
        return NextResponse.redirect(new URL(`/dashboard/${reqUserRole.toLowerCase()}`, request.url));
        };

        // check if not public route
        const isPublicRoute = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/gear/') || isAuthRoute;
        // redirect back to protect router after login
        if (!reqUserRole && !isPublicRoute) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('redirectTo', pathname);
            return NextResponse.redirect(loginUrl);
        };

        // get the allowed roles for current path
        const allowedRoles = roleBasedAccess(pathname);
        // confirm the allowed role for routes
        if (allowedRoles.length > 0 && (!reqUserRole || !allowedRoles.includes(reqUserRole))) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        //forward to next
        return NextResponse.next();

    } catch (error) {
        console.error(error);
        // return NextResponse.redirect(new URL("/error", request.url));
        // throw new Error("Something Went Terribly Wrong !!!");
        console.error("Middleware Error:", error);

        // return NextResponse.json(  { success: false, message: "Internal Server Error in Middleware" }, { status: 500 } );
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
};

export default proxy;