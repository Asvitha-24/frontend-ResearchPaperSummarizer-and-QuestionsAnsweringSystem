/**
 * Formatting utilities
 */

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const formatDate = (dateString, format = 'short') => {
  const date = new Date(dateString);

  if (format === 'short') {
    return date.toLocaleDateString();
  } else if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } else if (format === 'time') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (format === 'datetime') {
    return date.toLocaleString();
  }

  return date.toString();
};

export const formatText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const truncateLines = (text, lines = 3) => {
  return text.split('\n').slice(0, lines).join('\n');
};

export const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const extractPreview = (text, length = 200) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Validation utilities
 */

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidFile = (file, acceptedTypes = ['application/pdf', 'text/plain']) => {
  return acceptedTypes.includes(file.type);
};

export const validateForm = (values, schema) => {
  const errors = {};

  Object.keys(schema).forEach((key) => {
    const rule = schema[key];
    const value = values[key];

    if (rule.required && (!value || value.trim() === '')) {
      errors[key] = `${rule.label || key} is required`;
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[key] = `${rule.label || key} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[key] = `${rule.label || key} must be at most ${rule.maxLength} characters`;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[key] = rule.patternMessage || `${rule.label || key} format is invalid`;
    }

    if (rule.custom && !rule.custom(value)) {
      errors[key] = rule.customMessage || `${rule.label || key} is invalid`;
    }
  });

  return errors;
};

/**
 * Data transformation utilities
 */

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterByDate = (items, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return items.filter((item) => {
    const itemDate = new Date(item.date || item.timestamp);
    return itemDate >= start && itemDate <= end;
  });
};

export const removeDuplicates = (array, key = 'id') => {
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
};

/**
 * API response helpers
 */

export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'No response from server. Please check your connection.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

export const formatApiResponse = (data, transformFn = null) => {
  if (!data) return null;
  return transformFn ? transformFn(data) : data;
};

/**
 * String utilities
 */

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const camelToTitle = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
};

/**
 * Array utilities
 */

export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const flatten = (array) => {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

export const unique = (array, key = null) => {
  if (!key) return [...new Set(array)];
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
};

/**
 * Object utilities
 */

export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const omit = (obj, keys) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

export const deepMerge = (target, source) => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

/**
 * Math utilities
 */

export const calculatePercentage = (value, total) => {
  return total === 0 ? 0 : Math.round((value / total) * 100);
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const roundTo = (value, decimals = 2) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
