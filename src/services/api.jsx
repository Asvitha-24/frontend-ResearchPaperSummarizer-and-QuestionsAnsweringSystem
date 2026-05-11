import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// ==================== DOCUMENT MANAGEMENT ====================

/**
 * Upload a document (PDF, TXT, DOCX)
 */
export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
};

/**
 * Get all documents for the current user
 */
export const getDocuments = async () => {
  try {
    const response = await apiClient.get('/documents');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch documents');
  }
};

/**
 * Get document by ID
 */
export const getDocumentById = async (documentId) => {
  try {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch document');
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (documentId) => {
  try {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete document');
  }
};

// ==================== SUMMARIZATION ====================

/**
 * Generate summary for a document
 */
export const generateSummary = async (documentId, options = {}) => {
  try {
    const response = await apiClient.post(`/summarize`, {
      documentId,
      maxLength: options.maxLength || 200,
      minLength: options.minLength || 50,
      style: options.style || 'abstractive',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate summary');
  }
};

/**
 * Get summary for a document
 */
export const getSummary = async (documentId) => {
  try {
    const response = await apiClient.get(`/summarize/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch summary');
  }
};

// ==================== QUESTION ANSWERING ====================

/**
 * Ask a question about a document
 */
export const askQuestion = async (documentId, question, documentContent) => {
  try {
    const response = await apiClient.post(`/answer`, {
      question,
      context: documentContent,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to answer question');
  }
};

/**
 * Get Q&A history for a document
 */
export const getQAHistory = async (documentId) => {
  try {
    const response = await apiClient.get(`/question-answer/${documentId}/history`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Q&A history');
  }
};

// ==================== HISTORY & SAVED RESULTS ====================

/**
 * Get user's full history
 */
export const getHistory = async () => {
  try {
    const response = await apiClient.get('/history');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch history');
  }
};

/**
 * Delete a history item
 */
export const deleteHistoryItem = async (historyId) => {
  try {
    const response = await apiClient.delete(`/history/${historyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete history item');
  }
};

/**
 * Save a result
 */
export const saveResult = async (resultData) => {
  try {
    const response = await apiClient.post('/history/save', resultData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to save result');
  }
};

/**
 * Get saved results
 */
export const getSavedResults = async () => {
  try {
    const response = await apiClient.get('/history/saved');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch saved results');
  }
};

/**
 * Unsave a result
 */
export const unsaveResult = async (resultId) => {
  try {
    const response = await apiClient.delete(`/history/saved/${resultId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to unsave result');
  }
};

// ==================== EXPORT ====================

/**
 * Export history as PDF
 */
export const exportHistoryAsPDF = async (historyIds) => {
  try {
    const response = await apiClient.post('/export/pdf', { historyIds }, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export as PDF');
  }
};

/**
 * Export history as JSON
 */
export const exportHistoryAsJSON = async (historyIds) => {
  try {
    const response = await apiClient.post('/export/json', { historyIds });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export as JSON');
  }
};

/**
 * Export history as CSV
 */
export const exportHistoryAsCSV = async (historyIds) => {
  try {
    const response = await apiClient.post('/export/csv', { historyIds }, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export as CSV');
  }
};

// Chatbot Services
export const chatWithBot = async (message, paperId, useSummary = false) => {
  try {
    const response = await apiClient.post('/chat', {
      message: message,
      paper_id: paperId,
      use_summary: useSummary,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get chatbot response');
  }
};

export default apiClient;
