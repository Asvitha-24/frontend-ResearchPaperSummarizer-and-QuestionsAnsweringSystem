import React, { useState, useRef, useEffect } from 'react';
import { chatWithBot } from '../services/api';
import { validateChatMessage } from '../utils/validators';
import '../styles/Chatbot.css';

const Chatbot = ({ paperId, useSummary = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I can help you with questions about this research paper. What would you like to know?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateChatMessage(inputValue);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message to chat
    const userMessageObj = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessageObj]);

    setLoading(true);

    try {
      const response = await chatWithBot(userMessage, paperId, useSummary);
      const botMessage = {
        id: Date.now() + 1,
        text: response.answer || response.response || 'I could not process your question.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${err.message}. Please try again.`,
        sender: 'bot',
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>💬 AI Assistant</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.sender} ${msg.isError ? 'error' : ''}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="message message-bot loading">
            <span className="loader"></span>
            <p>Thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className="chatbot-error">{error}</div>}
      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input
          type="text"
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          className="chatbot-input"
        />
        <button type="submit" disabled={loading} className="chatbot-send-btn">
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
