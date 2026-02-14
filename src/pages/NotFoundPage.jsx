import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/UI';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          404
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            ← Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

