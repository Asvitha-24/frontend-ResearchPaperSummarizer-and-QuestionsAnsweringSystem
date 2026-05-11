import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { validatePaperId } from '../utils/validators';
import '../styles/PaperDetailPage.css';

// Note: This page is part of the legacy search feature which has been removed
// The /paper/:paperId route is no longer accessible from the main UI

const PaperDetailPage = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    const fetchPaper = async () => {
      setLoading(false);
      setError('This feature has been removed. The semantic search functionality is no longer available. Please use the Upload & Summarize or Ask Questions features instead.');
    };

    fetchPaper();
  }, [paperId]);

  const handleSummarize = async () => {
    // This feature is no longer available
    alert('This feature has been removed. Please use the Upload & Summarize page instead.');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="paper-detail-page">
        <Header />
        <LoadingSpinner message="Loading paper..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="paper-detail-page">
        <Header />
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="paper-detail-page">
      <Header />
      <main className="paper-detail-main">
        <div className="paper-detail-container">
          <div className="paper-content-section">
            <div className="paper-header">
              <h1>{paper?.title}</h1>
              {paper?.authors && (
                <p className="paper-meta">
                  <strong>Authors:</strong> {paper.authors}
                </p>
              )}
              {paper?.year && (
                <p className="paper-meta">
                  <strong>Year:</strong> {paper.year}
                </p>
              )}
            </div>

            {paper?.abstract && (
              <section className="paper-abstract-section">
                <h2>Abstract</h2>
                <p>{paper.abstract}</p>
              </section>
            )}

            <section className="paper-text-section">
              <h2>Full Paper Content</h2>
              <div className="paper-text">
                {paper?.content || paper?.text || 'No content available'}
              </div>
            </section>

            <div className="paper-actions">
              <button
                onClick={handleSummarize}
                disabled={summarizing}
                className="summarize-btn"
              >
                {summarizing ? 'Summarizing...' : '📄 Generate Summary'}
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
            <Chatbot paperId={paperId} useSummary={false} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PaperDetailPage;
