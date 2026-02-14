# Research Paper Summarizer & QA System - Frontend

A modern React-based dashboard for uploading research papers, generating intelligent summaries, asking questions, and discovering related documents using advanced AI and NLP.

## 🎯 Features

- **📝 Summarization**: Generate concise summaries of research papers with customizable length
- **🔍 Search**: Find relevant papers with advanced filtering, sorting, and ranking
- **❓ Q&A**: Ask questions about documents and get instant AI-powered answers
- **📋 History**: Track all your queries and save important results
- **💾 Export**: Save results as PDF, JSON, or CSV
- **🌙 Dark Mode**: Professional dark mode support
- **📱 Responsive**: Mobile-friendly design for all devices
- **♿ Accessible**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **File Upload**: React-Dropzone
- **Build Tool**: Vite
- **UI Components**: Custom components + Material-UI
- **Routing**: React Router v6

## 📋 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── UI.jsx                    # Reusable UI components
│   │   ├── Layout.jsx                # Navbar, Sidebar, Footer
│   │   └── SpecializedComponents.jsx # Document uploader, cards, etc.
│   ├── hooks/
│   │   └── index.js                  # Custom React hooks
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── UploadSummarizePage.jsx
│   │   ├── QAPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── PaperDetailPage.jsx       # Legacy
│   │   ├── SummaryPage.jsx           # Legacy
│   │   └── NotFoundPage.jsx
│   ├── context/
│   │   └── PaperContext.js           # Legacy context
│   ├── store/
│   │   └── appStore.js               # Zustand state management
│   ├── services/
│   │   └── api.js                    # API client & endpoints
│   ├── styles/
│   │   ├── globals.css               # Global styles
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/
│   │   ├── helpers.js                # Utility functions
│   │   └── validators.js             # Validation functions
│   ├── App.js
│   ├── main.jsx                      # Vite entry point
│   └── index.js                      # React entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 7+
- Backend API running on `http://localhost:5000/api`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Update environment variables** (`.env`):
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Research Paper Summarizer
   VITE_ENVIRONMENT=development
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## 📦 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting (if configured)
npm run lint
```

## 🏗️ Main Components

### Pages
- **HomePage**: Welcome page with stats and feature overview
- **SearchPage**: Advanced search with filters and pagination
- **UploadSummarizePage**: Document upload and summarization
- **QAPage**: Question answering interface
- **HistoryPage**: History tracking and result management

### Layout Components
- **Navbar**: Top navigation with theme toggle and links
- **Sidebar**: Side navigation with menu items and quick stats
- **Footer**: Footer with links and copyright
- **Layout**: Main wrapper component

### UI Components
- **Button**: Customizable button with multiple variants
- **Card**: Content container component
- **Input/Textarea**: Form input elements
- **Modal**: Dialog component
- **Spinner**: Loading indicator
- **Alert**: Notification component
- **Badge**: Status badge
- **ProgressBar**: Progress indicator
- **Tabs**: Tabbed interface
- **Select**: Dropdown selection

### Specialized Components
- **DocumentUploader**: Drag-and-drop file uploader
- **ResultCard**: Search result display card
- **SummaryDisplay**: Summary with metrics and actions
- **QAInterface**: Question asking form
- **AnswerDisplay**: Answer with confidence score
- **HistoryTable**: Historical results table

## 🎨 Design System

### Colors
```css
Primary: #3b82f6 (Blue)
Secondary: #6b7280 (Gray)
Success: #10b981 (Green)
Warning: #f59e0b (Orange)
Error: #ef4444 (Red)
```

### Typography
- **Display**: 30px (bold)
- **Heading 1**: 24px (bold)
- **Heading 2**: 20px (semibold)
- **Body**: 16px (regular)
- **Small**: 14px (regular)

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

### Border Radius
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px

## 🔌 API Integration

### Document Management
```javascript
uploadDocument(file)        // POST /documents/upload
getDocuments()              // GET /documents
getDocumentById(id)         // GET /documents/:id
deleteDocument(id)          // DELETE /documents/:id
```

### Summarization
```javascript
generateSummary(docId, options)  // POST /summarize
getSummary(docId)                // GET /summarize/:id
```

### Question Answering
```javascript
askQuestion(docId, question, context)  // POST /question-answer
getQAHistory(docId)                    // GET /question-answer/:id/history
```

### Search
```javascript
searchDocuments(query, filters)  // GET /search
searchPapers(query)              // GET /papers/search (legacy)
```

### History & Export
```javascript
getHistory()                // GET /history
deleteHistoryItem(id)       // DELETE /history/:id
saveResult(data)            // POST /history/save
getSavedResults()           // GET /history/saved
unsaveResult(id)            // DELETE /history/saved/:id
exportHistoryAsPDF(ids)     // POST /export/pdf
exportHistoryAsJSON(ids)    // POST /export/json
exportHistoryAsCSV(ids)     // POST /export/csv
```

## 🎯 State Management (Zustand)

```javascript
import { useAppStore } from '@/store/appStore';

// Use in components
const {
  documents,
  summaries,
  qaResults,
  searchResults,
  history,
  savedResults,
  preferences,
  loading,
  error,
  
  // Actions
  addDocument,
  addSummary,
  addQAResult,
  addToHistory,
  saveResult,
  updatePreference,
} = useAppStore();
```

### Store Features
- **Persistent**: Automatically saves to localStorage
- **Devtools**: Redux devtools integration for debugging
- **Typed**: Full TypeScript support (optional)

## 🎣 Custom Hooks

### useApi
Advanced API call management:
```javascript
const { data, loading, error, execute } = useApi(apiFunction);
```

### useDebouncedSearch
Debounced search functionality:
```javascript
const { query, setQuery, results, loading } = useDebouncedSearch(searchFn, 300);
```

### useLocalStorage
Browser local storage management:
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### useDarkMode
Dark mode toggle:
```javascript
const { isDarkMode, toggle } = useDarkMode();
```

### usePagination
Pagination logic:
```javascript
const {
  currentItems,
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
} = usePagination(items, 10);
```

### useForm
Form state management:
```javascript
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  reset,
} = useForm(initialValues, onSubmit);
```

## 🛠️ Utility Functions

### Formatting
```javascript
formatFileSize(bytes)        // Format bytes to readable size
formatDate(date, format)     // Format date strings
formatText(text, maxLen)     // Truncate text
highlightText(text, query)   // Highlight search terms
extractPreview(text, len)    // Extract text preview
```

### Validation
```javascript
isValidEmail(email)          // Email validation
isValidURL(url)              // URL validation
isValidFile(file, types)     // File type validation
validateForm(values, schema) // Form validation
```

### Data Transformation
```javascript
groupBy(array, key)          // Group array by key
sortBy(array, key, dir)      // Sort array
filterByDate(items, from, to) // Filter by date range
removeDuplicates(arr, key)   // Remove duplicates
chunk(array, size)           // Split array into chunks
unique(array, key)           // Get unique values
```

### Object/Array Utilities
```javascript
pick(obj, keys)              // Pick specific keys
omit(obj, keys)              // Omit specific keys
deepMerge(target, source)    // Deep merge objects
```

## 🌙 Dark Mode

Dark mode is automatically applied based on system preference and stored in localStorage. Users can toggle with the theme button in the navbar.

```javascript
// Use in components
const { isDarkMode, toggle } = useDarkMode();

// Dark mode classes are automatically applied to html element
// Use dark: prefixed Tailwind classes
<div className="bg-white dark:bg-gray-900">
  {/* Content */}
</div>
```

## 📱 Responsive Design

Breakpoints:
- **Mobile**: 0px - 767px (single column)
- **Tablet**: 768px - 1023px (two column)
- **Desktop**: 1024px - 1279px (three column)
- **Large**: 1280px+ (full layout)

```jsx
{/* Mobile-first approach with Tailwind */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Color contrast 4.5:1 minimum
- ✅ Focus management
- ✅ Alt text for images
- ✅ WCAG 2.1 AA compliant

## 🔐 Security

- XSS protection via React's built-in escaping
- CSRF tokens via API interceptors
- Secure API endpoint configuration
- No sensitive data in localStorage (only preferences)
- Environment variable management for secrets

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 $(lsof -t -i :3000)
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Failed
1. Check backend is running on `http://localhost:5000`
2. Verify `VITE_API_URL` in `.env`
3. Check CORS is enabled on backend
4. Look at browser console for detailed errors

### Vite Issues
```bash
# Clear cache
rm -rf .vite

# Rebuild
npm run build
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/name`
4. Create Pull Request

## 📄 License

MIT License - see LICENSE file

## 💬 Support

- Create an issue for bugs
- Discussion for features
- Documentation for guides

---

**Version**: 0.1.0  
**Last Updated**: February 2026  
**Maintainers**: Development Team
