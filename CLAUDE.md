# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

```
marviefarm/
├── nestjs-api/        ← NestJS 10 + Prisma 5 REST API (TypeScript)
├── frontend/          ← React 18 + Vite + shadcn/ui SPA (TypeScript)
├── www/marviefarm/    ← Original CakePHP 1.3 source (reference only, not modified)
├── docker-compose.yml ← Three services: db (MariaDB 11), api (:3000), frontend (:8080)
└── MIGRATION_NOTES.md ← Porting decisions and intentional PHP→TS behavioral differences
```

## Commands

### API (`nestjs-api/`)

```bash
npm run start:dev          # watch mode
npm run build              # compile to dist/
npm run test:e2e           # run all E2E tests (requires live DB — see .env)
npx jest --testPathPattern="auth" --config test/jest-e2e.json   # single test file
npx prisma generate        # regenerate Prisma client after schema change
npx prisma migrate dev     # create + apply migration (dev)
npx prisma migrate deploy  # apply pending migrations (prod/CI)
```

E2E tests need a running MariaDB. Copy `.env.example` (not yet committed) or set:
```
DATABASE_URL=mysql://marviefarm:secret@localhost:3306/marviefarm
JWT_SECRET=any_dev_secret
```

### Frontend (`frontend/`)

```bash
npm run dev     # Vite dev server on :5173, proxies /api → localhost:3000
npm run build   # tsc + vite build → dist/
```

### Docker (full stack)

```bash
docker compose up --build          # builds both images, starts all three services
docker compose up --build api      # rebuild API only
# App available at http://localhost:8080
```

## API architecture (`nestjs-api/src/`)

**Module structure** — one NestJS module per domain, each self-contained:
`auth` · `sizing` · `materials` · `compositions` · `catalog` · `customers` · `orders` · `reports`

All modules are registered in `app.module.ts`. A global `APP_GUARD` (`JwtAuthGuard`) protects every route. Use `@Public()` to bypass it for specific endpoints.

**Service pattern** — every service has:
- `includeRelations` const (Prisma `include` shape, reused across find calls)
- `toResponse()` method that converts a Prisma payload to the JSON shape. This is where `Prisma.Decimal` → `Number()` conversions happen, and where `displayName` is assembled via `joinDisplay()` / `fullPersonName()` from `src/common/display-name.ts`.
- `findAll()` returns `{ data, total, page, limit }` — always paginated.

**Delete protection** — before deleting any entity that has FK dependents, `count()` the dependents and throw `ConflictException` if > 0. Cascade deletes use `prisma.$transaction([deleteMany(...), delete(...)])`.

**HABTM updates** — full-replace strategy: `deleteMany: {} + create: [...]` in a single Prisma `update`.

**Route ordering** — static routes (`/next-number`, `/fabric-options`, `/batch`) must be declared **before** the `/:id` route in every controller. NestJS resolves routes top-to-bottom.

**Raw SQL** — use `prisma.$queryRaw` with tagged template literals only. Never string-interpolate user input. The cost-calculation UNION query in `reports.service.ts` is the only raw query; it takes no user input.

**PDF generation** — `reports.service.ts` uses `import('puppeteer')` (dynamic) with `--no-sandbox`. Set `CHROMIUM_PATH` env var to use a pre-installed Chrome instead of Puppeteer's bundled one.

## Frontend architecture (`frontend/src/`)

**Auth** — JWT stored in `localStorage` under `mf_token`. `src/lib/auth.tsx` provides `AuthProvider` + `useAuth()`. The axios instance in `src/lib/api.ts` injects the token via request interceptor and redirects to `/login` on 401.

**API proxy** — in dev, Vite proxies `/api/*` → `localhost:3000/*`. In production (Docker), Nginx in `frontend/nginx.conf` proxies `/api/*` → `http://api:3000/*`. The axios `baseURL` is always `/api`.

**Generic CRUD** — `src/components/app/CrudPage.tsx` handles list + paginate + create/edit dialog + delete confirmation for any entity. Each entity page provides `columns`, `endpoint`, `queryKey`, and a `FormComponent`. Use this pattern for all simple entities.

**Complex pages** — `OrderDetailPage.tsx` (order lines + batch insert + totals + PDF buttons) is implemented as a standalone page, not using `CrudPage`.

**Types** — `src/types/api.ts` defines all response shapes. Keep in sync with what `toResponse()` returns in the API services.

**shadcn/ui components** — written manually in `src/components/ui/`. Do not run `npx shadcn-ui add` (would overwrite). Add new components to that directory following the existing patterns.

## Prisma schema notes

- Legacy column names use `@map()`: `qta` → `quantity`, `modeltypes_sex_id`, `orderheader_id`, etc.
- `Article.image` is `Bytes?` — never include it in list/findOne responses; serve only via `GET /articles/:id/image` (`@Public()`).
- `Supplier` model has `company/name/surname` (person-style) — `displayName` uses `joinDisplay([company, fullPersonName(name, surname)])`.
- `OrderDetail.quantity` maps to `@map("qta")` — the DB column is `qta`.

## Key env vars

| Var | Notes |
|---|---|
| `DATABASE_URL` | `mysql://marviefarm:secret@localhost:3306/marviefarm` for local dev |
| `JWT_SECRET` | Any string for dev; 32+ chars in prod |
| `CAKEPHP_SECURITY_SALT` | Required to verify passwords from the legacy DB. Found in `www/marviefarm/app/config/core.php` at `Configure::write('Security.salt', ...)`. Can be removed once all users have logged in at least once. |
| `CHROMIUM_PATH` | Optional path to pre-installed Chrome for Puppeteer |

## What NOT to port from the original PHP

`CountdownController` — hardcoded business logic, intentionally excluded. See `MIGRATION_NOTES.md` for the full list of intentional behavioral differences (session→JWT, SHA1→bcrypt re-hash, AJAX partials→JSON endpoints, etc.).
