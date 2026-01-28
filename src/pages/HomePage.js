import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PaperCard from '../components/PaperCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { searchPapers } from '../services/api';
import '../styles/HomePage.css';

const HomePage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const result = await searchPapers(query);
      setPapers(result.papers || []);
      if (!result.papers || result.papers.length === 0) {
        setError('No papers found. Try a different search term.');
      }
    } catch (err) {
      setError(err.message || 'Failed to search papers. Please try again.');
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setPapers([]);
    setError('');
    setHasSearched(false);
  };

  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <section className="hero-section">
          <h2>Find and Summarize Research Papers</h2>
          <p>Search for papers, get instant summaries, and ask questions to our AI assistant.</p>
        </section>

        <section className="search-section">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </section>

        {loading && <LoadingSpinner message="Searching papers..." />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {!loading && !error && hasSearched && papers.length === 0 && (
          <div className="no-results">
            <p>No papers found. Try a different search term.</p>
          </div>
        )}

        {!loading && papers.length > 0 && (
          <section className="results-section">
            <h3>Search Results ({papers.length})</h3>
            <div className="papers-grid">
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          </section>
        )}

        {!hasSearched && !loading && papers.length === 0 && (
          <section className="welcome-section">
            <h3>Welcome!</h3>
            <p>Use the search bar above to find research papers on any topic.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
