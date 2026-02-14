import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPaperById, summarizePaper } from '../services/api';
import { validatePaperId } from '../utils/validators';
import '../styles/PaperDetailPage.css';

const PaperDetailPage = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    const fetchPaper = async () => {
      setLoading(true);
      setError('');

      const validation = validatePaperId(paperId);
      if (!validation.isValid) {
        setError(validation.error);
        setLoading(false);
        return;
      }

      try {
        const result = await getPaperById(paperId);
        setPaper(result);
      } catch (err) {
        setError(err.message || 'Failed to load paper');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId]);

  const handleSummarize = async () => {
    setSummarizing(true);
    setError('');

    try {
      // Call the API to generate summary
      await summarizePaper(paperId, paper.content || paper.text);
      // Navigate to summary page
      navigate(`/summary/${paperId}`, { state: { paper } });
    } catch (err) {
      setError(err.message || 'Failed to summarize paper');
      setSummarizing(false);
    }
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
