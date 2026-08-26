export const AUTH_ROUTES = ['/auth/login', '/auth/register'];

export const PUBLIC_ROUTES = ['/', '/gear', '/gear/[gearid]', '/about', '/contact', ...AUTH_ROUTES];

export const Customer_ROUTES = ['/dashboard/customer', '/dashboard/customer/orders/[id]/pay', '/dashboard/customer/payments', '/payment/success', '/payment/cancel'];

export const Provider_ROUTES = ['/dashboard/provider', '/dashboard/provider/gear/new', '/dashboard/provider/orders'];

export const ADMIN_ROUTES = ['/dashboard/admin'];

