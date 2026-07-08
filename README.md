# StackForge - BYJU'S Daily Streaks & Weekly Leaderboard

Welcome to the **StackForge** repository for Squad 116, Team 03! This project focuses on building a scalable, performant Full-Stack solution for managing daily learning streaks and weekly leaderboards.

---

## 📋 Problem Statement

BYJU'S wants to implement a robust gamification system featuring **daily streaks** and **weekly leaderboards** to improve student engagement. 

### Core Requirements:
1. **Daily Streaks**:
   - Completing a lesson must instantly update the student's streak.
   - The streak resets automatically if there are **24 hours of no activity**.

2. **Weekly Leaderboards**:
   - Completing a lesson instantly updates the user's score/leaderboard standing.
   - To reduce database load and optimize performance, the public-facing leaderboard should only refresh/recalculate **every hour**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Full-Stack)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma ORM](https://www.prisma.io/)
- **State & Caching**: [Redis](https://redis.io/) (optional / for hourly leaderboard cache)

---

## 👥 Contributors

Meet the developers behind Team 03:

- **Avadhut Pawar** — [@Avadhut-Pawar31](https://github.com/Avadhut-Pawar31)
- **Areesh Ahmed** — [@areesh-ahmed](https://github.com/areesh-ahmed)
- **Hardik Kaurani** — [@hardikkaurani](https://github.com/hardikkaurani)
