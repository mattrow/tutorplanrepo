import React, { useState } from 'react';
import { MessageSquarePlus, ThumbsUp, Sparkles } from 'lucide-react';

interface Feedback {
  id: number;
  title: string;
  description: string;
  votes: number;
  date: string;
}

export default function SuggestionsPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      title: "Dark mode support",
      description: "Add dark mode for better night viewing experience",
      votes: 24,
      date: "2024-03-10"
    },
    {
      id: 2,
      title: "Mobile app",
      description: "Create a native mobile app for better accessibility",
      votes: 18,
      date: "2024-03-09"
    }
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      title,
      description,
      votes: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setTitle('');
    setDescription('');
  };

  const handleVote = (id: number) => {
    setFeedbacks(feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, votes: feedback.votes + 1 } : feedback
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-12">
          <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-900">Feedback Board</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquarePlus className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-blue-900">Submit Feedback</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-blue-900 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                  placeholder="Enter a brief title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-900 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition h-32"
                  required
                  placeholder="Describe your suggestion in detail"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02]"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Feedback List */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <ThumbsUp className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-blue-900">Community Feedback</h2>
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 rounded-lg border border-blue-100 hover:border-blue-200 transition bg-blue-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-blue-900">{feedback.title}</h3>
                      <p className="text-sm text-blue-700 mt-1">{feedback.description}</p>
                      <span className="text-xs text-blue-500 mt-2 block">{feedback.date}</span>
                    </div>
                    <button
                      onClick={() => handleVote(feedback.id)}
                      className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full border border-blue-200 hover:border-blue-300 transition"
                    >
                      <ThumbsUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">{feedback.votes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}