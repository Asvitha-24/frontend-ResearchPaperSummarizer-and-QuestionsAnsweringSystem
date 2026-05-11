import React from 'react';
import DocumentSummarizer from '../components/DocumentSummarizer';

/**
 * Upload & Summarize Page
 * Uses the DocumentSummarizer component for a clean, working implementation
 */
const UploadSummarizePage = () => {
  return (
    <div style={{ width: '100%' }}>
      <DocumentSummarizer />
    </div>
  );
};

export default UploadSummarizePage;
