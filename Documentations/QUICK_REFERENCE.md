# Quick Reference Guide

## 🚀 Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📁 File Locations Cheat Sheet

| Need to...                | Go to...                        |
|---------------------------|----------------------------------|
| Add a new page            | `app/new-page/page.jsx`         |
| Create a component        | `components/ComponentName.jsx`   |
| Add helper function       | `lib/utils.js`                  |
| Change global styles      | `app/globals.css`               |
| Update Tailwind config    | `tailwind.config.js`            |
| Modify metadata           | `app/layout.jsx`                |
| Add images                | `public/images/`                |

---

## 🎨 Common Tailwind Classes

### Layout
```
flex              → Flexbox container
grid              → Grid container
flex-col          → Flex column (vertical)
gap-4             → Gap between items (16px)
justify-between   → Space between items
items-center      → Center items vertically
```

### Spacing
```
p-4               → Padding all sides (16px)
px-6              → Padding horizontal (24px)
py-3              → Padding vertical (12px)
m-4               → Margin all sides (16px)
mb-6              → Margin bottom (24px)
```

### Colors
```
bg-blue-600       → Blue background
text-white        → White text
text-gray-700     → Gray text
border-blue-200   → Blue border
```

### Typography
```
text-xl           → Large text
text-2xl          → Extra large text
font-bold         → Bold font
font-medium       → Medium weight font
```

### Responsive
```
md:grid-cols-2    → 2 columns on tablet+
lg:grid-cols-3    → 3 columns on desktop+
md:hidden         → Hide on tablet+
sm:flex-row       → Flex row on mobile+
```

---

## 🧩 Component Props Quick Ref

### Button
```jsx
<Button 
  variant="primary"    // primary | secondary | outline
  onClick={handleClick}
>
  Click Me
</Button>
```

### Dashboard
```jsx
<Dashboard 
  user={{
    name: "Alex",
    points: 2450,
    currentStreak: 12,
    // ...
  }}
/>
```

### Leaderboard
```jsx
<Leaderboard 
  users={[
    { id: 1, name: "Priya", points: 5240, level: 12 },
    // ...
  ]}
/>
```

### Streak
```jsx
<Streak 
  currentStreak={12}
  longestStreak={15}
/>
```

---

## 🎯 Component Responsibilities

| Component    | What It Does                           |
|--------------|----------------------------------------|
| Navbar       | Site navigation and mobile menu        |
| Hero         | Landing page hero section              |
| Features     | Feature showcase grid                  |
| Footer       | Site footer with links                 |
| Button       | Reusable button with variants          |
| Dashboard    | User stats and recent activity         |
| Leaderboard  | User rankings display                  |
| Streak       | Streak tracker with motivational text  |

---

## 🔗 Routing Quick Ref

```jsx
// Navigate using Link
import Link from 'next/link';
<Link href="/dashboard">Dashboard</Link>

// Navigate programmatically
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/dashboard');

// Scroll to element
const element = document.getElementById('features');
element.scrollIntoView({ behavior: 'smooth' });
```

---

## ⚡ React Hooks Used

### useState
```jsx
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

// Update state
setIsOpen(true);
```

### useRouter (from Next.js)
```jsx
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/path');
```

---

## 🎨 Custom CSS Classes

```css
.gradient-text     /* Blue to cyan gradient text */
.gradient-bg       /* Blue to cyan gradient background */
.glass-effect      /* Glassmorphism with backdrop blur */
```

Usage:
```jsx
<h1 className="gradient-text">Cerevia</h1>
<div className="gradient-bg">...</div>
<div className="glass-effect">...</div>
```

---

## 📊 Sample Data Structures

### User
```javascript
{
  name: string,
  email: string,
  points: number,
  level: number,
  rank: number,
  currentStreak: number,
  longestStreak: number,
  lessonsCompleted: number
}
```

### Lesson
```javascript
{
  id: number,
  title: string,
  description: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  duration: string,
  progress: number,
  icon: string
}
```

---

## 🐛 Common Errors & Fixes

### Error: Cannot find module 'next'
```bash
npm install
```

### Error: Port 3000 in use
```bash
npm run dev -- -p 3001
```

### Error: Tailwind styles not applying
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### Warning: Each child should have a key
```jsx
// Add key prop when mapping
{items.map((item) => (
  <div key={item.id}>...</div>
))}
```

---

## 🎓 Viva Quick Answers

### Q: Why Next.js?
**A:** File-based routing, SSR for performance, built-in optimization

### Q: Why Tailwind?
**A:** Utility-first, fast development, no naming conflicts

### Q: Why separate components?
**A:** Single responsibility, reusability, easier maintenance

### Q: Flexbox vs Grid?
**A:** Flexbox for 1D (rows/columns), Grid for 2D (rows AND columns)

### Q: Where's the data?
**A:** Sample data now, will integrate with backend API later

---

## 📐 Responsive Breakpoints

```
sm:   640px   (Mobile landscape)
md:   768px   (Tablet)
lg:   1024px  (Desktop)
xl:   1280px  (Large desktop)
2xl:  1536px  (Extra large)
```

Usage:
```jsx
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

---

## 🎯 Color Palette

```javascript
Primary Blue:    #3B82F6  (rgb(59, 130, 246))
Secondary Cyan:  #06B6D4  (rgb(6, 182, 212))
Text Dark:       #1F2937  (rgb(31, 41, 55))
Text Light:      #6B7280  (rgb(107, 114, 128))
Background:      #FFFFFF  (white)
Card BG:         #F9FAFB  (light gray)
```

---

## ⌨️ Keyboard Shortcuts (VS Code)

```
Ctrl+P          → Quick open file
Ctrl+Shift+F    → Search across files
Ctrl+/          → Toggle comment
Alt+↑/↓         → Move line up/down
Ctrl+D          → Select next occurrence
F12             → Go to definition
```

---

## 🔄 Git Workflow (If Using)

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Add feature X"

# Push
git push origin main
```

---

## 📝 Quick Testing Checklist

- [ ] All pages load at http://localhost:3000
- [ ] Navigation links work
- [ ] No console errors (F12)
- [ ] Responsive on mobile (resize browser)
- [ ] Buttons have hover effects
- [ ] Data displays correctly

---

## 🎯 File Naming Conventions

```
Components:     PascalCase.jsx   (Navbar.jsx)
Pages:          page.jsx         (always)
Utils:          camelCase.js     (utils.js)
CSS:            kebab-case.css   (globals.css)
Config:         kebab-case.js    (next.config.js)
```

---

## 🚀 Deployment Checklist

```bash
# 1. Build the project
npm run build

# 2. Test production build locally
npm start

# 3. Check for errors
# 4. Deploy to Vercel/Netlify
```

---

## 📞 Emergency Troubleshooting

### Nothing works?
1. Delete `node_modules` folder
2. Run `npm install`
3. Run `npm run dev`

### Still not working?
1. Check Node.js version: `node --version` (should be 18+)
2. Clear npm cache: `npm cache clean --force`
3. Check console for errors (F12 in browser)

---

## 🎉 Success Indicators

✅ `npm run dev` starts without errors
✅ http://localhost:3000 loads
✅ Can navigate between all pages
✅ No red errors in terminal
✅ No red errors in browser console
✅ Styles look correct

---

**Print this page for quick reference during development!** 📄
