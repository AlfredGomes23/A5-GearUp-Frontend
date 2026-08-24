import { NextRequest, NextResponse } from 'next/server';
import { verifyReqUser } from './services/verifyReqUser';
import { UserRole } from './types/enums';
import { AUTH_ROUTES } from './utils/routes';


export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)', // don't protect this route
    ]
};


const proxy = async (request: NextRequest) => {
    const goto = (path: string) => NextResponse.redirect(new URL(path, request.url));

    try {
        const { pathname } = request?.nextUrl;
        // console.log("route: ", pathname);

        // get-verify the token and decode the user
        const verifiedReqUser = await verifyReqUser(request?.cookies);

        const reqUserRole = verifiedReqUser?.role;
        // console.log("req user role ", reqUserRole);

        // confirm authored user role
        if (!Object.values(UserRole).includes(reqUserRole as UserRole)){
            console.error("Missing User Role.");
            throw new Error("Missing User Role.");
        };
        // prevent logged in user from auth page
        if(AUTH_ROUTES.includes(pathname)){
            return reqUserRole ? goto('/dashboard') : NextResponse.next();
        };

        //forward to next
        return NextResponse.next();

    } catch (error) {
        console.error(error);
        // return NextResponse.redirect(new URL("/error", request.url));
        // throw new Error("Something Went Terribly Wrong !!!");
        console.error("Middleware Error:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error in Middleware" },
      { status: 500 }
    );
    }
};

export default proxy;