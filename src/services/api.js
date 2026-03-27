import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,  // Increased to 60 seconds for heavy operations like summarization
});

// Add interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.message, error.response?.status);
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
 * Generate summary for text content
 * @param {string} text - The text to summarize
 * @param {object} options - Options (maxLength, minLength)
 */
export const generateSummary = async (text, options = {}) => {
  try {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw new Error('Text content is required for summarization');
    }

    const payload = {
      text: text.trim(),
      max_length: options.maxLength || 150,
      min_length: options.minLength || 50,
    };

    console.log('📤 Sending to /summarize:', { 
      textLength: payload.text.length, 
      maxLength: payload.max_length,
      minLength: payload.min_length 
    });

    const response = await apiClient.post(`/summarize`, payload);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to generate summary';
    console.error('❌ Summary API error:', errorMsg);
    throw new Error(errorMsg);
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
 * Ask a question about document content
 * @param {string} question - The question to ask
 * @param {string} context - The document content/context to answer from
 */
export const askQuestionAboutContent = async (question, context) => {
  try {
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      throw new Error('Question is required');
    }
    if (!context || typeof context !== 'string' || context.trim().length === 0) {
      throw new Error('Document context is required');
    }

    console.log('📤 Asking question to /answer endpoint:', {
      questionLength: question.length,
      contextLength: context.length,
    });

    const response = await apiClient.post(`/answer`, {
      question: question.trim(),
      context: context.trim(),
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to answer question';
    console.error('❌ Q&A API error:', errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Ask a question about a document using the /answer endpoint
 */
export const askQuestion = async (documentId, question, documentContent) => {
  try {
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      throw new Error('Question is required');
    }
    if (!documentContent || typeof documentContent !== 'string' || documentContent.trim().length === 0) {
      throw new Error('Document content is required');
    }

    console.log('📤 Calling /answer endpoint:', {
      questionLength: question.length,
      contentLength: documentContent.length,
    });

    const response = await apiClient.post(`/answer`, {
      question: question.trim(),
      context: documentContent.trim(),
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to answer question';
    console.error('❌ Q&A API error:', errorMsg);
    throw new Error(errorMsg);
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

// ==================== SEARCH ====================

/**
 * Search across documents
 */
export const searchDocuments = async (query, filters = {}) => {
  try {
    const response = await apiClient.get('/search', {
      params: {
        q: query,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        relevanceThreshold: filters.relevanceThreshold || 0,
        category: filters.category,
        sortBy: filters.sortBy || 'relevance',
        limit: filters.limit || 20,
        offset: filters.offset || 0,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search documents');
  }
};

/**
 * Legacy search papers endpoint
 */
export const searchPapers = async (query) => {
  try {
    const response = await apiClient.get('/papers/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search papers');
  }
};

/**
 * Get paper by ID
 */
export const getPaperById = async (paperId) => {
  try {
    const response = await apiClient.get(`/papers/${paperId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch paper');
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

// Summarization Service
export const summarizePaper = async (paperId, content) => {
  try {
    const response = await apiClient.post('/summarize', {
      paper_id: paperId,
      content: content,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to summarize paper');
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
