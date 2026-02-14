import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { searchDocuments } from '../services/api';
import { useApi, usePagination } from '../hooks';
import { Card, Button, Input, Label, Spinner, Alert, FormGroup, Select } from '../components/UI';
import { ResultCard } from '../components/SpecializedComponents';

const SearchPage = () => {
  const { setSearchResults, searchResults, setLoading, loading } = useAppStore();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    relevanceThreshold: 0,
    category: '',
    sortBy: 'relevance',
  });
  const [hasSearched, setHasSearched] = useState(false);

  const { currentItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(
    searchResults,
    10
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await searchDocuments(query, filters);
      setSearchResults(results.papers || results.data || []);
      goToPage(1);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleSaveResult = (result) => {
    // Implement save functionality
    console.log('Saving result:', result);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Documents</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find relevant papers with advanced filtering and ranking options
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Query Input */}
          <FormGroup label="Search Query" required>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keywords, authors, topics..."
              disabled={loading}
            />
          </FormGroup>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormGroup label="Sort By">
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                options={[
                  { value: 'relevance', label: 'Relevance (High to Low)' },
                  { value: 'date', label: 'Date (Newest First)' },
                  { value: 'date-asc', label: 'Date (Oldest First)' },
                  { value: 'title', label: 'Title (A to Z)' },
                ]}
              />
            </FormGroup>

            <FormGroup label="Relevance Threshold">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.relevanceThreshold}
                  onChange={(e) => handleFilterChange('relevanceThreshold', e.target.value)}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {filters.relevanceThreshold}%
                </span>
              </div>
            </FormGroup>

            <FormGroup label="Category">
              <Input
                type="text"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                placeholder="e.g., ML, NLP, Vision"
              />
            </FormGroup>

            <FormGroup label="From Date">
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </FormGroup>

            <FormGroup label="To Date">
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </FormGroup>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" fullWidth loading={loading}>
            🔍 Search Documents
          </Button>
        </form>
      </Card>

      {/* Results */}
      {hasSearched && (
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : currentItems.length > 0 ? (
            <>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Found <span className="font-semibold text-gray-900 dark:text-white">{searchResults.length}</span> results
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((result) => (
                  <ResultCard
                    key={result.id}
                    result={result}
                    onViewDetails={() => console.log('View details:', result.id)}
                    onSave={() => handleSaveResult(result)}
                    isSaved={false}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-md transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Alert
              type="info"
              title="No Results"
              message="Try adjusting your search query or filters"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
