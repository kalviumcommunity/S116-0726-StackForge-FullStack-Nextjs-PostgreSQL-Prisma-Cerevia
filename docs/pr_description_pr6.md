## Overview

This Pull Request implements the complete **Lessons Module & Content Management** API for **Cerevia**. It enables authenticated users to retrieve a paginated, filterable, and sorted list of available lessons, and retrieve details of specific lessons by their unique IDs. 

---

## Scope of Changes

1. **Input Validation (`src/lib/validation/lessons.ts`)**
   - **`lessonQuerySchema`**: Validates request queries for listing lessons (search filter, page/limit parameters, sorting fields, and directions).
   - **`lessonIdSchema`**: Validates that request route params match the UUID standard.

2. **Database Service Layer (`src/lib/services/lessons.ts`)**
   - **`getLessons(filters)`**: Performs optimized paginated database queries matching title search (case-insensitive), difficulty parameters, and ordering directions. Returns pagination metadata alongside matching records.
   - **`getLessonById(id)`**: Retrieves a single lesson by ID; throws an error if it doesn't exist.

3. **API Route Handlers**
   - **`GET /api/lessons`**: Validates queries via Zod, authenticates sessions, and resolves listing data.
   - **`GET /api/lessons/[id]`**: Secure dynamic endpoint retrieving specific lesson info (supports async dynamic `params` in Next.js 15).

4. **Integration Testing (`tests/lessons.test.ts`)**
   - Self-contained test suite ensuring correct search behavior, case insensitivity, pagination limit/offset, sorting orders, and schema rejection values.

5. **API Documentation**
   - Added **📖 Lessons Module** specifications to the `README.md`.

---

## API Endpoints

*   **`GET /api/lessons`**: Lists lessons.
    *   **Authorization**: Bearer Token
    *   **Filters**:
        - `page` (default `1`)
        - `limit` (default `10`, max `100`)
        - `search` (case-insensitive string query)
        - `difficulty` (`Beginner`, `Intermediate`, `Advanced`)
        - `sortBy` (`createdAt`, `difficulty`, `title`)
        - `sortOrder` (`asc`, `desc`)
*   **`GET /api/lessons/[id]`**: Retrieves details of a specific lesson by UUID.
    *   **Authorization**: Bearer Token
    *   **Response (404 Not Found)**: If the lesson does not exist.

---

## Code Quality & Verification
- Ran linter checking: `npm run lint` completed with 0 errors/warnings.
- Ran formatter: `npm run format` completed with 0 issues.
- Next.js production compilation: `npm run build` completed with `exit code 0`.
