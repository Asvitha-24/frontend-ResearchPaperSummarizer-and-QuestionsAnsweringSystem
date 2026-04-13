import React, { useState } from 'react';
import { validateSearchQuery } from '../utils/validators';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validation = validateSearchQuery(query);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setError('');
  };

  return (
    <div className="search-bar-container">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Upload research papers, generate intelligent summaries and ask questions
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search 232,217,438 papers from all fields of science"
          value={query}
          onChange={handleChange}
          disabled={isLoading}
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-btn">
          {isLoading ? '...' : '🔍 Search'}
        </button>
      </form>
      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default SearchBar;
