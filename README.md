# Research Paper Summarizer Frontend

A React-based frontend for the Research Paper Summarizer and Question Answering System. This application allows users to search for research papers, read full content, generate summaries, and interact with an AI chatbot.

## Features

✨ **Search Papers**: Search for research papers by topic using SentenceTransformer model
📄 **Paper Details**: View full paper content and metadata
📝 **Summarization**: Generate paper summaries using the BART model
💬 **AI Chatbot**: Interactive chatbot using DistilBERT for answering questions
⚡ **Loading States**: Visual feedback during API calls
❌ **Error Handling**: Comprehensive error handling with retry functionality
🎨 **Responsive Design**: Clean, user-friendly interface that works on all devices

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header
│   ├── SearchBar.js    # Search input component
│   ├── PaperCard.js    # Paper result card
│   ├── Chatbot.js      # AI chatbot interface
│   ├── LoadingSpinner.js # Loading state component
│   └── ErrorMessage.js  # Error display component
├── pages/              # Page components
│   ├── HomePage.js     # Search page
│   ├── PaperDetailPage.js # Full paper view
│   ├── SummaryPage.js  # Summarized paper view
│   └── NotFoundPage.js # 404 page
├── services/           # API services
│   └── api.js         # API client and methods
├── utils/              # Utility functions
│   └── validators.js   # Input validation functions
├── context/            # React context
│   └── PaperContext.js # Global state management
├── styles/             # CSS stylesheets
└── App.js             # Main app component
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## API Integration

The frontend expects the following backend API endpoints:

- `GET /api/papers/search?q=<query>` - Search papers
- `GET /api/papers/<paperId>` - Get paper details
- `POST /api/summarize` - Summarize a paper
- `POST /api/chat` - Get chatbot response

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL (default: `http://localhost:5000/api`)

## Technologies Used

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 🖥️ Desktop (1024px and up)
- 🖥️ Large screens (1200px and up)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Add paper bookmarking functionality
- [ ] User authentication and profiles
- [ ] Paper comparison tool
- [ ] Export summaries to PDF
- [ ] Search filters (year, author, category)
- [ ] Citation management
- [ ] Dark mode support

## License

This project is part of a Final Year Project (FYP) and is provided as-is for educational purposes.
