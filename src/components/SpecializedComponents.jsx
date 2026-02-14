import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { Card, Button, Alert } from './UI';

/**
 * DocumentUploader Component
 */
export const DocumentUploader = ({ onFileSelect, accept = '.pdf,.txt,.docx', maxSize = 10485760 }) => {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        console.error('Rejected files:', rejectedFiles);
      }
      acceptedFiles.forEach((file) => {
        onFileSelect(file);
      });
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize,
  });

  return (
    <Card>
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        )}
      >
        <input {...getInputProps()} />
        <div className="text-4xl mb-4">📄</div>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop your files here'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          or click to browse (PDF, TXT, DOCX up to 10MB)
        </p>
        <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
          Browse Files
        </Button>
      </div>
    </Card>
  );
};

/**
 * ResultCard Component
 */
export const ResultCard = ({ result, onViewDetails, onSave, isSaved = false }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {result.title || 'Untitled Document'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {result.preview || result.content || 'No preview available'}
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-500 mb-4">
            {result.date && (
              <div>
                <span className="font-medium">Date:</span> {new Date(result.date).toLocaleDateString()}
              </div>
            )}
            {result.score && (
              <div>
                <span className="font-medium">Relevance:</span> {Math.round(result.score * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" size="sm" onClick={onViewDetails} className="flex-1">
            View Details
          </Button>
          <Button
            variant={isSaved ? 'secondary' : 'ghost'}
            size="sm"
            onClick={onSave}
          >
            {isSaved ? '⭐' : '☆'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

/**
 * SummaryDisplay Component
 */
export const SummaryDisplay = ({ summary, originalText, metrics, onCopy, onDownload, onSave }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Metrics */}
      {metrics && (
        <Card className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compression</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.compression}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Processing Time</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.processingTime}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tokens Used</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.tokensUsed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{metrics.wordCount}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Summary */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Summary</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {summary}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" onClick={onCopy}>
            📋 Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            ⬇️ Download
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            💾 Save
          </Button>
        </div>
      </Card>

      {/* Original Text */}
      {originalText && (
        <Card>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>Original Text</span>
            <span>{isExpanded ? '▼' : '▶'}</span>
          </button>

          {isExpanded && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {originalText}
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

/**
 * QAInterface Component
 */
export const QAInterface = ({ onAskQuestion, loading = false, documents = [] }) => {
  const [question, setQuestion] = React.useState('');
  const [selectedDoc, setSelectedDoc] = React.useState(documents[0]?.id || '');
  const [context, setContext] = React.useState('full');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onAskQuestion(question, selectedDoc, context);
      setQuestion('');
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Ask a Question</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Document Selection */}
        {documents.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Document
            </label>
            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.title || doc.name || 'Untitled'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Context Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search In
          </label>
          <div className="flex gap-4">
            {['full', 'summary'].map((opt) => (
              <label key={opt} className="flex items-center">
                <input
                  type="radio"
                  name="context"
                  value={opt}
                  checked={context === opt}
                  onChange={(e) => setContext(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {opt === 'full' ? 'Full Document' : 'Summary Only'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know about the document?"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={!question.trim()}
        >
          Ask Question
        </Button>
      </form>
    </Card>
  );
};

/**
 * AnswerDisplay Component
 */
export const AnswerDisplay = ({ answer, confidence, processingTime, location }) => {
  return (
    <Card className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Answer</h4>
          {processingTime && (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ⏱️ {processingTime}s
            </span>
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {answer}
        </p>

        {/* Confidence Score */}
        {confidence && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {Math.round(confidence)}%
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Found at: {location.page && `Page ${location.page}, `}
            {location.position}
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * HistoryTable Component
 */
export const HistoryTable = ({ items, onDelete, onExport, loading = false }) => {
  if (loading) {
    return <div>Loading history...</div>;
  }

  if (!items || items.length === 0) {
    return (
      <Alert type="info" message="No history items yet. Start by uploading a document or performing a search!" />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Query/Title</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Status</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                {item.type === 'summary' && '📝'}
                {item.type === 'qa' && '❓'}
                {item.type === 'search' && '🔍'}
                {item.type === 'upload' && '📤'}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs truncate">
                {item.title || item.query || 'N/A'}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                {new Date(item.timestamp).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium
                  ${item.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    item.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <Button variant="ghost" size="sm" onClick={() => onExport(item.id)}>
                  Export
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
