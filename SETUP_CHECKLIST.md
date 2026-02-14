# Setup Checklist ✅

Use this checklist to verify your frontend setup is complete and working.

## Initial Setup

- [ ] Clone/access the repository
- [ ] Navigate to `frontend` directory
- [ ] Verify Node.js 16+ is installed: `node --version`
- [ ] Verify npm 7+ is installed: `npm --version`

## Installation

- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete
- [ ] Verify no critical errors in output
- [ ] Check `node_modules` folder was created

## Configuration

- [ ] Copy `.env.example` to `.env`: `cp .env.example .env`
- [ ] Open `.env` and verify settings:
  - [ ] `VITE_API_URL=http://localhost:5000/api`
  - [ ] Backend server is running on port 5000
- [ ] Save the `.env` file

## Development Server

- [ ] Start dev server: `npm run dev`
- [ ] Wait for compilation to complete
- [ ] Look for "Local: http://localhost:3000" in terminal
- [ ] Browser should open automatically
- [ ] See the ResearchAI homepage

## Verify Features

### Navigation
- [ ] Navbar displays with logo and menu
- [ ] All navigation links are visible
- [ ] Theme toggle button works (☀️/🌙)
- [ ] Mobile menu appears on small screens
- [ ] Sidebar is visible on desktop

### Home Page
- [ ] Welcome heading displays
- [ ] Stats cards show (Documents, Summaries, Questions, Searches)
- [ ] Feature cards display (4 cards with emojis)
- [ ] CTA button is visible

### Search Page
- [ ] Search form displays
- [ ] Filter options visible (sort, relevance, category, dates)
- [ ] Search button works
- [ ] Results show when searching (if backend connected)

### Upload & Summarize
- [ ] Drag-and-drop zone visible
- [ ] File upload button clickable
- [ ] File size indicator works
- [ ] Summary options visible
- [ ] Generate button clickable

### QA Page
- [ ] Question interface displays
- [ ] Document selector works (if documents exist)
- [ ] Question textarea present
- [ ] Ask Question button clickable

### History Page
- [ ] Tabs visible (All, Summaries, QA, Searches, Saved)
- [ ] Tab switching works
- [ ] Empty state message shows initially
- [ ] Export buttons visible

## Styling & Theming

- [ ] Default light theme applies
- [ ] Dark mode toggle works in navbar
- [ ] Dark theme applies to all pages
- [ ] Text contrast is good in both themes
- [ ] Colors match design system

## Responsive Design

- [ ] Resize browser to mobile size (375px)
- [ ] Mobile menu appears
- [ ] Layout stacks vertically
- [ ] Text is readable
- [ ] No horizontal scrolling

- [ ] Tablet size (768px)
- [ ] Grid changes to 2 columns
- [ ] Layout is optimized

- [ ] Desktop size (1024px)
- [ ] Sidebar visible
- [ ] Multi-column layout works
- [ ] All content visible

## Browser DevTools

- [ ] Open DevTools (F12)
- [ ] Check Console tab
- [ ] No red error messages
- [ ] No critical warnings
- [ ] Network tab shows requests (if API calls made)

## API Integration (Backend Required)

- [ ] Backend server running on port 5000
- [ ] Upload document test (if implemented)
- [ ] Check Network tab for requests
- [ ] Verify responses are successful
- [ ] Check Console for any API errors

## Performance

- [ ] Page loads quickly (< 3 seconds)
- [ ] No lag when clicking buttons
- [ ] Animations are smooth
- [ ] No memory leaks in DevTools
- [ ] Network requests are reasonable

## Accessibility

- [ ] Can navigate with Tab key
- [ ] Focus indicators visible
- [ ] Buttons are keyboard accessible
- [ ] Links have proper contrast
- [ ] Form labels associated with inputs

## Build Process

- [ ] Stop dev server: Ctrl+C
- [ ] Build for production: `npm run build`
- [ ] Wait for build to complete
- [ ] Check `dist` folder created
- [ ] No errors in build output
- [ ] Preview build: `npm run preview`

## Final Checks

- [ ] All pages load without errors
- [ ] Navigation between pages works
- [ ] State persists in localStorage
- [ ] Dark mode preference saved
- [ ] No console errors
- [ ] Ready for development

## Troubleshooting If Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Kill process or use different port |
| Module not found | Run `npm install` again |
| Styles not loading | Restart dev server |
| API not working | Check backend is running |
| Build fails | Check Node version, clear node_modules |
| Dark mode not working | Check localStorage in DevTools |

## Next Steps

- [ ] Read `QUICK_START.md` for development tips
- [ ] Review `COMPREHENSIVE_README.md` for detailed docs
- [ ] Explore component files in `src/components`
- [ ] Check `src/services/api.js` for API endpoints
- [ ] Review `src/store/appStore.js` for state management
- [ ] Start building features!

## Developer Tools (Recommended)

Install these VS Code extensions:
- [ ] Tailwind CSS IntelliSense
- [ ] ES7+ React/Redux/React-Native snippets
- [ ] Thunder Client (API testing)
- [ ] Prettier (code formatting)
- [ ] ESLint (code linting)

## Environment Variables

Review your `.env` file:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Research Paper Summarizer
VITE_ENVIRONMENT=development
```

## Summary

✅ **Setup Complete!** Your frontend is ready for development.

- Frontend running on: `http://localhost:3000`
- Backend API URL: `http://localhost:5000/api`
- Hot reload enabled for fast development
- All components ready to use
- State management configured
- Styling with Tailwind CSS ready

---

**Questions?** Check the documentation files:
- `QUICK_START.md` - Quick reference guide
- `COMPREHENSIVE_README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - What was implemented

**Happy Coding! 🚀**

---
Last Updated: February 2026
