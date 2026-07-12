<div align="center">

<br/><br/>

<h1>Cerevia</h1>

<p><strong>A scalable, production-grade gamification system for BYJU'S — powering daily learning streaks and weekly competitive leaderboards at scale.</strong></p>

<br/>

<img src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
<img src="https://img.shields.io/badge/Redis-Cache%20%26%20Queue-DC382D?logo=redis&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-Typed-3178C6?logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Squad-116%20%7C%20Team%2003-6366F1" />
<img src="https://img.shields.io/badge/License-MIT-blue.svg" />

<br/><br/>

</div>

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Design](#solution-design)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Design Decisions](#key-design-decisions)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [API Reference](#api-reference)
- [Contributors](#contributors)

---

## Problem Statement

BYJU'S needs a robust gamification layer to improve student engagement and retention across its learning platform. Two core features must be implemented:

**Daily Streaks**

A streak represents the number of consecutive days a student has completed at least one lesson. It must increment instantly when a lesson is completed, and reset automatically if more than 24 hours pass without any activity. The system must handle concurrent lesson completions without double-counting and must be accurate under high load.

**Weekly Leaderboard**

Every lesson completion updates the student's weekly score in real time. However, computing and serving a fully ranked leaderboard on every request is expensive at BYJU'S scale. The public-facing leaderboard must therefore be cached and recalculated on a fixed hourly schedule — trading slight staleness for significantly reduced database load.

---

## Solution Design

The core insight driving the architecture is the separation of **write latency** from **read latency**:

- **Writes** (lesson completions) must be instant — streak updates and score increments happen synchronously on the lesson completion event, with no perceptible delay for the student.
- **Reads** (leaderboard display) can tolerate a one-hour cache window — Redis holds the pre-computed leaderboard snapshot and a scheduled job refreshes it hourly from PostgreSQL.

This decoupling means the leaderboard page never touches the database directly, and the database is never under read pressure from leaderboard queries.

---

## System Architecture

```mermaid
flowchart TD
    USER([Student on BYJU'S Platform]) --> LESSON[Complete a Lesson]

    LESSON --> API[POST /api/lesson/complete\nNext.js API Route]

    API --> AUTH[Verify session\nNextAuth.js]
    AUTH --> STREAK_SVC[Streak Service]
    AUTH --> SCORE_SVC[Score Service]

    subgraph Streak Logic
        STREAK_SVC --> LAST_CHECK{Last activity\nwithin 24 hours?}
        LAST_CHECK -->|Yes| INCREMENT[Increment streak by 1\nUpdate last_activity_at]
        LAST_CHECK -->|No| RESET[Reset streak to 1\nUpdate last_activity_at]
        INCREMENT --> PG_STREAK[(Write to PostgreSQL\nuser_streaks table)]
        RESET --> PG_STREAK
    end

    subgraph Score and Leaderboard Logic
        SCORE_SVC --> PG_SCORE[(Increment score\nPostgreSQL weekly_scores)]
        PG_SCORE --> INVALIDATE[Invalidate Redis\nleaderboard cache key]
    end

    subgraph Leaderboard Cache
        CRON[Hourly Cron Job\nvercel-cron or node-cron] -->|Every 60 minutes| PG_READ[(SELECT top N\nfrom weekly_scores)]
        PG_READ --> REDIS_WRITE[(Write ranked snapshot\nto Redis)]
    end

    LEADERBOARD_PAGE[GET /api/leaderboard\nNext.js API Route] --> REDIS_READ[(Read from Redis\ncache)]
    REDIS_READ -->|Cache miss| PG_READ
    REDIS_READ --> RESPONSE([Return ranked leaderboard\nto client])
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack — API routes and React frontend in one repo |
| Language | TypeScript | Type-safe code across frontend and backend |
| Database | PostgreSQL | Persistent storage for streaks, scores, users |
| ORM | Prisma | Type-safe database queries, migrations, schema management |
| Cache | Redis | Hourly leaderboard snapshot, cache-aside pattern |
| Auth | NextAuth.js | Session management, provider-based login |
| Styling | Tailwind CSS | Utility-first UI components |

---

## Project Structure

```
cerevia/
|
+-- prisma/
|   +-- schema.prisma            # User, Streak, WeeklyScore models
|   +-- migrations/              # Prisma migration history
|
+-- src/
|   +-- app/
|   |   +-- api/
|   |   |   +-- lesson/
|   |   |   |   +-- complete/
|   |   |   |       +-- route.ts # POST /api/lesson/complete
|   |   |   +-- leaderboard/
|   |   |   |   +-- route.ts     # GET /api/leaderboard
|   |   |   +-- streak/
|   |   |       +-- route.ts     # GET /api/streak (current user)
|   |   +-- dashboard/
|   |   |   +-- page.tsx         # Student dashboard with streak display
|   |   +-- leaderboard/
|   |       +-- page.tsx         # Weekly leaderboard page
|   |
|   +-- lib/
|   |   +-- prisma.ts            # Prisma client singleton
|   |   +-- redis.ts             # Redis client singleton
|   |   +-- streak.ts            # Streak increment and reset logic
|   |   +-- leaderboard.ts       # Cache read, write, and refresh logic
|   |
|   +-- components/
|       +-- StreakBadge.tsx       # Streak flame display component
|       +-- LeaderboardTable.tsx  # Ranked leaderboard table
|
+-- .env.example
+-- next.config.ts
+-- package.json
+-- README.md
```

---

## Key Design Decisions

**Why Redis for the leaderboard and not PostgreSQL directly?**
At BYJU'S scale, thousands of students may view the leaderboard simultaneously. Running a `SELECT ... ORDER BY score DESC` on PostgreSQL for every request would create read pressure that spikes exactly when the platform is most active. Redis serves the pre-computed snapshot in under 1ms regardless of concurrent readers.

**Why invalidate Redis on score update rather than waiting for the cron?**
When a student completes a lesson, the cache is invalidated so the next leaderboard request triggers a fresh read from PostgreSQL. This prevents a student from completing a lesson and seeing a stale leaderboard for up to an hour. The cron job is a safety net that ensures the cache is always refreshed even when no lessons are being completed.

**Why streak logic runs synchronously on lesson completion?**
Streak accuracy is a trust signal for the student. Deferring it to a background job risks the streak showing as unchanged immediately after a lesson, breaking the instant feedback loop that makes gamification effective.

**How does the 24-hour reset work without a cron job?**
Rather than a scheduled task that scans all users, the streak is evaluated lazily on each lesson completion. The service reads `last_activity_at` from the database and compares it to `now()`. If the gap exceeds 24 hours, the streak resets to 1. This scales to millions of users with zero background processing cost.

---

## Redis Caching Architecture

### Reusable Caching Layer
The application implements a generic, fault-tolerant Redis caching layer located at `src/lib/redis.ts`. It provides reusable helper functions (`getCache`, `setCache`, `deleteCache`, `deleteCachePattern`) that catch and log any Redis errors silently, allowing the application to fall back to PostgreSQL database queries gracefully without crashing.

### Cache Keys Schema
Cache keys are designed to be deterministic and parameter-specific:
- **Weekly Leaderboard**: `leaderboard:weekly:<year>:<week>:limit_<limit>:skip_<skip>` (e.g. `leaderboard:weekly:2026:28:limit_10:skip_0`).
This granular schema ensures pagination and specific week lookups are cached independently and served correctly.

### Expiration & TTL Strategy
- Leaderboard cache entries use a configurable Time-To-Live (TTL) defined by the `LEADERBOARD_CACHE_TTL` environment variable (defaults to `3600` seconds / 1 hour).
- A relatively short TTL ensures that even if cache invalidation fails, the system automatically syncs with the database within 1 hour.

### Invalidation Flow
- When a user completes a lesson and awards XP, the leaderboard data changes.
- To ensure cache consistency, the system calls `deleteCachePattern('leaderboard:weekly:*')` immediately after a successful lesson completion. This removes all weekly leaderboard cache keys (for all weeks and page offsets) from Redis, forcing the next leaderboard query to fetch fresh, up-to-date data from PostgreSQL.

---

## Background Task & Cron Architecture

### Scheduler Lifecycle
The application integrates an automatic, in-process background scheduling engine using `node-cron` initialized through Next.js official `src/instrumentation.ts` register hook on server startup. The scheduler is decoupled from the business logic, exposing safe lifecycles for starting and stopping background tasks.

### Automated Background Tasks
1. **Hourly Leaderboard Cache Pre-Calculation**:
   - Runs automatically on the configured schedule (environment variable `LEADERBOARD_REFRESH_CRON`, defaulting to every hour: `0 * * * *`).
   - Dynamically calculates the current week's leaderboard rankings for the most common page sizes (10, 50, and 100 entries) and updates the Redis cache directly.
2. **Daily Streak Reset Verification**:
   - Runs automatically on the configured schedule (environment variable `STREAK_VERIFICATION_CRON`, defaulting to daily at midnight: `0 0 * * *`).
   - Scans the PostgreSQL database for users whose last activity timestamp is older than yesterday in UTC (day difference > 1). For all matching inactive users, their `currentStreak` is set back to `0`.

### Logging & Fault Tolerance
- **Detailed Execution Tracing**: Every background task logs its lifecycle events (`Started`, `Completed`, `Failed`) with precise timestamps.
- **Graceful Failures**: If a job fails due to an external network glitch (e.g. database/Redis connection loss), the error is caught, logged, and execution stops without throwing an uncaught exception, keeping the primary Next.js web application completely online and functional.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/kalviumcommunity/S116-0726-Cerevia-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia.git
cd S116-0726-Cerevia-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in DATABASE_URL, REDIS_URL, NEXTAUTH_SECRET

# Apply database migrations
npx prisma migrate dev

# Seed development data (optional)
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Configuration

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cerevia

# Redis
REDIS_URL=redis://localhost:6379

# NextAuth
NEXTAUTH_SECRET=your-minimum-32-character-secret
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/lessons/[id]/complete` | Yes | Record lesson completion, update streak, award XP |
| `GET` | `/api/lessons/progress` | Yes | Get lesson completions and remaining lessons |
| `GET` | `/api/streak` | Yes | Get current authenticated user's daily streak |
| `GET` | `/api/user/xp` | Yes | Get current XP, level progression data, and XP history |
| `GET` | `/api/user/leaderboard` | Yes | Fetch weekly leaderboard ranks sorted by weekly XP |
| `GET` | `/api/user/leaderboard/rank` | Yes | Get current user's rank status and weekly XP |

**GET `/api/user/xp` — Response:**

```json
{
  "currentXP": 110,
  "totalXP": 110,
  "levelInfo": {
    "level": 2,
    "xpInCurrentLevel": 10,
    "xpRemaining": 172,
    "xpNeededForNextLevel": 182,
    "progressPercentage": 5
  },
  "history": [
    {
      "id": "uuid-string",
      "xpEarned": 25,
      "reason": "LESSON_COMPLETION",
      "timestamp": "2026-07-11T12:00:00.000Z",
      "lesson": {
        "id": "lesson-uuid-string",
        "title": "Introduction to Python",
        "difficulty": "Beginner"
      }
    }
  ],
  "pagination": {
    "limit": 50,
    "skip": 0,
    "totalCount": 1
  }
}
```

**GET `/api/user/leaderboard` — Response:**

```json
{
  "leaderboard": [
    {
      "userId": "user-uuid-1",
      "fullName": "User Alpha",
      "avatar": null,
      "weeklyXP": 100,
      "rank": 1
    },
    {
      "userId": "user-uuid-2",
      "fullName": "User Beta",
      "avatar": null,
      "weeklyXP": 60,
      "rank": 2
    }
  ],
  "pagination": {
    "limit": 10,
    "skip": 0,
    "totalCount": 2
  },
  "metadata": {
    "week": 28,
    "year": 2026,
    "startDate": "2026-07-06T00:00:00.000Z",
    "endDate": "2026-07-13T00:00:00.000Z"
  }
}
```

---

## Contributors

Squad 116 · Team 03

| Name | GitHub |
|---|---|
| Avadhut Pawar | [@Avadhut-Pawar31](https://github.com/Avadhut-Pawar31) |
| Areesh Ahmed | [@areesh-ahmed](https://github.com/areesh-ahmed) |
| Hardik Kaurani | [@hardikkaurani](https://github.com/hardikkaurani) |

---

<div align="center">

*Cerevia — Squad 116, Team 03*

</div>
