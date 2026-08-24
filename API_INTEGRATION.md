# API Integration List
Backend API ===> Frontend.
- POST /api/auth/login ===> /auth/login/page.tsx
- POST /api/auth/registration ===> /auth/registration/page.tsx
- GET /api/auth/me ==> /layout.tsx (NavbarHandler.tsx)
- POST /api/auth/refresh-token ===> /layout.tsx (NavbarHandler.tsx > ... > getNewAccessToken.ts)

- 
