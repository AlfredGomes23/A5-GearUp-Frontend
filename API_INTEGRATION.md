# API Integration List
Backend API ===> Frontend.

## Authentication
| Backend API | Frontend Usage | Methods |
|---|---|---|
| `/api/auth/register` | `/auth/register/page.tsx` (`app/auth/_actions/registerAction.ts`) | POST |
| `/api/auth/login` | `/auth/login/page.tsx` (`app/auth/_actions/loginAction.ts`) | POST |
| `/api/auth/me` | `/layout.tsx` → `NavbarHandler.tsx` (`services/getUser.ts`) | GET |
| `/api/auth/refresh-token` | `/layout.tsx` → `NavbarHandler.tsx` → `services/getNewAccessToken.ts` | POST |

## Public Browsing
| Backend API | Frontend Usage | Methods |
|---|---|---|
| `/api/gear` | `/` home featured gear + `/gear/page.tsx` (`app/gear/_actions/getGears.ts`) | GET |
| `/api/gear/:id` | `/gear/[gearId]/page.tsx` (`app/gear/_actions/getGearById.ts`, used by provider/admin detail too) | GET |
| `/api/category` | `/gear` filters (`app/gear/_actions/getCategories.ts`) | GET |
| `/api/review?gearId=:id` | `/gear/[gearId]/page.tsx` reviews (`app/gear/_actions/reviewActions.ts`) | GET |
| `/api/review` | home reviews carousel `getAllReviews` (`app/gear/_actions/reviewActions.ts`) | GET |

## Customer
| Backend API | Frontend Usage | Methods |
|---|---|---|
| `/api/rental` (POST) | `/gear/[gearId]` RentDatePicker (`app/gear/_actions/createRental.ts`) | POST |
| `/api/rental` | customer orders list `/dashboard/customer/orders` (`app/dashboard/customer/_actions/getMyOrders.ts`) | GET |
| `/api/rental/:id` | customer order detail `/dashboard/customer/orders/[orderId]` (`getOrderById.ts`) | GET |
| `/api/rental` (PATCH) | cancel order (`app/dashboard/customer/_actions/cancelRental.ts`) | PATCH |
| `/api/payment` | customer payments `/dashboard/customer/payments` (`getMyPayments.ts`) | GET |
| `/api/payment/create` | `/dashboard/customer/orders/[orderId]/pay` PayButton (`createCheckout.ts`) | POST |
| `/api/review` (POST) | Leave Review form on returned order (`app/gear/_actions/reviewActions.ts`) | POST |
| `/api/user` (PATCH) | profile update `/dashboard/profile` (`app/dashboard/profile/_actions/updateProfile.ts`) | PATCH |

## Provider
| Backend API | Frontend Usage | Methods |
|---|---|---|
| `/api/gear` | `/dashboard/provider/gear` list + `/dashboard/provider` overview (`getMyGear.ts`) | GET |
| `/api/gear/:id` | provider gear detail (`getProviderGearById.ts`) | GET |
| `/api/provider/gear` | create gear `/dashboard/provider/gear/new` (`createGear.ts`) | POST |
| `/api/gear` (PATCH) | edit gear `/dashboard/provider/gear/[gearId]` (`updateGear.ts`) | PATCH |
| `/api/provider/orders` | provider orders `/dashboard/provider/orders` (`getProviderOrders.ts`) | GET |
| `/api/provider/orders` (PATCH) | status update Confirm/PickedUp/Returned (`updateRentalStatus.ts`) | PATCH |
| `/api/rental/:id` | provider order detail `/dashboard/provider/orders/[orderId]` (`getProviderOrderById.ts`) | GET |
| `/api/payment` | provider payments `/dashboard/provider/payments` (`getMyPayments.ts`) | GET |

## Admin
| Backend API | Frontend Usage | Methods |
|---|---|---|
| `/api/admin/users` | `/dashboard/admin/users` list (`getUsers.ts`) | GET |
| `/api/admin/users/:id` | user detail `/dashboard/admin/users/[id]` (`getUser.ts`) | GET |
| `/api/admin/users` (PATCH) | suspend/activate (`updateUserStatus.ts`) | PATCH |
| `/api/admin/rentals` | rentals list `/dashboard/admin/rental-orders` (`getAdminRentals.ts`) | GET |
| `/api/rental/:id` | admin rental detail `/dashboard/admin/rental-orders/[rentalId]` (`getRentalById.ts`) | GET |
| `/api/payment` | payments list `/dashboard/admin/payments` (`getAdminPayments.ts`) | GET |
| `/api/payment/:id` | payment detail `/dashboard/admin/payments/[paymentId]` (`getPaymentById.ts`) | GET |
| `/api/category` | categories `/dashboard/admin/categories` (`getCategories.ts`, `createCategory.ts`) | GET, POST |
| `/api/category/:id` | rename category (`updateCategory.ts` — id passed in body) | PATCH |
| `/api/admin/gears` | user detail provider gear list (`getUserGear.ts`) | GET |
| `/api/review?gearId=:id` | admin rental detail reviews (`getReviewsByGear.ts`) | GET |

## Routes & Page Mapping (from requirements)
| Requirement Route | App Router Page |
|---|---|
| `/` | `app/page.tsx` |
| `/gear` | `app/gear/page.tsx` |
| `/gear/[id]` | `app/gear/[gearId]/page.tsx` |
| `/auth/register` | `app/auth/register/page.tsx` |
| `/auth/login` | `app/auth/login/page.tsx` |
| `/payment/success`, `/payment/cancel` | `app/payment/success/page.tsx`, `app/payment/cancel/page.tsx` |
| `/dashboard/customer` | `app/dashboard/customer/page.tsx` |
| `/dashboard/customer/orders/[id]/pay` | `app/dashboard/customer/orders/[orderId]/pay/page.tsx` |
| `/dashboard/provider` | `app/dashboard/provider/page.tsx` |
| `/dashboard/provider/gear/new` | `app/dashboard/provider/gear/new/page.tsx` |
| `/dashboard/provider/orders` | `app/dashboard/provider/orders/page.tsx` |
| `/dashboard/admin` | `app/dashboard/admin/page.tsx` |
| `/dashboard/admin/users` | `app/dashboard/admin/users/page.tsx` |
| `/dashboard/admin/rental-orders` | `app/dashboard/admin/rental-orders/page.tsx` |
| `/dashboard/admin/payments` | `app/dashboard/admin/payments/page.tsx` |
| `/dashboard/admin/categories` | `app/dashboard/admin/categories/page.tsx` |
