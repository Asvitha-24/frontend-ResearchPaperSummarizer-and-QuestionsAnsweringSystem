import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <Header />
      <main className="not-found-main">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/" className="home-link">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
