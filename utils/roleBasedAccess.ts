import { UserRole } from "@/types/enums";

const ROLE_ROUTE_MAP: Record<UserRole, string[]> = {
    [UserRole.CUSTOMER]: ['/dashboard/customer'],
    [UserRole.PROVIDER]: ['/dashboard/provider'],
    [UserRole.ADMIN]: ['/dashboard/admin'],
};

// role based access controll
export const roleBasedAccess = (pathname: string) =>
    // filter route row with same pathname or prefix pathname
    Object.entries(ROLE_ROUTE_MAP).filter(([, routes]) =>
        routes.some(r => pathname === r || pathname.startsWith(r + '/')))
        // return the allowed roles for that pathname
        .map(([role]) => role);