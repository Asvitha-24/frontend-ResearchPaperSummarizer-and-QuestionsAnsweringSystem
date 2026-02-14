export const validateSearchQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Search query must be a non-empty string' };
  }
  if (query.trim().length < 2) {
    return { isValid: false, error: 'Search query must be at least 2 characters long' };
  }
  if (query.trim().length > 500) {
    return { isValid: false, error: 'Search query must be less than 500 characters' };
  }
  return { isValid: true };
};

export const validateChatMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message must be a non-empty string' };
  }
  if (message.trim().length < 1) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  if (message.trim().length > 1000) {
    return { isValid: false, error: 'Message must be less than 1000 characters' };
  }
  return { isValid: true };
};

export const validatePaperId = (paperId) => {
  if (!paperId || typeof paperId !== 'string') {
    return { isValid: false, error: 'Invalid paper ID' };
  }
  return { isValid: true };
};
