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
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for research papers..."
          value={query}
          onChange={handleChange}
          disabled={isLoading}
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-btn">
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default SearchBar;
