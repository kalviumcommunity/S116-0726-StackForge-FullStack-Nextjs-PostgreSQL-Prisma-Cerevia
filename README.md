# Cerevia

Cerevia is a modern gamified learning platform built using the latest web technologies. The platform engages and rewards users through daily streaks, lesson progress, XP accumulation, achievements, and weekly competitive leaderboards.

Cerevia is designed with high-performance scaling in mind, decoupling expensive read operations (like leaderboards) from write latencies (like lesson completions) using state-of-the-art caching patterns.

---

## 🎯 Vision

Cerevia's mission is to make learning addictive, rewarding, and highly interactive. By combining modern game design mechanics (streaks, leaderboards, and instant XP feedback) with premium software architecture, Cerevia aims to become a leading gamified educational platform worldwide.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **ORM**: Prisma
- **Database**: PostgreSQL (Prisma Adapter)
- **Linter**: ESLint 9
- **Formatter**: Prettier

---

## 📂 Folder Structure

The repository follows a clean, modular, and scalable project layout inside the `src/` directory to separate concerns:

```text
cerevia/
│
├── prisma/                    # Prisma Database Schema and Migrations
│   └── schema.prisma          # Database schema models
│
├── src/
│   ├── app/                   # Next.js App Router (Layouts, Pages, and Global CSS)
│   │   ├── globals.css        # Global CSS styles
│   │   ├── layout.tsx         # Main entry point layout
│   │   └── page.tsx           # Home / Dashboard landing page
│   │
│   ├── components/            # Reusable UI Components
│   │   └── ui/                # Base design system components (buttons, input, dialogs)
│   │
│   ├── hooks/                 # Custom React Hooks
│   │
│   ├── lib/                   # Third-party configuration and clients (Prisma, Redis)
│   │   └── streak-manager.ts  # Core business logic for streaks and leaderboards
│   │
│   ├── styles/                # Global style sheets, design tokens, and utilities
│   │
│   ├── types/                 # Shared TypeScript interfaces and type definitions
│   │
│   └── utils/                 # General utility and helper functions
│
├── docs/                      # Technical specification, architectural decisions, and diagrams
├── public/                    # Static assets (images, icons, vectors)
│
├── .env.example               # Documentation of required environment configurations
├── eslint.config.js           # ESLint rules and flat config settings
├── next.config.ts             # Next.js compiler and build optimization settings
├── package.json               # Project manifest, scripts, and package dependencies
├── prettier.config.js         # Prettier formatting style guide
└── tsconfig.json              # TypeScript compilation rules
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v20+ recommended)
- **npm** (v10+)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia.git
   cd S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set Up Environment Variables**
   Copy the environment variables template and configure it:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Set your database connections, Redis urls, and authentication secrets in `.env.local`.*

4. **Generate Prisma Client**
   Run the Prisma generator to output client typings:
   ```bash
   npx prisma generate
   ```

---

## 💻 Development Commands

The following scripts are available in `package.json`:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `next dev` | Start the development server on `http://localhost:3000` |
| `npm run build` | `next build` | Build a production-optimized bundle of the app |
| `npm run start` | `next start` | Run the built production application server |
| `npm run lint` | `next lint` | Run ESLint checks to identify formatting and static code issues |
| `npm run format` | `prettier --write` | Run Prettier to automatically format code across the repository |

---

## 🛡️ Engineering Standards

- **Zero-Warning Codebase**: All TypeScript type checks, ESLint linting, and Next.js builds must complete with zero errors or warnings.
- **Modern ES Modules**: Enforces modern ES module syntax (`import`/`export`) globally using `"type": "module"`.
- **Absolute Imports**: Source folders should import elements using `@/*` path aliases (e.g. `@/components`, `@/lib`, `@/hooks`).
- **Dry & Clean**: No commented-out code blocks or placeholders in the production branch.
