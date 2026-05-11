import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { Card, Button, Alert } from '../components/UI';

const HomePage = () => {
  const { documents, summaries, qaResults } = useAppStore();
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalSummaries: 0,
    totalQuestions: 0,
  });

  useEffect(() => {
    setStats({
      totalDocuments: documents.length,
      totalSummaries: Object.keys(summaries).length,
      totalQuestions: qaResults.length,
    });
  }, [documents, summaries, qaResults]);

  const features = [
    {
      icon: '📝',
      title: 'Summarize Papers',
      description: 'Generate concise summaries of research papers with customizable length',
      path: '/upload',
      color: 'blue',
    },
    {
      icon: '❓',
      title: 'Ask Questions',
      description: 'Get instant answers from your documents using AI',
      path: '/qa',
      color: 'green',
    },
  ];


  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          Upload research papers, generate intelligent summaries, ask questions
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/upload">
            <Button variant="primary" size="lg">
              📤 Upload & Summarize
            </Button>
          </Link>
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
