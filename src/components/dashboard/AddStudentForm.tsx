import { useState } from 'react';
import { UserPlus, Info, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

const LANGUAGE_LEVELS = [
  {
    level: 'A1',
    name: 'Beginner',
    description: 'Can understand and use basic phrases, introduce themselves, and ask simple questions.'
  },
  {
    level: 'A2',
    name: 'Elementary',
    description: 'Can communicate in simple tasks, describe their background, and handle basic social interactions.'
  },
  {
    level: 'B1',
    name: 'Intermediate',
    description: 'Can handle most travel situations, express opinions, and discuss familiar topics with reasonable fluency.'
  },
  {
    level: 'B2',
    name: 'Upper Intermediate',
    description: 'Can understand complex texts, interact fluently with native speakers, and produce detailed content.'
  },
  {
    level: 'C1',
    name: 'Advanced',
    description: 'Can understand demanding texts, express ideas fluently, and use language flexibly for social and professional purposes.'
  },
  {
    level: 'C2',
    name: 'Mastery',
    description: 'Can understand virtually everything heard or read, summarize information, and express themselves very fluently.'
  }
];

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Japanese',
  'Chinese',
  'Korean',
  'Russian'
];

export default function AddStudentForm({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    language: '',
    level: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await user?.getIdToken();
      
      const response = await fetch('/api/students/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      // Success! Go back to dashboard
      onBack();
      
    } catch (error) {
      console.error('Error adding student:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-8 bg-[#f8f9fc]">
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-gray-600 mb-6 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 text-[#396afc] mb-4">
            <UserPlus className="w-4 h-4 mr-2" />
            <span>New Student Registration</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
          <p className="mt-2 text-gray-500">Enter your student's details to create their profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language Learning</label>
            <select
              name="language"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
              onChange={handleChange}
            >
              <option value="" className="bg-[#396afc]">Select a language</option>
              {LANGUAGES.map(language => (
                <option key={language} value={language} className="bg-[#396afc]">{language}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Level</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {LANGUAGE_LEVELS.map(({ level, name }) => (
                <button
                  key={level}
                  type="button"
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    selectedLevel === level
                      ? 'border-[#396afc] bg-blue-50 text-[#396afc]'
                      : 'border-gray-200 hover:border-[#396afc] text-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedLevel(level);
                    setFormData(prev => ({ ...prev, level }));
                  }}
                >
                  <div className="font-bold text-lg">{level}</div>
                  <div className="text-sm text-gray-500">{name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f1f3f9] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-[#396afc]" />
              <h3 className="font-semibold text-gray-900">Level Description</h3>
            </div>
            <p className="text-gray-600">
              {selectedLevel
                ? LANGUAGE_LEVELS.find(l => l.level === selectedLevel)?.description
                : 'Select a level to see its description'}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#396afc] text-white hover:bg-[#2948ff] font-satoshi-bold rounded-full flex items-center justify-center gap-2 py-6"
          >
            <UserPlus className="w-5 h-5" />
            Create Student Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
