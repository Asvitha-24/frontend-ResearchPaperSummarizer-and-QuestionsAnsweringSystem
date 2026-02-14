import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { Card, Button, Tabs, Alert, Badge, Spinner } from '../components/UI';
import { HistoryTable } from '../components/SpecializedComponents';

const HistoryPage = () => {
  const { history, savedResults, deleteFromHistory, unsaveResult, setLoading, loading } = useAppStore();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState(new Set());

  const tabs = [
    { id: 'all', label: 'All History' },
    { id: 'summaries', label: 'Summaries' },
    { id: 'qa', label: 'Questions' },
    { id: 'search', label: 'Searches' },
    { id: 'saved', label: '⭐ Saved Results' },
  ];

  const getFilteredItems = () => {
    if (activeTab === 'saved') {
      return savedResults;
    }

    if (activeTab === 'all') {
      return history;
    }

    return history.filter((item) => item.type === activeTab);
  };

  const filteredItems = getFilteredItems();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'saved') {
        unsaveResult(id);
      } else {
        deleteFromHistory(id);
      }
    }
  };

  const handleExport = async (type) => {
    setLoading(true);
    try {
      const itemsToExport = Array.from(selectedItems).length > 0
        ? Array.from(selectedItems)
        : filteredItems.map((item) => item.id);

      // In a real app, call the export API
      console.log(`Exporting ${itemsToExport.length} items as ${type}`);

      // Create mock file
      const data = filteredItems.filter((item) => itemsToExport.includes(item.id));
      const content =
        type === 'json'
          ? JSON.stringify(data, null, 2)
          : type === 'csv'
          ? generateCSV(data)
          : `History Export\n\n${data.map((item) => `${item.type}: ${item.title || item.query} - ${item.timestamp}`).join('\n')}`;

      const element = document.createElement('a');
      const file = new Blob([content], {
        type: type === 'json' ? 'application/json' : type === 'csv' ? 'text/csv' : 'text/plain',
      });

      element.href = URL.createObjectURL(file);
      element.download = `history-export.${type}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCSV = (items) => {
    const headers = ['Type', 'Title/Query', 'Date', 'Status'];
    const rows = items.map((item) => [
      item.type,
      item.title || item.query,
      new Date(item.timestamp).toLocaleDateString(),
      item.status,
    ]);

    return [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">History & Saved Results</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track all your queries and save important results
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Toolbar */}
      {filteredItems.length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-sm text-blue-900 dark:text-blue-200">
              {selectedItems.size > 0 && (
                <>
                  <span className="font-semibold">{selectedItems.size}</span> item(s) selected
                </>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleExport('json')}
                loading={loading}
              >
                📄 JSON
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleExport('csv')}
                loading={loading}
              >
                📊 CSV
              </Button>
              <Button variant="secondary" size="sm">
                📋 Copy
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredItems.length === 0 ? (
        <Alert
          type="info"
          title={activeTab === 'saved' ? 'No Saved Results' : 'No History'}
          message={
            activeTab === 'saved'
              ? 'Bookmark results to save them here for later access'
              : `No ${activeTab === 'all' ? 'history' : activeTab} yet. Start by uploading a document or performing a search!`
          }
        />
      ) : (
        <HistoryTable
          items={filteredItems}
          onDelete={handleDelete}
          onExport={(id) => console.log('Export item:', id)}
        />
      )}

      {/* Stats Footer */}
      {filteredItems.length > 0 && (
        <Card className="bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredItems.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(
                  (filteredItems.filter((item) => item.status === 'success').length / filteredItems.length) *
                  100
                )}
                %
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Oldest</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {filteredItems[filteredItems.length - 1]
                  ? new Date(filteredItems[filteredItems.length - 1].timestamp).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Newest</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {filteredItems[0]
                  ? new Date(filteredItems[0].timestamp).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;
