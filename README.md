# Dan Danaher Portfolio

Clean TypeScript + React single-page layout for showcasing bio, projects, and contact information. The codebase drops Lovable/shadcn scaffolding in favor of a light component set and clear folder structure.

## Project scripts

- `npm run dev` – start Vite in development mode.
- `npm run build` – generate a production build in `dist/`.
- `npm run build:dev` – build using the `development` mode profile.
- `npm run preview` – preview the production build locally.
- `npm run lint` – run ESLint across the project.

## Directory layout

- `src/assets` – static assets (favicons, ASCII art) used at runtime.
- `src/components` – presentational pieces grouped by concern (`cards`, `layout`, `shared`).
- `src/data` – placeholder copy for page sections and demos.
- `src/pages` – route-level screens rendered inside the shared layout shell.
- `src/providers` – global React context (sidebar controls).
- `src/lib` – utility helpers (`cn` class combiner).

## Tech stack

- React 18 with React Router 6 for routing.
- Tailwind CSS for styling with a trimmed config.
- TypeScript and Vite for tooling and bundling.

## Getting started

```bash
npm install
npm run dev
```

The dev server defaults to `http://localhost:8080`. Adjust `vite.config.ts` if you need different host/port settings.

## Notes

- All legacy Lovable / shadcn UI artifacts were removed. Re-introduce selectively via `npm install` if you need additional components later.
- Sample copy lives in `src/data/samples.ts`; replace with live data or requests to APIs when ready.
