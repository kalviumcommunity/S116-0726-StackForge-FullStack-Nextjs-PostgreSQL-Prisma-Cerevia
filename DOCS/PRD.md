# Product Requirements Document (PRD)

# Cerevia

### *Learn Daily. Grow Consistently.*

---

# Project Information

| Field        | Details                                                         |
| ------------ | --------------------------------------------------------------- |
| Project Name | Cerevia                                                         |
| Sprint       | Sprint 1                                                        |
| Team         | StackForge                                                      |
| Repository   | S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia |
| Tech Stack   | Full Stack • Next.js • PostgreSQL • Prisma                      |
| Version      | 1.0                                                             |

---

# 1. Problem Statement

Many online learning platforms experience a decline in learner engagement after the initial days of course enrollment. Students often lose motivation due to the absence of visible progress and rewarding feedback.

To improve learning consistency, BYJU'S requires a gamification system where:

* Completing a lesson instantly updates the learner's daily streak.
* Weekly leaderboards motivate students through healthy competition.
* Leaderboards refresh every hour instead of after every lesson completion to reduce server load.
* A learner's streak resets after 24 hours of inactivity.

The proposed solution should improve learner retention while maintaining system scalability and performance.

---

# 2. Objectives

The objectives of Cerevia are:

* Encourage students to develop consistent daily learning habits.
* Increase learner engagement using gamification techniques.
* Motivate users through weekly rankings.
* Reduce backend processing by refreshing leaderboards every hour.
* Build a scalable and maintainable learning engagement platform.

---

# 3. Target Users

## Primary Users

* School Students
* College Students
* Competitive Exam Aspirants

### Goals

* Learn consistently
* Maintain daily streaks
* Improve weekly ranking

---

## Secondary Users

* Teachers
* Parents
* Learning Administrators

### Goals

* Monitor learner progress
* Track engagement
* View learning statistics

---

# 4. Features

## Authentication

* User Registration
* Secure Login
* Logout

---

## Dashboard

* Current Streak
* Longest Streak
* Lessons Completed
* Weekly Rank

---

## Lesson Module

* View Lessons
* Complete Lesson
* Learning Progress

---

## Daily Streak

* Instant streak update
* Longest streak tracking
* Automatic reset after inactivity

---

## Weekly Leaderboard

* Weekly ranking
* Top learners
* Hourly refresh

---

## User Profile

* Personal Information
* Learning Statistics
* Achievement Summary

---

# 5. User Stories

### Authentication

**As a student,**
I want to register an account,
so that I can access my learning dashboard.

---

**As a student,**
I want to login securely,
so that my learning progress is saved.

---

### Lessons

**As a student,**
I want to view available lessons,
so that I can continue learning.

---

**As a student,**
I want to complete lessons,
so that my streak updates immediately.

---

### Daily Streak

**As a student,**
I want my daily streak to increase whenever I learn on consecutive days,
so that I remain motivated.

---

**As a student,**
I want my streak to reset after 24 hours of inactivity,
so that the streak accurately represents my learning consistency.

---

### Leaderboard

**As a student,**
I want to compare my progress with other learners,
so that I stay motivated.

---

**As an administrator,**
I want the leaderboard to refresh every hour,
so that server resources are optimized.

---

# 6. Project Scope

## In Scope

The first version of Cerevia will include:

* User Authentication
* Lesson Completion
* Daily Streak Tracking
* Weekly Leaderboard
* Dashboard
* User Profile
* Hourly Leaderboard Scheduler
* PostgreSQL Database
* REST APIs
* Responsive Web Interface

---

## Out of Scope

The following features are not included in Sprint 1:

* Live Classes
* Video Streaming
* Course Creation
* AI Tutor
* Payment Gateway
* Chat System
* Push Notifications
* Mobile Application

---

# 7. Success Criteria

The project will be considered successful if:

* Users can successfully register and login.
* Lesson completion updates the streak immediately.
* Streak resets correctly after 24 hours of inactivity.
* Leaderboard refreshes every hour.
* Dashboard displays accurate learning statistics.
* Application provides a responsive user experience.

---

# 8. Assumptions

* Every learner has internet access.
* Every lesson carries equal weight.
* One lesson can only be completed once.
* Server time is used for streak calculation.
* Users complete lessons individually.

---

# 9. Constraints

* Limited development time (Sprint 1).
* Leaderboard refresh interval is fixed at one hour.
* PostgreSQL is used as the primary database.
* Prisma ORM manages database interactions.
* Next.js is used for both frontend and backend.

---

# 10. Future Enhancements

Future versions of Cerevia may include:

* Achievement Badges
* XP Points
* Daily Challenges
* Monthly Leaderboards
* Friends Leaderboards
* AI Learning Recommendations
* Push Notifications
* Mobile Application

---

# Conclusion

Cerevia aims to transform online learning into an engaging and habit-forming experience through gamification. By combining daily streaks, hourly leaderboard updates, and a user-friendly dashboard, the platform encourages continuous learning while maintaining backend efficiency and scalability.
