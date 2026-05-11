import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/SummaryPage.css';

// Note: This page is part of the legacy search feature which has been removed
// The /summary/:paperId route is no longer accessible from the main UI

const SummaryPage = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [paper, setPaper] = useState(location.state?.paper || null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(!paper);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(false);
    setError('This feature has been removed. The semantic search functionality is no longer available. Please use the Upload & Summarize or Ask Questions features instead.');
  }, [paperId]);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="summary-page">
        <Header />
        <LoadingSpinner message="Loading summary..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-page">
        <Header />
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="summary-page">
      <Header />
      <main className="summary-main">
        <div className="summary-container">
          <div className="summary-content-section">
            <div className="summary-header">
              <h1>Summary: {paper?.title}</h1>
              {paper?.authors && (
                <p className="summary-meta">
                  <strong>Authors:</strong> {paper.authors}
                </p>
              )}
              <div className="summary-badge">
                <span>✓ Summarized with BART Model</span>
              </div>
            </div>

            <section className="summary-section">
              <h2>Paper Summary</h2>
              <div className="summary-text">
                {summary}
              </div>
            </section>

            <div className="summary-actions">
              <button
                onClick={() => navigate(`/paper/${paperId}`)}
                className="full-paper-btn"
              >
                📄 View Full Paper
              </button>
              <button
                onClick={() => navigate('/')}
                className="back-btn"
              >
                ← Back to Search
              </button>
            </div>
          </div>

          <aside className="chatbot-section">
            <div className="chatbot-info">
              <p>💡 Ask questions about the summary using our AI assistant powered by DistilBERT</p>
            </div>
            <Chatbot paperId={paperId} useSummary={true} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SummaryPage;
