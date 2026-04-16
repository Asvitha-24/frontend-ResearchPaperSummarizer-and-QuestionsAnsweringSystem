import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import { Layout } from './components/Layout';
import { useDarkMode } from './hooks';

// Pages
import HomePage from './pages/HomePage';

import UploadSummarizePage from './pages/UploadSummarizePage';
import QAPage from './pages/QAPage';

import PaperDetailPage from './pages/PaperDetailPage';
import SummaryPage from './pages/SummaryPage';
import NotFoundPage from './pages/NotFoundPage';

import './styles/globals.css';
import './styles/App.css';

function App() {
  const { isDarkMode, toggle: toggleTheme } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <PaperProvider>
      <Router>
        <Layout onThemeToggle={toggleTheme} isDarkMode={isDarkMode}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadSummarizePage />} />
            <Route path="/qa" element={<QAPage />} />

            {/* Legacy Routes */}
            <Route path="/paper/:paperId" element={<PaperDetailPage />} />
            <Route path="/summary/:paperId" element={<SummaryPage />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </PaperProvider>
  );
}

export default App;
