import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message-container">
      <div className="error-content">
        <h2>⚠️ Error</h2>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
