import React from 'react';
import { useAppStore } from '../store/appStore';
import { Alert, Badge, Spinner } from '../components/UI';
import { HistoryTable } from '../components/SpecializedComponents';

const HistoryPage = () => {
  const { history, deleteFromHistory } = useAppStore();

  const getFilteredItems = () => {
    return history;
  };

  const filteredItems = getFilteredItems();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteFromHistory(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">History</h1>
      </div>

      {/* Content */}
      {filteredItems.length === 0 ? (
        <Alert
          type="info"
          title="No History"
          message="No history yet. Start by uploading a document or asking a question!"
        />
      ) : (
        <HistoryTable
          items={filteredItems}
          onDelete={handleDelete}
          onExport={(id) => console.log('Export item:', id)}
        />
      )}
    </div>
  );
};

export default HistoryPage;
