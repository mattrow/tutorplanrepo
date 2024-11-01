import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, ThumbsUp, Sparkles } from 'lucide-react';
import { db } from '@/firebase/config';
import { collection, addDoc, updateDoc, doc, arrayUnion, arrayRemove, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth hook

interface Feedback {
  id: string;
  title: string;
  description: string;
  votes: number;
  date: string;
  upvoters: string[];
}

export default function SuggestionsPage() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'suggestions'), orderBy('votes', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const suggestionsData: Feedback[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Feedback, 'id'>;
        suggestionsData.push({
          id: doc.id,
          ...data,
        });
      });
      setFeedbacks(suggestionsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Ensure user is logged in

    try {
      const newFeedback = {
        title,
        description,
        votes: 1,
        date: new Date().toISOString().split('T')[0],
        upvoters: [user.uid], // Auto-upvote by the author
      };

      await addDoc(collection(db, 'suggestions'), newFeedback);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding suggestion:', error);
    }
  };

  const handleVote = async (id: string, upvoters: string[]) => {
    if (!user) return; // Ensure user is logged in

    const suggestionRef = doc(db, 'suggestions', id);

    if (upvoters.includes(user.uid)) {
      // User has already upvoted; remove upvote
      await updateDoc(suggestionRef, {
        votes: upvoters.length - 1,
        upvoters: arrayRemove(user.uid),
      });
    } else {
      // User has not upvoted; add upvote
      await updateDoc(suggestionRef, {
        votes: upvoters.length + 1,
        upvoters: arrayUnion(user.uid),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-12">
          <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-900">TutorPlan Suggestions</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquarePlus className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-blue-900">Submit Suggestion</h2>
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
                Submit Suggestion
              </button>
            </form>
          </div>

          {/* Feedback List */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <ThumbsUp className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-blue-900">Community Suggestions</h2>
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
                      onClick={() => handleVote(feedback.id, feedback.upvoters)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${
                        feedback.upvoters.includes(user?.uid ?? '') ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                      } transition`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{feedback.votes}</span>
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