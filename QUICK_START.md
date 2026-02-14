# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env
```

Edit `.env` and ensure backend URL is correct:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

## 📚 Project Overview

This is a **React-based Dashboard** with 6 main pages:

### 1. **Home Page** (`/`)
- Welcome screen with stats
- Feature overview
- Quick links to all sections

### 2. **Search Page** (`/search`)
- Advanced document search
- Filters and sorting
- Pagination support
- Result previews

### 3. **Upload & Summarize** (`/upload`)
- Drag-and-drop file upload
- Configure summary options
- View results with metrics
- Download and save summaries

### 4. **Ask Questions** (`/qa`)
- Select document
- Ask questions
- Get AI-powered answers
- View confidence scores
- See question history

### 5. **History** (`/history`)
- Track all activities
- Filter by type (summaries, Q&A, searches)
- Export results (JSON, CSV, PDF)
- Save important items

## 🎨 Key Features

✨ **Responsive Design** - Works on mobile, tablet, desktop
🌙 **Dark Mode** - Toggle with theme button in navbar
📱 **Mobile Menu** - Sidebar navigation on small screens
♿ **Accessible** - WCAG 2.1 AA compliant
⚡ **Fast** - Built with Vite for instant hot reload

## 🔌 How It Works

### Frontend Flow

```
User Action
    ↓
Component (Page/UI)
    ↓
Zustand Store (State)
    ↓
API Service (api.js)
    ↓
Backend API
    ↓
Response
    ↓
Update State
    ↓
Re-render Component
```

### State Management

All app state is managed with **Zustand**:

```javascript
// In any component
import { useAppStore } from '@/store/appStore';

const { documents, addDocument } = useAppStore();
```

## 🛠️ Common Tasks

### Add a New Page

1. Create file in `src/pages/NewPage.jsx`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Layout.jsx`

```jsx
// src/pages/NewPage.jsx
import React from 'react';

const NewPage = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
};

export default NewPage;
```

### Use a Component

```jsx
import { Button, Card, Input } from '@/components/UI';

function MyComponent() {
  return (
    <Card>
      <h2>Hello</h2>
      <Input placeholder="Enter text..." />
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### Call API

```jsx
import { searchDocuments } from '@/services/api';

async function handleSearch(query) {
  try {
    const results = await searchDocuments(query);
    console.log(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
}
```

### Use State

```jsx
import { useAppStore } from '@/store/appStore';

function MyComponent() {
  const { documents, addDocument } = useAppStore();
  
  return (
    <div>
      <p>Documents: {documents.length}</p>
      <button onClick={() => addDocument(newDoc)}>Add</button>
    </div>
  );
}
```

## 📖 File Organization

```
src/
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API calls
├── store/               # Zustand state
├── styles/              # CSS files
├── utils/               # Helper functions
└── App.js               # Main app component
```

## 🐛 Debugging

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action
4. See API requests and responses

### Check State
1. Open DevTools
2. Install "Redux DevTools" extension
3. Look for Zustand state in console
4. Inspect state changes

### Check Errors
1. Open DevTools Console tab
2. Look for red errors
3. Check error messages and stack traces

## 🔍 Troubleshooting

### "Cannot GET /"
- Make sure you're running `npm run dev`
- Check that the dev server is running on port 3000

### "API request failed"
- Ensure backend is running on `http://localhost:5000`
- Check network tab in DevTools for actual error
- Verify `VITE_API_URL` in `.env`

### "Module not found"
- Check import paths are correct
- Make sure file exists
- Clear cache: `rm -rf node_modules && npm install`

### Styles not applying
- Clear Tailwind cache: `rm -rf .vite`
- Restart dev server: `npm run dev`
- Check class names are correct

## 📚 Resources

- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com
- **Vite**: https://vitejs.dev
- **Zustand**: https://github.com/pmndrs/zustand
- **Axios**: https://axios-http.com
- **React Router**: https://reactrouter.com

## 💡 Tips

1. Use **Tailwind classes** for styling instead of CSS files
2. Keep components **small and focused**
3. Use **custom hooks** for reusable logic
4. **Test** API calls with Postman or similar
5. Check **browser DevTools** for issues
6. Use **VS Code extensions**:
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets
   - Thunder Client (for API testing)

## 🎓 Learn More

See these files for detailed documentation:
- `COMPREHENSIVE_README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `src/components/UI.jsx` - Component reference
- `src/hooks/index.js` - Custom hooks guide
- `src/services/api.js` - API endpoints
- `src/utils/helpers.js` - Utility functions

## 🤝 Need Help?

1. Check the documentation files
2. Look at existing components for examples
3. Search the codebase with Ctrl+Shift+F
4. Check browser DevTools console
5. Ask in the team Slack/Discord

---

**Happy Coding! 🚀**

Last Updated: February 2026
