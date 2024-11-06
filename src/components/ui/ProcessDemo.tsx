import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Brain,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LessonCardDemo from '../demo/LessonCardDemo';
import TopicModule from '../LessonView/TopicSections/TopicModule';
import { Card } from './card';
import { Lesson } from '@/types/lesson';

// Example data
const exampleTopic = {
  id: "demo-topic-1",
  title: "Present Perfect Tense",
  introduction: {
    explanation: "The Present Perfect tense is used to describe past actions with present consequences.",
    keyPoints: [
      "Forms with have/has + past participle",
      "Used for completed actions",
      "Connects past to present"
    ]
  },
  inDepth: "# Understanding the Present Perfect\n\nThe Present Perfect is one of the most important and most used tenses in English...",
  examples: [
    {
      context: "Talking about experience",
      correct: "I have visited Paris three times.",
      incorrect: "I have visit Paris three times.",
      explanation: "Use the past participle (visited) after have/has."
    }
  ],
  exercises: [
    {
      id: "ex1",
      question: "Complete the sentence: She ___ (never/visit) Japan.",
      type: "fill-in-blank",
      options: ["has never visited", "have never visited", "never visited"],
      hint: "Use 'has' for third person singular (she/he/it)"
    }
  ]
};

const exampleLesson = {
  id: 'demo-lesson',
  title: 'Lesson 1: Present Perfect & Travel Vocabulary',
  topics: [
    {
      id: 'topic-1',
      topicName: 'Present Perfect Tense',
      topicDescription: 'Understanding and using the present perfect tense',
      order: 1,
      status: 'not started',
      type: 'grammar',
      isUserAdded: false,
    },
    {
      id: 'topic-2',
      topicName: 'Travel Vocabulary',
      topicDescription: 'Essential vocabulary for discussing travel experiences',
      order: 2,
      status: 'not started',
      type: 'vocabulary',
      isUserAdded: false,
    },
  ],
  generated: false,
};

export default function ProcessDemo() {
  const [studentAdded, setStudentAdded] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    level: 'B1',
    language: 'English',
  });

  const handleAddStudent = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.level &&
      formData.language
    ) {
      setStudentAdded(true);
    }
  };

//   const handleGenerateLesson = () => {
//     setTimeout(() => {
//       setLessonGenerated(true);
//     }, 1000);
//   };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how TutorPlan streamlines your teaching process
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step 1: Add Student */}
          <div className="mb-16" data-animate>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#396afc] flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Add Your Student</h3>
            </div>

            <Card className="p-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: e.target.value })
                    }
                  >
                    <option value="">Select Level</option>
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Mastery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#396afc] focus:border-[#396afc]"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Portuguese">Portuguese</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={handleAddStudent}
                  className={`${
                    studentAdded
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-[#396afc] hover:bg-[#2948ff]'
                  } text-white font-satoshi-bold rounded-full flex items-center gap-2`}
                  disabled={studentAdded}
                >
                  {studentAdded ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Student Added
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      Add Student
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Step 2: Generate Lesson */}
          <div className="mb-16" data-animate>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#396afc] flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Choose Lesson Content & Generate
              </h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <LessonCardDemo lesson={exampleLesson as Lesson} />
            </div>
          </div>

          {/* Step 3: Teach Lesson */}
          <div className="mb-16" data-animate>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#396afc] flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Teach Your Lesson</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 relative">
              <div className="max-h-[500px] overflow-hidden relative">
                <TopicModule
                  topic={{
                    ...exampleTopic,
                    inDepth: `
# Understanding the Present Perfect

The Present Perfect is one of the most important and most used tenses in English. It connects the past to the present and is essential for expressing experiences, changes, and ongoing situations.

## Formation

- **Affirmative:** Subject + have/has + past participle
  - *I have visited London.*
- **Negative:** Subject + have/has + not + past participle
  - *She has not seen that movie.*
- **Interrogative:** Have/Has + subject + past participle?
  - *Have you finished your homework?*

## Usage

1. **Unspecified Time Before Now:** 
   - *I have lost my keys.*
2. **Experience:**
   - *She has traveled to Japan.*
3. **Change Over Time:**
   - *My English has improved since I moved here.*
4. **Accomplishments:**
   - *Scientists have discovered a new planet.*
5. **Multiple Actions at Different Times:**
   - *We have visited the museum several times.*

## Signal Words

- *Already, just, never, ever, so far, yet, since, for*

## Examples

- **I've just finished my lunch.**
- **They have known each other for ten years.**

Remember, the exact time is not important in the present perfect tense.
                    `
                  }}
                  status={{ completed: false, understood: null }}
                  onStatusChange={() => {}}
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>

          {/* Step 4: Generate Homework */}
          <div className="mb-16" data-animate>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#396afc] flex items-center justify-center text-white font-bold">
                4
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Generate Homework</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="max-w-3xl mx-auto bg-white shadow-lg">
                <div className="relative">
                  <div className="p-8">
                    <div className="border border-gray-200 rounded-lg p-8">
                      <h1 className="text-2xl font-bold mb-6">Present Perfect & Travel Vocabulary</h1>
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg font-semibold mb-3">Exercise 1: Fill in the Blanks</h2>
                          <p className="mb-2">Use the correct form of the present perfect tense:</p>
                          <div className="space-y-2">
                            <p>1. They _______ (finish) their homework.</p>
                            <p>2. She _______ (not/see) that movie yet.</p>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold mb-3">Exercise 2: Translation</h2>
                          <p className="mb-2">Translate the following sentences into English:</p>
                          <div className="space-y-2">
                            <p>1. Ella ha visitado España tres veces.</p>
                            <p>2. Nosotros hemos aprendido mucho este año.</p>
                          </div>
                        </div>
                        <div className="opacity-50">
                          {/* Faded out content to indicate more exercises */}
                          <h2 className="text-lg font-semibold mb-3">Exercise 3: Writing</h2>
                          <div className="space-y-2">
                            <p>1. Write a short paragraph about a recent experience using the present perfect tense.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <Button
                        className="bg-[#396afc] hover:bg-[#2948ff] text-white font-satoshi-bold rounded-full flex items-center gap-2"
                      >
                        <FileText className="w-5 h-5" />
                        Download Homework
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Track Progress */}
          <div data-animate>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#396afc] flex items-center justify-center text-white font-bold">
                5
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Track Progress</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Student Progress</h4>
                  <p className="text-gray-600">A2 → B1 Journey</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#396afc]">65%</p>
                  <p className="text-sm text-gray-600">26/40 topics completed</p>
                </div>
              </div>
              
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#396afc] transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">26</p>
                  <p className="text-sm text-green-600">Topics</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">In Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-700">8</p>
                  <p className="text-sm text-yellow-600">Topics</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Brain className="w-5 h-5" />
                    <span className="font-medium">Remaining</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">6</p>
                  <p className="text-sm text-blue-600">Topics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}