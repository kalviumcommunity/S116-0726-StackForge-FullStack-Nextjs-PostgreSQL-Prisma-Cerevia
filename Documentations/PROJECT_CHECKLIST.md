# Cerevia Frontend - Project Checklist

## 🚀 Setup Phase

- [ ] Node.js 18+ installed
- [ ] Navigate to FRONTEND folder
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] No errors in terminal
- [ ] No errors in browser console (F12)

---

## ✅ Testing Phase

### All Pages Load
- [ ] Landing page (/) loads
- [ ] Dashboard (/dashboard) loads
- [ ] Lessons (/lessons) loads
- [ ] Leaderboard (/leaderboard) loads
- [ ] Profile (/profile) loads

### Navigation Works
- [ ] Navbar links work on all pages
- [ ] "Get Started" button navigates to dashboard
- [ ] "Learn More" button scrolls to features
- [ ] Footer links are present
- [ ] Mobile menu opens/closes

### Responsive Design
- [ ] Test at 375px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px+ width (desktop)
- [ ] Mobile menu appears on small screens
- [ ] Grid layouts adapt to screen size
- [ ] Text remains readable on all sizes

### Visual Check
- [ ] Colors look correct (blue/cyan theme)
- [ ] Gradients render properly
- [ ] Shadows visible on cards
- [ ] Hover effects work on buttons/cards
- [ ] Icons/emojis display correctly
- [ ] Spacing looks consistent

---

## 📚 Code Understanding

### File Structure
- [ ] Understand what app/ folder contains
- [ ] Understand what components/ folder contains
- [ ] Understand what lib/ folder contains
- [ ] Know where to add new pages
- [ ] Know where to add new components

### Key Components
- [ ] Can explain Navbar.jsx
- [ ] Can explain Hero.jsx
- [ ] Can explain Button.jsx
- [ ] Can explain Dashboard.jsx
- [ ] Can explain Leaderboard.jsx

### Concepts
- [ ] Understand component props
- [ ] Understand useState hook
- [ ] Know difference between Flexbox and Grid
- [ ] Know how routing works
- [ ] Understand Tailwind utility classes

---

## 🎓 Viva Preparation

### Can Explain:
- [ ] Why we chose Next.js
- [ ] Why we chose Tailwind CSS
- [ ] Why components are separated
- [ ] How file-based routing works
- [ ] When to use Flexbox vs Grid
- [ ] How state management works
- [ ] Where data comes from (sample data)
- [ ] Responsive design approach
- [ ] Color scheme choice
- [ ] Future improvements

### Can Demonstrate:
- [ ] Open project in VS Code
- [ ] Navigate to specific files
- [ ] Point out component structure
- [ ] Show responsive design in browser
- [ ] Explain a component's code
- [ ] Show Tailwind classes in action

---

## 🔧 Code Quality

### Readability
- [ ] All files have purpose comments
- [ ] Variable names are meaningful
- [ ] Functions have clear names
- [ ] No magic numbers
- [ ] Consistent indentation
- [ ] Proper spacing

### Best Practices
- [ ] Each component has single responsibility
- [ ] Reusable components are in components/
- [ ] No duplicate code
- [ ] No unused imports
- [ ] Props are descriptive
- [ ] Event handlers are named clearly (handle...)

---

## 📝 Documentation

- [ ] README.md explains project
- [ ] SETUP.md has installation steps
- [ ] VIVA_GUIDE.md reviewed
- [ ] Know where to find answers
- [ ] Understand all documentation sections

---

## 🎯 Pre-Presentation Checklist

### 24 Hours Before:
- [ ] Run `npm run dev` to ensure it works
- [ ] Visit all pages - take screenshots
- [ ] Review VIVA_GUIDE.md thoroughly
- [ ] Practice explaining 3 components
- [ ] Test responsive design
- [ ] Check for console errors

### 1 Hour Before:
- [ ] Open project in VS Code
- [ ] Have browser ready at localhost:3000
- [ ] Review folder structure
- [ ] Practice demo flow
- [ ] Have confidence!

### During Presentation:
- [ ] Start with project overview
- [ ] Show folder structure
- [ ] Demo each page
- [ ] Open code and explain
- [ ] Answer questions clearly
- [ ] Stay calm and confident

---

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Tailwind Not Working
```bash
# Restart dev server
# Press Ctrl+C
npm run dev
```

### Module Not Found
```bash
# Clear cache and reinstall
rmdir /s node_modules
npm install
```

---

## ✨ Success Criteria

Your project is presentation-ready when:

✅ All pages load without errors
✅ Navigation works everywhere
✅ Responsive on all screen sizes
✅ You can explain any component
✅ You can explain technical decisions
✅ Code is clean and commented
✅ You feel confident about the project

---

## 📞 Quick Reference

**Start Server**: `npm run dev`
**Access App**: `http://localhost:3000`
**Open Console**: Press `F12` in browser
**Stop Server**: Press `Ctrl+C` in terminal

**Key Files to Know**:
- `app/page.jsx` - Landing page
- `components/Navbar.jsx` - Navigation
- `app/globals.css` - Global styles
- `tailwind.config.js` - Tailwind setup

---

## 🎉 Final Confidence Check

Before presentation, ask yourself:

- [ ] Can I explain why Next.js?
- [ ] Can I explain why Tailwind?
- [ ] Can I walk through the folder structure?
- [ ] Can I explain one component in detail?
- [ ] Can I show responsive design?
- [ ] Do I understand Flexbox vs Grid?
- [ ] Am I ready to answer questions?

If you checked all boxes, **you're ready!** 🚀

---

**Remember**: The professor wants to see understanding, not perfection. Focus on explaining your decisions clearly and confidently.

Good luck with your presentation! 🎓
