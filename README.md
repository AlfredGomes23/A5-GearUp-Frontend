# GearUp - Sports & Outdoor Gear Rental

A modern, responsive **Next.js** frontend for GearUp — "Rent Sports & Outdoor Gear Instantly". Customers browse and rent gear, providers manage inventory and fulfill orders, and admins moderate the whole platform.

## Live Links

- [Frontend Live](https://gearup-frontend-eight.vercel.app)
- [Backend Live API](https://gearup-backend-one-fawn.vercel.app)
- [Frontend Repo - this](https://github.com/AlfredGomes23/A5-GearUp-Frontend)
- [Backend Repo](https://github.com/AlfredGomes23/A4-GearUp-backend)
- [Project Requirements](./public/GearUp-Frontend-requirements.md)
- [API Integration List](./API_INTEGRATION.md)

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui components
- **Radix UI** primitives, **lucide-react** icons
- **sonner** toasts, **embla-carousel** (reviews carousel)
- Route protection via **proxy.ts** (Next.js 16 middleware)

## Features by Role

### Public / Customer
- Responsive gear grid with search, category, availability and sort filters
- Gear detail page with interactive rental date picker + "Rent Now"
- Rental order placement and checkout (Stripe redirect) with `/payment/success` & `/payment/cancel`
- Customer dashboard: order history with status badges, payment history
- Leave a review after a rental returns, view gear reviews

### Provider
- Overview dashboard (gear, orders, payments stats)
- Gear inventory: create / edit listings, availability + stock toggles
- Order management with status transitions (Confirm, Mark Picked Up, Mark Returned)
- View reviews on gear/order details

### Admin
- Platform overview (users, rental orders, payments stats)
- User management with suspend/activate
- Category management (create, rename)
- Content moderation: all rentals, payments, gear and reviews across the platform

## Main Routes

| Route | Page |
|---|---|
| `/` | Home with featured gear + reviews carousel |
| `/gear`, `/gear/[id]` | Browse & gear detail |
| `/auth/register`, `/auth/login` | Authentication |
| `/dashboard/customer` | Customer dashboard |
| `/dashboard/provider` | Provider dashboard |
| `/dashboard/admin` | Admin dashboard |

## Getting Started

```bash
# install
pnpm install

# environment
# add BACKEND_API_URL to .env.local

# run dev
pnpm dev

# build
pnpm build
```
