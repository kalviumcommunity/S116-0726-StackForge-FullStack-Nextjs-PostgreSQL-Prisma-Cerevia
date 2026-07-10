# Bug Fix Summary

## 🐛 Issue Fixed

**Error**: "Event handlers cannot be passed to Client Component props"

```
Runtime Error
Event handlers cannot be passed to Client Component props.
<button onClick={function handleGetStarted} className=...>
If you need interactivity, consider converting part of this to a Client Component.
```

---

## 🔧 Root Cause

In Next.js 15 App Router, **components are Server Components by default**. Server Components:
- Run only on the server
- Cannot use browser APIs (like `window`, `document`)
- Cannot use React hooks (like `useState`, `useEffect`)
- Cannot have event handlers (like `onClick`, `onChange`)

The error occurred because:
1. `Hero.jsx` used `onClick` handlers
2. `Button.jsx` accepted `onClick` props
3. Both were Server Components (no `'use client'` directive)

---

## ✅ Solution Applied

Added `'use client'` directive to components that need client-side interactivity:

### 1. **Hero.jsx** ✅ Fixed
```jsx
'use client';  // Added this line

import Button from './Button';

export default function Hero() {
  // Now can use onClick handlers
  const handleGetStarted = () => {
    window.location.href = '/dashboard';
  };
  // ...
}
```

### 2. **Button.jsx** ✅ Fixed
```jsx
'use client';  // Added this line

export default function Button({ children, variant, onClick }) {
  // Now can accept onClick props
  return <button onClick={onClick}>...</button>;
}
```

### 3. **Footer.jsx** ✅ Fixed (preventive)
```jsx
'use client';  // Added this line

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Browser API
  // ...
}
```

---

## 📋 Components Status

| Component      | Type             | Reason                          |
|----------------|------------------|---------------------------------|
| ✅ Navbar      | Client Component | Uses useState, onClick          |
| ✅ Hero        | Client Component | Uses onClick, window API        |
| ✅ Button      | Client Component | Accepts onClick props           |
| ✅ Footer      | Client Component | Uses Date() browser API         |
| ⚪ Features    | Server Component | No interactivity needed         |
| ⚪ Dashboard   | Server Component | No hooks/handlers               |
| ⚪ Leaderboard | Server Component | Pure display logic              |
| ⚪ Streak      | Server Component | Pure display logic              |

---

## 🎯 When to Use 'use client'

### ✅ Use 'use client' when component:
- Uses React hooks (`useState`, `useEffect`, etc.)
- Has event handlers (`onClick`, `onChange`, etc.)
- Uses browser APIs (`window`, `document`, `localStorage`)
- Needs interactivity (forms, buttons, dropdowns)

### ⚪ Keep as Server Component when:
- Pure display/presentation logic
- No user interaction needed
- Better performance (less JavaScript sent to browser)
- Can fetch data directly on server

---

## 🚀 How to Test

1. Save all files
2. The dev server should auto-reload
3. Visit http://localhost:3000
4. Click "Get Started Free" button → should navigate to /dashboard
5. Click "Learn More" button → should scroll to features
6. No errors in browser console

---

## 📚 For Viva Explanation

**Professor asks: "What was this error?"**

> "In Next.js 15 App Router, components are Server Components by default. Server Components can't use browser APIs or event handlers because they run on the server. 
>
> Our Hero and Button components needed interactivity with onClick handlers, so we added the 'use client' directive to make them Client Components. This tells Next.js to send these components to the browser where they can handle user interactions."

**Follow-up: "Why not make everything a Client Component?"**

> "Server Components are more performant - they send less JavaScript to the browser and can fetch data directly. We only use Client Components when we need interactivity, following Next.js best practices."

---

## 🎓 Key Learnings

1. **Next.js App Router default**: Server Components
2. **'use client'**: Opt into Client Component
3. **Rule**: If it has useState, useEffect, or onClick → needs 'use client'
4. **Best practice**: Use Client Components only when needed

---

## ✅ All Fixed!

The application should now run without errors. All interactive components are properly marked as Client Components.

```bash
cd FRONTEND
npm run dev
# Visit http://localhost:3000
# Everything should work! ✨
```

---

Date Fixed: July 10, 2026
