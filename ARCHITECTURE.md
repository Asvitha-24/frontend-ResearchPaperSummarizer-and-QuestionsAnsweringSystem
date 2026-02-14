# Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    RESEARCH PAPER DASHBOARD                 │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    React Application                  │   │
│  │                                                        │   │
│  │  ┌────────────────┐         ┌──────────────────┐    │   │
│  │  │   Pages (6)    │         │  Components (25) │    │   │
│  │  │                │         │                  │    │   │
│  │  │ HomePage       │         │ UI Components    │    │   │
│  │  │ SearchPage     │────────→│ Layout           │    │   │
│  │  │ UploadPage     │         │ Specialized      │    │   │
│  │  │ QAPage         │         │                  │    │   │
│  │  │ HistoryPage    │         │ 15+ UI Comps     │    │   │
│  │  │ NotFoundPage   │         │ 3 Layout Comps   │    │   │
│  │  └────────────────┘         │ 6 Special Comps  │    │   │
│  │           │                 └──────────────────┘    │   │
│  │           │                          │               │   │
│  │           └──────────┬───────────────┘               │   │
│  │                      ↓                                │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │         Zustand Store (appStore.js)          │   │   │
│  │  │                                               │   │   │
│  │  │ • documents      • summaries                  │   │   │
│  │  │ • qaResults      • searchResults              │   │   │
│  │  │ • history        • savedResults               │   │   │
│  │  │ • preferences    • loading/error              │   │   │
│  │  │                                               │   │   │
│  │  │ ✓ localStorage persistence                   │   │   │
│  │  │ ✓ DevTools integration                       │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │           ↑                  ↓                       │   │
│  │           │              Hooks (6)                   │   │
│  │           │              • useApi                    │   │
│  │           │              • useDebouncedSearch        │   │
│  │           │              • useLocalStorage           │   │
│  │           │              • useDarkMode              │   │
│  │           │              • usePagination            │   │
│  │           │              • useForm                  │   │
│  │           │                                         │   │
│  │      ┌────┴──────────────────────┐                 │   │
│  │      ↓                            ↓                 │   │
│  │  ┌─────────────┐           ┌──────────────┐       │   │
│  │  │ Styles      │           │ Utilities    │       │   │
│  │  │             │           │              │       │   │
│  │  │ globals.css │           │ helpers.js   │       │   │
│  │  │ Tailwind    │           │ 40+ functions│       │   │
│  │  │ Dark Mode   │           │ validators   │       │   │
│  │  └─────────────┘           └──────────────┘       │   │
│  └────────────────────────────────────────────────────┘   │
│                      ↓                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Service (api.js)                     │   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ Documents    │  │ Summarization│  │ Q&A        │ │   │
│  │  │              │  │              │  │            │ │   │
│  │  │ • Upload     │  │ • Generate   │  │ • Ask      │ │   │
│  │  │ • List       │  │ • Get        │  │ • History  │ │   │
│  │  │ • Get        │  └──────────────┘  └────────────┘ │   │
│  │  │ • Delete     │                                    │   │
│  │  └──────────────┘                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ Search       │  │ History      │  │ Export     │ │   │
│  │  │              │  │              │  │            │ │   │
│  │  │ • Search     │  │ • Get        │  │ • PDF      │ │   │
│  │  └──────────────┘  │ • Delete     │  │ • JSON     │ │   │
│  │                    │ • Save       │  │ • CSV      │ │   │
│  │                    │ • Unsave     │  └────────────┘ │   │
│  │                    └──────────────┘                  │   │
│  └────────────────────────────────────────────────────┘   │
│                      ↓                                     │
│              Axios HTTP Client                             │
│              (with interceptors)                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend API (http://localhost:5000)            │
│                                                               │
│  REST Endpoints:                                             │
│  • POST /documents/upload       • POST /summarize           │
│  • GET /documents               • POST /question-answer      │
│  • GET /search                  • GET /history              │
│  • POST /export/*               • And more...               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
├── Layout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Nav Links
│   │   └── Theme Toggle
│   │
│   ├── Main Content Area
│   │   ├── HomePage
│   │   │   ├── Hero Section
│   │   │   ├── Stats Cards
│   │   │   ├── Feature Cards
│   │   │   └── Activity Feed
│   │   │
│   │   ├── SearchPage
│   │   │   ├── Search Form
│   │   │   │   ├── Query Input
│   │   │   │   ├── Filters
│   │   │   │   └── Submit Button
│   │   │   ├── Results Grid
│   │   │   │   └── ResultCard (x multiple)
│   │   │   └── Pagination
│   │   │
│   │   ├── UploadSummarizePage
│   │   │   ├── DocumentUploader
│   │   │   ├── Summary Options
│   │   │   └── SummaryDisplay
│   │   │
│   │   ├── QAPage
│   │   │   ├── QAInterface
│   │   │   │   ├── Document Select
│   │   │   │   └── Question Input
│   │   │   ├── AnswerDisplay
│   │   │   ├── Suggested Questions
│   │   │   └── History Sidebar
│   │   │
│   │   ├── HistoryPage
│   │   │   ├── Tabs
│   │   │   ├── Toolbar
│   │   │   ├── HistoryTable
│   │   │   └── Stats Footer
│   │   │
│   │   └── NotFoundPage
│   │
│   ├── Sidebar
│   │   ├── Menu Items
│   │   └── Quick Stats
│   │
│   └── Footer
│       ├── Links
│       └── Copyright
```

---

## State Flow

```
User Action
    ↓
    └─→ Component Event Handler
           ↓
           └─→ API Call (api.js)
                  ↓
                  ├─→ Zustand Action
                  │      ↓
                  │      └─→ State Update
                  │             ↓
                  │             └─→ localStorage (persistence)
                  │
                  └─→ Response Processing
                         ↓
                         └─→ Error/Success Handling
                                ↓
                                └─→ UI Update (re-render)
```

---

## Data Flow Diagrams

### Search Flow
```
User Types Query
      ↓
useDebouncedSearch Hook (300ms delay)
      ↓
searchDocuments() API Call
      ↓
Backend Processing
      ↓
API Response
      ↓
setSearchResults() → Store
      ↓
SearchPage Re-renders with Results
      ↓
User sees ResultCards with Pagination
```

### Upload & Summarize Flow
```
User Uploads File
      ↓
DocumentUploader Component
      ↓
uploadDocument() API Call
      ↓
Backend Stores Document
      ↓
addDocument() → Store
      ↓
User Configures Summary Options
      ↓
generateSummary() API Call
      ↓
Backend Generates Summary
      ↓
addSummary() → Store
      ↓
SummaryDisplay Shows Results
      ↓
User can Copy/Download/Save
      ↓
saveResult() → Store
      ↓
Result added to History
```

### Question Answering Flow
```
User Selects Document
      ↓
User Types Question
      ↓
askQuestion() API Call
      ↓
Backend Processes Question
      ↓
Backend Returns Answer with Confidence Score
      ↓
addQAResult() → Store
      ↓
AnswerDisplay Shows Answer
      ↓
addToHistory() → Store
      ↓
Question added to History Sidebar
      ↓
User can ask follow-up questions
```

---

## State Management Details

### Zustand Store (appStore.js)

```javascript
{
  // Documents
  documents: Document[]
  addDocument()
  removeDocument()
  setDocuments()

  // Summaries
  summaries: {[docId]: summary}
  addSummary()
  removeSummary()
  setSummaries()

  // Q&A Results
  qaResults: QAResult[]
  addQAResult()
  removeQAResult()
  setQAResults()

  // Search Results
  searchResults: Result[]
  setSearchResults()
  clearSearchResults()

  // History
  history: HistoryItem[]
  addToHistory()
  deleteFromHistory()
  clearHistory()

  // Saved Results
  savedResults: SavedResult[]
  saveResult()
  unsaveResult()

  // State
  loading: boolean
  error: string | null
  setLoading()
  setError()
  clearError()

  // Preferences
  preferences: {
    theme: 'light' | 'dark'
    resultsPerPage: number
    sortBy: string
    defaultSummaryLength: number
  }
  setPreferences()
  updatePreference()

  // Current Selection
  selectedPaper: Paper | null
  setSelectedPaper()
  currentDocument: Document | null
  setCurrentDocument()

  // Utils
  reset()
}
```

---

## Custom Hooks Dependencies

```
useApi
  └─→ useState (data, loading, error)
  
useDebouncedSearch
  └─→ useState (query, results, loading, error)
      └─→ useEffect (300ms debounce)

useLocalStorage
  └─→ useState (persistent value)
      └─→ useEffect (sync with storage)

useDarkMode
  └─→ useLocalStorage (isDarkMode)
      └─→ useEffect (toggle HTML class)

usePagination
  └─→ useState (currentPage)
      └─→ Derived: currentItems, totalPages

useForm
  └─→ useState (values, errors, touched, isSubmitting)
      └─→ Handlers: onChange, onBlur, onSubmit, reset
```

---

## Styling Architecture

```
globals.css (Tailwind + Custom)
    ├─ CSS Variables (colors, spacing, shadows)
    ├─ Base Styles (body, html, a, input)
    ├─ Typography (h1-h6, p)
    ├─ Custom Utilities (text-truncate, line-clamp, glass)
    └─ Animations (fadeIn, slideIn)
        ↓
App.css (App-specific)
    ├─ Loading states
    ├─ Code blocks
    ├─ Links
    └─ Print styles
        ↓
Component-scoped Styles (Tailwind classes)
    └─ All styling via Tailwind utility classes
```

---

## API Integration Pattern

```
api.js (Service Layer)
    │
    └─→ Axios Client
         ├─ Base URL Configuration
         ├─ Timeout Setup (30s)
         └─ Interceptors
              ├─ Response Handler
              └─ Error Handler
    │
    └─→ API Functions
         ├─ Document Functions
         ├─ Summarization Functions
         ├─ Q&A Functions
         ├─ Search Functions
         ├─ History Functions
         └─ Export Functions
    │
    └─→ Error Handling
         ├─ Response Errors
         ├─ Network Errors
         └─ User-friendly Messages
    │
    └─→ Usage in Components
         ├─ Via useApi Hook
         └─ Direct import and call
```

---

## Responsive Design Breakpoints

```
Mobile (0px - 767px)
├─ Single column layout
├─ Mobile menu (hamburger)
├─ Sidebar hidden
└─ Stack vertically

Tablet (768px - 1023px)
├─ Two column layout
├─ Mobile menu optional
├─ Limited sidebar
└─ Grid layout (2 cols)

Desktop (1024px - 1279px)
├─ Three column layout
├─ Desktop menu
├─ Full sidebar visible
└─ Grid layout (3 cols)

Large (1280px+)
├─ Full multi-column layout
├─ All features visible
├─ Optimized spacing
└─ Grid layout (4+ cols)
```

---

## Deployment Architecture

```
Source Code (Git)
      ↓
npm install → node_modules
      ↓
npm run dev → Development Server (Port 3000)
      ↓
npm run build → Vite Build
      ↓
dist/ Folder (Optimized)
      ├─ index.html (minified)
      ├─ assets/
      │  ├─ *.js (minified, chunked)
      │  └─ *.css (minified, purged)
      └─ Ready for deployment
           ↓
Static Hosting (Vercel, Netlify, AWS S3, etc.)
           ↓
      Live Application
```

---

## Security Architecture

```
Frontend Security Measures:

1. Input Validation
   ├─ Form validation
   ├─ URL validation
   ├─ Email validation
   └─ File type validation

2. API Security
   ├─ Axios interceptors
   ├─ CORS configuration
   ├─ Error handling
   └─ No sensitive data in localStorage

3. XSS Protection
   ├─ React escaping
   ├─ Sanitized content
   └─ No innerHTML usage

4. Data Security
   ├─ localStorage for preferences only
   ├─ No passwords stored
   ├─ Secure API URLs
   └─ Environment variable management
```

---

This architecture provides:
- ✅ Scalability
- ✅ Maintainability
- ✅ Performance
- ✅ Security
- ✅ User Experience
- ✅ Developer Experience

---

**Last Updated**: February 2026
