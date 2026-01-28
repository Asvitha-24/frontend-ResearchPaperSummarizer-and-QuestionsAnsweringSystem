import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Paper Services
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

export const getPaperById = async (paperId) => {
  try {
    const response = await apiClient.get(`/papers/${paperId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch paper');
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
