import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { Card, Button, Alert } from '../components/UI';

const HomePage = () => {
  const { documents, summaries, qaResults, history } = useAppStore();
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalSummaries: 0,
    totalQuestions: 0,
    totalSearches: 0,
  });

  useEffect(() => {
    setStats({
      totalDocuments: documents.length,
      totalSummaries: Object.keys(summaries).length,
      totalQuestions: qaResults.length,
      totalSearches: history.filter((h) => h.type === 'search').length,
    });
  }, [documents, summaries, qaResults, history]);

  const features = [
    {
      icon: '📝',
      title: 'Summarize Papers',
      description: 'Generate concise summaries of research papers with customizable length',
      path: '/upload',
      color: 'blue',
    },
    {
      icon: '🔍',
      title: 'Search Documents',
      description: 'Find relevant papers with advanced filtering and ranking',
      path: '/search',
      color: 'purple',
    },
    {
      icon: '❓',
      title: 'Ask Questions',
      description: 'Get instant answers from your documents using AI',
      path: '/qa',
      color: 'green',
    },
    {
      icon: '📋',
      title: 'View History',
      description: 'Access all your previous queries and results',
      path: '/history',
      color: 'orange',
    },
  ];

  const recentActivity = history.slice(0, 5);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Research Paper Summarizer & QA System
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Upload research papers, generate intelligent summaries, ask questions, and discover related documents.
          All powered by advanced AI and natural language processing.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/upload">
            <Button variant="primary" size="lg">
              📤 Upload & Summarize
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" size="lg">
              🔍 Search Papers
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDocuments}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSummaries}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Summaries</p>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800">
            <div className="text-4xl mb-2">❓</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-800">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSearches}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Searches</p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <Button variant="outline" size="sm" fullWidth>
                  Get Started →
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <Card>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.type === 'summary' && '📝 Generated Summary'}
                      {item.type === 'qa' && '❓ Asked Question'}
                      {item.type === 'search' && '🔍 Searched'}
                      {item.type === 'upload' && '📤 Uploaded'}
                      {' - '}
                      <span className="text-gray-600 dark:text-gray-400">{item.title || item.query}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(item.timestamp).toLocaleDateString()} at{' '}
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${item.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      item.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-800 rounded-lg p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6 opacity-90">
          Upload your first research paper and discover the power of intelligent document analysis.
        </p>
        <Link to="/upload">
          <Button variant="primary" size="lg" className="bg-white dark:bg-gray-200 text-blue-600">
            Start Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
