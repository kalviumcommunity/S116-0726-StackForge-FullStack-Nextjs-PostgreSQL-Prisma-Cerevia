# Contributing to Cerevia

Welcome to the Cerevia project! We are excited to have you contribute. To maintain a high standard of code quality, readability, and security across the codebase, please follow the guidelines outlined below.

---

## 1. Branch Naming Conventions

When creating a new branch, use a prefix that describes the type of change you are introducing, followed by a slash and a short, hyphenated description:

| Branch Type | Prefix | Example |
|---|---|---|
| **Features** | `feat/` | `feat/weekly-leaderboard` |
| **Bug Fixes** | `fix/` | `fix/jwt-algorithm-spoofing` |
| **Documentation** | `docs/` | `docs/api-specification` |
| **Refactoring** | `refactor/` | `refactor/redis-client-init` |
| **Chores & Tooling** | `chore/` | `chore/eslint-rules-update` |
| **Testing** | `test/` or `feat/` | `feat/testing-qa` |

---

## 2. Commit Message Convention

We follow the **Conventional Commits** specification. This makes it easier to read project history and automates version numbering.

Format:
```
<type>(<optional scope>): <description>
```

### Allowed Types:
- **`feat`**: A new user-facing feature.
- **`fix`**: A bug fix.
- **`docs`**: Documentation-only changes.
- **`style`**: Changes that do not affect the meaning of the code (formatting, white-space, semi-colons, etc.).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`chore`**: Changes to the build process, auxiliary tools, or libraries.

### Examples:
* `feat(auth): implement JWT signature tampering detection`
* `fix(streak): correct daily streak boundary reset calculation`
* `docs(readme): expand security architecture details`
* `test(redis): add integration tests for key-pattern invalidation`

---

## 3. Pull Request Guidelines

Before submitting a Pull Request (PR), verify that you meet the following requirements:

1. **Focus**: Keep PRs small and focused on a single objective or feature. Do not bundle multiple unrelated features into one PR.
2. **Local Validation**: Always execute the validation and QA script suite before pushing:
   ```bash
   # Run all integration tests
   npm run test

   # Run ESLint linter
   npm run lint

   # Run TypeScript compiler checks
   npx tsc --noEmit
   ```
   **All checks must pass with zero errors and zero warnings before raising a PR.**
3. **No Unrelated Changes**: Do not touch business logic or database structures that are outside the scope of your assigned task.
4. **Documentation**: If your change modifies or introduces APIs or database fields, ensure you update the Swagger JSON specification and `README.md` accordingly.

---

## 4. Coding Standards & Best Practices

To maintain consistency and security across the codebase, adhere to the following rules:

### API Routes & Error Handling
* **API Handler Wrapper**: All Next.js route handlers must be wrapped in `withApiHandler` (from `src/lib/api-response.ts`). This automatically applies Helmet headers, CORS origins, input HTML sanitization, rate limiting, and global error handling.
* **Standard Responses**:
  * For success, use `successResponse(message, data, statusCode)`.
  * For errors, throw the corresponding custom exception from `src/lib/errors.ts` (e.g. `ValidationError`, `NotFoundError`, `ConflictError`, etc.). Let `withApiHandler` automatically format the response.
* **Zod Validation**: Always parse dynamic parameters, query strings, and request bodies using Zod schemas located in `src/lib/validation/` to handle invalid schemas before they enter service methods.

### Database & Caching
* **Prisma Client**: Always import the singleton instance of Prisma Client via `src/lib/prisma.ts`. Do not initialize new client instances.
* **Redis Caching**:
  * Use the helper methods `getCache`, `setCache`, `deleteCache`, and `deleteCachePattern` from `src/lib/redis.ts`.
  * Implement fail-safes so that if Redis is offline, the application gracefully queries PostgreSQL without crashing.

### Code Style & Formatting
* We use **Prettier** for formatting. Do not manually format code in ways that contradict the `.prettierrc` configuration.
* Run `npm run format` to clean up formatting issues before committing.
* Do not use `any` type casting in TypeScript. Properly type all parameters and variables.

---

## 5. Review & Approval Process

All contributions go through a code review process:
1. **Automated Validation**: Code pushes trigger automated continuous integration (CI) tests, lint, and type compile runs.
2. **Peer Review**: At least one peer review approval is required before merging.
3. **Verification**: The reviewer will check that the PR aligns with the acceptance criteria and displays **ZERO RED CROSSES ❌** or compile warnings.
