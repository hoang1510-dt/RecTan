# RecTan Frontend

Production-ready frontend foundation using:
- React + Vite
- TypeScript (strict)
- TanStack Query
- TanStack Router
- Axios
- Zod
- TailwindCSS

## Scripts

- `npm run dev` - start development server
- `npm run build` - type-check and build production bundle
- `npm run lint` - run ESLint
- `npm run preview` - preview production build

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AUTH_STORAGE_KEY=rectan.auth
```

All variables are validated in `src/lib/env/env.ts` with Zod at startup.

## CI/CD (GitHub Actions)

Pipeline file: `.github/workflows/ci-cd.yml`

- **CI (PR + main push):** install, lint, and build.
- **CD (main push):** deploys `dist` to GitHub Pages.

### One-time GitHub setup

1. In repository **Settings -> Pages**, set **Source** to **GitHub Actions**.
2. Add repository secret `VITE_API_BASE_URL` with your production API URL.
3. Push to `main` to trigger deployment.

## Folder Explanation

- `src/app` - application wiring: providers, router, and global styles.
- `src/features` - feature modules grouped by business domain (auth in this starter).
- `src/shared` - reusable UI primitives, shared hooks, and constants.
- `src/lib` - infrastructure code (API client, interceptors, env parser, storage, query client).

### Auth Flow

1. `features/auth` handles login schema, API call, mutation hook, and page UI.
2. `AuthProvider` stores auth session and exposes `login` / `logout`.
3. Axios request interceptor injects JWT automatically.
4. Axios response interceptor normalizes errors and handles `401` globally.
5. Protected routes enforce authentication and redirect unauthenticated users to `/login`.
