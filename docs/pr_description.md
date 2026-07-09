## Overview
This Pull Request establishes the production-ready engineering foundation and repository initialization for **Cerevia**, a gamified learning platform. It sets up Next.js 15, TypeScript, Tailwind CSS, ESLint, Prettier, and absolute path aliases, creating a highly modular and structured codebase for future development.

## Scope of Changes
1. **Framework Setup**: Initialized Next.js 15 App Router using ES Modules.
2. **TypeScript & Configuration**: Configured path aliases (`@/*`) and customized `tsconfig.json` for compilation reliability.
3. **Styling**: Configured Tailwind CSS v4 using modern `@import "tailwindcss"` syntax and a custom PostCSS integration.
4. **Linter & Formatter**: Setup ESLint 9 (Flat Config) with Next.js/TS compatibility layers and configured Prettier with code style conventions, class sorting plugins, and automated format/lint scripts.
5. **Prisma Integration**: Successfully generated the database client for local type-safety.
6. **Environment Configuration**: Added `.env.example` to document all necessary parameters without leaking secrets.
7. **Directory Layout**: Scaffolded standard workspace folders (`components/`, `components/ui/`, `hooks/`, `types/`, `utils/`, `styles/`, `docs/`) with tracking placeholders.
8. **README**: Authored a professional, comprehensive README containing the vision, tech stack, and onboarding steps.

## Verification
- Verified `npm run build` generates a production bundle with exit code `0`.
- Verified `npm run lint` completes with zero ESLint warnings or errors (`✔ No ESLint warnings or errors`).
- Verified code formatting runs warning-free.
