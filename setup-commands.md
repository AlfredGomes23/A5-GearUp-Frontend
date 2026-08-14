# Setup Commands

1. NextJS setup:
```bash
# make project path, install nextJS on it 
pnpm create next-app@latest Assignment5
# pnpm create next-app@latest . # for empty current path
cd Assignment5
# run localhost
pnpm dev

```

2. setup git

3. CSS Framework - shadcn setup preset: --preset b2C7ItRdS
```bash
pnpm dlx shadcn@latest init --preset b2C7ItRdS --base radix --template next --monorepo --pointer
```
4. File Structure setup

```bash
# middle-ware
touch proxy.tsx
# auth group
mkdir -p app/auth/{register,login,_action,_components} && touch app/auth/{register,login}/page.tsx
# dashboard
mkdir -p app/auth/{register,login,_action,_components} && touch app/auth/{register,login}/page.tsx
```