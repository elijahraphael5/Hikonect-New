# Hikonnect — Agent Guide

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint (config in `eslint.config.mjs`) |
| `npm start` | Start production server |

No test framework is configured. No type checking (`jsconfig.json` only sets `@/*` path alias).

## Architecture

- **Next.js 16 (App Router)** with `src/` directory.
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.mjs`).
- **`@/*`** maps to `./src/*`.
- **No root `layout.js`** — `page.js` renders its own `<html>`/`<body>` directly.
- **Single-page site** — all content is in `src/app/page.js`. Original home design (Climate Crisis font, dark #050818) is at the top, followed by new framer-motion sections (Why, About, Vision/Mission, Packages, Coverage, Testimonials, Contact, Footer).
- **framer-motion** for scroll-triggered animations (`useInView`, `motion.div`, `AnimatePresence`).
- **`GlobalStyles` component** injects a `<style>` tag with all CSS — includes both original section styles and new utility classes (`.glass`, `.text-gradient`, `.btn-primary`, `.section-eyebrow`, etc.). No external `.css` files or modules.
- **Shared component**: `src/components/Navbar.js` (imported via `@/components/Navbar`). All other components are defined inline in `page.js`.

## Conventions

- Default exports for pages.
- Tailwind is not used — all styling is inline JS `style` props or the `GlobalStyles` `<style>` block.
- Images use plain `<img>` tags from `public/`. `next/image` is not used.
- Original home section: background `#050818`, accent `rgb(255, 136, 0)`.
- New sections: background `#020B18`, accent `#F97316`.

## Notable

- No TypeScript — plain JSX with `jsconfig.json` for path aliases.
- `eslint-config-next/core-web-vitals` preset.
- `.env*` files are gitignored.
