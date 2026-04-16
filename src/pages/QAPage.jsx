import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { askQuestion } from '../services/api';

// Note: Using the renamed function for clarity
// This will call the backend /api/answer endpoint with question and context
import { Card, Button, Spinner, Alert, FormGroup } from '../components/UI';
import { QAInterface, AnswerDisplay } from '../components/SpecializedComponents';

const QAPage = () => {
  const { documents, currentDocument, setCurrentDocument, addQAResult, addToHistory, loading, setLoading, addDocument } = useAppStore();
  const [answer, setAnswer] = useState(null);
  const [qaHistory, setQAHistory] = useState([]);
  const [error, setError] = useState(null);

  // Load sample document if no documents exist
  useEffect(() => {
    if (documents.length === 0) {
      console.log('📄 Loading sample document for testing...');
      const sampleDoc = {
        id: 'sample-1',
        name: 'RP 01.pdf',
        title: 'RP 01.pdf',
        extracted_text: `Paris is the capital and largest city of France. It is located in the north-central part of the country along the Seine River. Paris has been a major center of human activity and commerce for nearly 2,000 years. It is a leading global city with strengths in art, fashion, gastronomy, education, and culture. 

The city is famous for the Eiffel Tower, one of the most recognized monuments in the world. Other notable landmarks include Notre-Dame Cathedral, the Louvre Museum, and the Arc de Triomphe. Paris is known for its romantic ambiance and is often called the "City of Love."

Machine learning is a subset of artificial intelligence (AI) that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning involves training on labeled data. Unsupervised learning finds patterns in unlabeled data. Reinforcement learning trains agents to make decisions through rewards and penalties.

Machine learning applications include image recognition, natural language processing, recommendation systems, autonomous vehicles, and medical diagnosis. The field is rapidly evolving with advances in deep learning and neural networks.`,
        type: 'pdf',
        uploadDate: new Date().toISOString(),
        size: '1.2 MB',
      };
      
      addDocument(sampleDoc);
      console.log('✅ Sample document loaded');
    }
  }, [documents.length, addDocument]);

  const handleAskQuestion = async (question, documentId, contextType) => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Get document content from the documents list
      const doc = documents.find(d => d.id === documentId);
      if (!doc) {
        throw new Error('❌ Document not found. Please select a valid document from the list.');
      }
      
      // Use the document content or extracted text
      const documentContent = doc.extracted_text || doc.content || doc.text || '';
      
      // **LOOPHOLE FIX #1: Better document validation**
      if (!documentContent || documentContent.trim().length === 0) {
        console.error('Document validation failed:', {
          docId: doc.id,
          docName: doc.name,
          hasExtractedText: !!doc.extracted_text,
          hasContent: !!doc.content,
          hasText: !!doc.text,
          contentLength: documentContent.length
        });
        throw new Error(`📄 Document "${doc.name}" has no content. Please upload a document with text content first.`);
      }

      console.log('🔍 Calling API with question and context...', {
        question: question.substring(0, 50),
        contextLength: documentContent.length,
        docId: documentId
      });
      
      // Call the real API with proper parameters
      let result;
      try {
        result = await askQuestion(documentId, question, documentContent);
      } catch (apiError) {
        // **LOOPHOLE FIX #2: Show specific API errors**
        console.error('API Error details:', {
          status: apiError.response?.status,
          message: apiError.message,
          data: apiError.response?.data
        });
        throw new Error(`🔌 API Error: ${apiError.message}`);
      }

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
      setError(err.message || 'Failed to get answer. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ask Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant answers from your research papers using AI
          </p>
        </div>
        <div className="flex gap-2">
          {documents.length === 0 && (
            <Button
              onClick={() => {
                const sampleDoc = {
                  id: 'sample-1',
                  name: 'RP 01.pdf',
                  title: 'RP 01.pdf',
                  extracted_text: `Paris is the capital and largest city of France. It is located in the north-central part of the country along the Seine River. Paris has been a major center of human activity and commerce for nearly 2,000 years. It is a leading global city with strengths in art, fashion, gastronomy, education, and culture. 

The city is famous for the Eiffel Tower, one of the most recognized monuments in the world. Other notable landmarks include Notre-Dame Cathedral, the Louvre Museum, and the Arc de Triomphe. Paris is known for its romantic ambiance and is often called the "City of Love."

Machine learning is a subset of artificial intelligence (AI) that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning involves training on labeled data. Unsupervised learning finds patterns in unlabeled data. Reinforcement learning trains agents to make decisions through rewards and penalties.

Machine learning applications include image recognition, natural language processing, recommendation systems, autonomous vehicles, and medical diagnosis. The field is rapidly evolving with advances in deep learning and neural networks.`,
                  type: 'pdf',
                  uploadDate: new Date().toISOString(),
                  size: '1.2 MB',
                };
                addDocument(sampleDoc);
              }}
              variant="outline"
              size="sm"
            >
              📄 Load Sample Document
            </Button>
          )}
        </div>
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
