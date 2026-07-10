## Overview

This Pull Request implements the complete, production-grade **Authentication & Authorization System** for **Cerevia** using **JWT (JSON Web Tokens)**, **bcrypt** password hashing, and **Zod** schema validation. It sets up the backend endpoint infrastructure and reusable authorization helper middleware for future protected routes.

---

## Scope of Changes

1. **Authentication Core Utilities**
   - **`src/lib/jwt.ts`**: Reusable JWT utilities implementing access token signature verification with customizable expiration (`7d`) and proper token expiration/validation error mapping.
   - **`src/lib/prisma.ts`**: A singleton Prisma Client instance to avoid memory and connection leaks in hot-reloading Next.js dev server modes.

2. **Input Validation (`src/lib/validation/auth.ts`)**
   - **`registerSchema`**: Enforces required fields, email formatting, minimum password length (6 characters), and URL verification for avatar images.
   - **`loginSchema`**: Standard validation for login credentials.

3. **API Route Handlers**
   - **`POST /api/auth/register`**: Validates payloads, handles duplicate email queries, hashes the password via `bcryptjs` with 10 salt rounds, and writes user records without returning credentials.
   - **`POST /api/auth/login`**: Resolves users, checks passwords, generates JWT access tokens, and responds with the token and user metadata.
   - **`GET /api/auth/me`**: A protected test endpoint returning the current user profile.

4. **Reusable Middleware Helper (`src/lib/middleware/auth.ts`)**
   - Resolves Bearer tokens from request headers.
   - Verifies expiration and signature validity.
   - Re-checks the database to ensure the associated account still exists.

5. **Configuration Documentation**
   - **`.env.example`**: Added `JWT_SECRET` variables with documentation.
   - **`README.md`**: Appended a detailed section documenting the endpoints, security standards, and sequence diagram of the authorization flow.

---

## Authentication Architecture

The layout maintains strict separation of concerns for high security and readability:
*   **Validation**: Handled globally by `Zod` schemas before hitting databases or controllers.
*   **Security/Hashing**: Decoupled using pure-JS `bcryptjs` to avoid compiler toolchain issues on varied development operating systems.
*   **Decoupled Middleware**: Rather than monolithic global nextjs edge middleware (which lacks direct node/prisma access on Edge runtimes without special adapters), we use a helper middleware pattern `authenticateRequest(request)` that is invoked programmatically within Node.js API routes.

---

## Security Verification

- Executed `npm run lint` and `npm run format` successfully with zero static analysis warnings.
- Executed `npm run build` with `exit code 0` to confirm Next.js type safety and route compilation.
