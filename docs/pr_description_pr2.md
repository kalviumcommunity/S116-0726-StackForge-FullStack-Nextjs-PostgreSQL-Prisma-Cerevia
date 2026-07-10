## Overview

This Pull Request implements a robust, lightweight, and production-ready containerized development environment for **Cerevia** using Docker and Docker Compose. It packages the Next.js 15 App Router application with PostgreSQL and Redis services, ensuring that any developer can get started with a single command (`docker compose up --build`) in a unified environment.

---

## Scope of Changes

1. **Next.js Dockerization (`Dockerfile` & `.dockerignore`)**
   - Implemented a secure, multi-stage Docker build utilizing `node:20-alpine`.
   - Enabled Next.js **standalone** build target (`output: 'standalone'` in `next.config.ts`) to dramatically reduce image footprint by copying only necessary runtime files.
   - Configured `.dockerignore` to keep build contexts clean of `node_modules`, build artifacts, and secret files.
   - Runs under a non-root system user (`nextjs:nodejs`) for enhanced runtime security.

2. **Docker Compose Configuration (`docker-compose.yml`)**
   - Configured three services: `web` (Next.js), `db` (PostgreSQL), and `redis` (Redis).
   - Configured Docker bridge networking (`cerevia-network`) to allow services to resolve one another using container hostnames (avoiding `localhost` issues).
   - Implemented Docker volumes (`postgres_data`, `redis_data`) to persist database and cache records across container restarts.
   - Mounted local source code to `/app` for the `web` container (using volume exclusion for container-internal `node_modules` and `.next`) to enable automatic **hot-reloading** during development.

3. **Service Healthchecks**
   - Configured an SQL-ready healthcheck for the PostgreSQL service (`pg_isready`).
   - Configured a ping healthcheck for the Redis service (`redis-cli ping`).
   - Managed service dependencies inside `web` to only start once the database and redis containers are completely healthy.

4. **Environment Configuration (`.env.example`)**
   - Updated `.env.example` with clear sections detailing database credentials and network connection configurations for both local and containerized development.

5. **Developer Documentation (`README.md`)**
   - Added clear instructions outlining starting, stopping, rebuilding, and troubleshooting the Dockerized setup.

---

## Verification Completed

- Verified Next.js standalone build targets compile correctly without TypeScript/ESLint warnings or errors.
- Verified Prettier and Prisma format runs successfully with zero warnings/errors.
