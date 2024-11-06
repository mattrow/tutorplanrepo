import { useState, useEffect } from 'react';
import { UserPlus, Info, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LANGUAGE_LEVELS = [
  {
    level: 'A1',
    name: 'Beginner',
    description: `
**At this level**, students can understand and use _very basic expressions_ and phrases aimed at the satisfaction of needs of a concrete type. They can introduce themselves and others, ask and answer questions about personal details such as where they live and people they know. They can interact in a simple way provided the other person talks slowly and clearly.

**Possible questions to test fluency:**
- Can you introduce yourself and tell me where you're from?
- What is your favorite color or food?
- Can you count from one to ten?
`
  },
  {
    level: 'A2',
    name: 'Elementary',
    description: `
**Students can understand sentences and frequently used expressions** related to areas of most immediate relevance (e.g., basic personal and family information, shopping, local geography, employment). They can communicate in simple and routine tasks requiring a direct exchange of information on familiar and routine matters.

**Possible questions to test fluency:**
- Can you describe your daily routine?
- Tell me about your family or friends.
- How do you spend your free time?
`
  },
  {
    level: 'B1',
    name: 'Intermediate',
    description: `
**Students can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.** They can deal with most situations likely to arise while traveling in an area where the language is spoken. They can produce simple connected text on topics which are familiar or of personal interest.

**Possible questions to test fluency:**
- What did you do on your last vacation?
- Can you discuss your favorite book or movie?
- What are your plans for the future?
`
  },
  {
    level: 'B2',
    name: 'Upper Intermediate',
    description: `
**Students can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.** They can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.

**Possible questions to test fluency:**
- Can you compare and contrast two different cultures?
- Discuss the advantages and disadvantages of modern technology.
- What issues do you think are important in today's society?
`
  },
  {
    level: 'C1',
    name: 'Advanced',
    description: `
**Students can understand a wide range of demanding, longer texts, and recognize implicit meaning.** They can express ideas fluently and spontaneously without much obvious searching for expressions. They can use language flexibly and effectively for social, academic, and professional purposes.

**Possible questions to test fluency:**
- Analyze the impact of globalization on local economies.
- Discuss ethical dilemmas in modern science.
- How does literature reflect societal changes?
`
  },
  {
    level: 'C2',
    name: 'Mastery',
    description: `
**Students can understand with ease virtually everything heard or read.** They can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation. They can express themselves spontaneously, very fluently, and precisely, differentiating finer shades of meaning even in more complex situations.

**Possible questions to test fluency:**
- Critically evaluate a philosophical argument or theory.
- Discuss the implications of recent political events on global relations.
- How do you perceive the relationship between art and human psychology?
`
  }
];

const LANGUAGES = ['English', 'Portuguese'];

const NATIVE_LANGUAGES = [
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
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nativeLanguage: '',
    language: '',
    level: '',
    startDate: ''
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkStudentLimit = async () => {
      const token = await user?.getIdToken();
      const response = await fetch('/api/students/count', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch student count');
        return;
      }
      const data = await response.json();
      const { count, role } = data;
      if (role === 'Free User' && count >= 5) {
        router.push('/checkout'); // Redirect to checkout page
      }
    };
    if (user) {
      checkStudentLimit();
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
  
      const data = await response.json();
      const { studentId } = data;
  
      router.push(`/dashboard/student/${studentId}`);
      
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Native Language</label>
            <select
              name="nativeLanguage"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
              onChange={handleChange}
            >
              <option value="">Select a language</option>
              {NATIVE_LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language Learning</label>
            <select
              name="language"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
              onChange={handleChange}
            >
              <option value="">Select a language</option>
              {LANGUAGES.map(language => (
                <option key={language} value={language}>{language}</option>
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
            {selectedLevel ? (
              <ReactMarkdown className="prose text-gray-600">
                {LANGUAGE_LEVELS.find(l => l.level === selectedLevel)?.description || ''}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-600">Select a level to see its description</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => {
                setStartDate(date);
                if (date) {
                  setFormData({ ...formData, startDate: date.toISOString() });
                }
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc] text-gray-900"
              placeholderText="Select start month and year"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#396afc] text-white hover:bg-[#396afc]/90 font-satoshi-bold rounded-full flex items-center justify-center gap-2 py-6 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                Creating Profile...
                <svg
                  className="w-4 h-4 ml-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Student Profile
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
