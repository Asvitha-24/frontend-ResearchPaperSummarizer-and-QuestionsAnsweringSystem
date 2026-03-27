import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { askQuestion } from '../services/api';

// Note: Using the renamed function for clarity
// This will call the backend /api/answer endpoint with question and context
import { Card, Button, Spinner, Alert, FormGroup } from '../components/UI';
import { QAInterface, AnswerDisplay } from '../components/SpecializedComponents';

const QAPage = () => {
  const { documents, currentDocument, setCurrentDocument, addQAResult, addToHistory, loading, setLoading } = useAppStore();
  const [answer, setAnswer] = useState(null);
  const [qaHistory, setQAHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleAskQuestion = async (question, documentId, contextType) => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Get document content from the documents list
      const doc = documents.find(d => d.id === documentId);
      if (!doc) {
        throw new Error('Document not found. Please select a valid document.');
      }
      
      // Use the document content or extracted text
      const documentContent = doc.extracted_text || doc.content || doc.text || '';
      if (!documentContent || documentContent.trim().length === 0) {
        throw new Error('Document content is empty. Please upload and process a document first.');
      }

      console.log('🔍 Calling API with question and context...');
      
      // Call the real API with proper parameters
      const result = await askQuestion(documentId, question, documentContent);

      // Parse the API response
      const answerData = {
        id: Date.now().toString(),
        question,
        answer: result.answer || result.full_result?.answer || 'No answer found',
        confidence: Math.round((result.score || 0) * 100),
        processingTime: result.processingTime || 1.2,
        location: result.location || { page: 0, position: 'unknown' },
        context: documentContent,
        documentId,
      };

      console.log('✅ Got answer:', answerData);

      setAnswer(answerData);
      setQAHistory((prev) => [answerData, ...prev]);

      addQAResult({
        id: answerData.id,
        question,
        answer: answerData.answer,
        confidence: answerData.confidence,
        documentId,
      });

      addToHistory({
        id: answerData.id,
        type: 'qa',
        query: question,
        status: 'success',
      });
    } catch (err) {
      console.error('❌ Error in QA:', err);
      setError(err.message || 'Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ask Questions</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get instant answers from your research papers using AI
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert
          type="error"
          title="Error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {documents.length === 0 ? (
        <Alert
          type="info"
          title="No Documents"
          message="Upload a document first to ask questions about it. Go to Upload & Summarize to get started."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main QA Interface */}
          <div className="lg:col-span-2">
            <QAInterface
              documents={documents}
              onAskQuestion={handleAskQuestion}
              loading={loading}
            />

            {/* Answer Display */}
            {answer && (
              <div className="mt-8">
                <AnswerDisplay
                  answer={answer.answer}
                  confidence={answer.confidence}
                  processingTime={answer.processingTime}
                  location={answer.location}
                />
              </div>
            )}

            {/* Related Questions */}
            {answer && (
              <Card className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Suggested Follow-up Questions
                </h3>
                <div className="space-y-2">
                  {[
                    'Can you elaborate on the methodology?',
                    'What are the main limitations?',
                    'How does this compare to related work?',
                    'What are the future directions?',
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskQuestion(suggestion, documents[0].id, 'full')}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors text-gray-900 dark:text-white text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* QA History Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Question History
              </h3>

              {qaHistory.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask your first question to see history here
                </p>
              ) : (
                <div className="space-y-3">
                  {qaHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                      onClick={() => setAnswer(item)}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {item.question}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Confidence: {item.confidence}%
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Tips */}
            <Card className="mt-6 bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-800">
              <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-3">
                💡 Tips
              </h4>
              <ul className="space-y-2 text-xs text-purple-900 dark:text-purple-200">
                <li>• Be specific in your questions</li>
                <li>• Use technical terms if available</li>
                <li>• Ask follow-up questions for clarity</li>
                <li>• Check confidence scores</li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAPage;
