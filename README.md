# Cerevia (Daily Streak & Weekly Leaderboard)

## 📌 Project Overview
Cerevia is a gamified learning engagement platform inspired by modern EdTech applications. It encourages students to build consistent learning habits through daily streaks and weekly leaderboards.

Whenever a student completes a lesson, their daily streak is updated instantly to provide immediate feedback and motivation. To ensure scalability and reduce server load, leaderboard rankings are refreshed once every hour instead of after every lesson completion. If a student remains inactive for more than 24 hours, their current streak is reset automatically.

The application focuses on improving learner engagement, promoting healthy competition, and providing a seamless learning experience using modern full-stack technologies.

---

## 📄 Project Documentation

- [Product Requirements Document (PRD)](docs/PRD.md)
- [System Design & Architecture](docs/SYSTEM_DESIGN.md)
- [Database Design](docs/DATABASE.md)
- [API Documentation](docs/API.md)
- [UI/UX Wireframes](docs/WIREFRAMES.md)

---

## 👥 Team & Contribution Lanes

### **Areesh Ahmed**
**Frontend & UI/UX Lead**

Responsible for:
- Authentication UI
- Dashboard
- Lesson Module
- Leaderboard Interface
- Responsive Design
- API Integration
- State Management

---

### **Hardik Kaurani**
**Backend & Business Logic Lead**

Responsible for:
- Authentication APIs
- Lesson APIs
- Streak Management Engine
- Leaderboard Generation Logic
- Scheduler Implementation
- API Validation
- Error Handling

---

### **Avadhut Pawar**
**Database & Infrastructure Lead**

Responsible for:
- PostgreSQL Database Design
- Prisma ORM Models
- Database Migrations
- Query Optimization
- User Progress Storage
- Leaderboard Data Management
- Deployment & Environment Configuration

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js
- React
- Tailwind CSS
- TypeScript

### **Backend**
- Next.js API Routes
- Node.js

### **Database**
- PostgreSQL

### **ORM**
- Prisma

### **Authentication**
- JWT
- bcrypt

### **Deployment**
- Vercel
- Railway (Database)

### **Version Control**
- Git & GitHub

---

## 🎯 Core Features

- User Registration & Login
- Daily Learning Streaks
- Automatic Streak Reset after 24 Hours
- Lesson Completion Tracking
- Weekly Leaderboard
- Hourly Leaderboard Refresh
- Student Dashboard
- User Profile & Statistics

---

## 🚀 Project Goal

To build a scalable, production-ready learning engagement platform that motivates students through gamification while ensuring efficient backend performance using scheduled leaderboard updates.