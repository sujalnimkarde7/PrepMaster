import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Target } from 'lucide-react';

const aptitudeTests = [
  {
    id: '1',
    title: 'Quantitative Aptitude Test',
    description: 'Test your mathematical and problem-solving skills with this comprehensive quantitative aptitude test.',
    duration: '25 minutes',
    questions: 25,
    difficulty: 'Medium',
    topics: ['Arithmetic', 'Algebra', 'Geometry', 'Data Interpretation']
  },
  {
    id: '2',
    title: 'Logical Reasoning Test',
    description: 'Enhance your analytical and logical thinking abilities with this challenging reasoning test.',
    duration: '25 minutes',
    questions: 25,
    difficulty: 'Medium',
    topics: ['Pattern Recognition', 'Syllogisms', 'Coding-Decoding', 'Series Completion']
  },
  {
    id: '3',
    title: 'Verbal Ability Test',
    description: 'Improve your language and communication skills with this verbal ability assessment.',
    duration: '25 minutes',
    questions: 25,
    difficulty: 'Medium',
    topics: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Sentence Correction']
  },
  {
    id: '4',
    title: 'Data Interpretation Test',
    description: 'Master your data analysis and interpretation skills with this practical test.',
    duration: '25 minutes',
    questions: 25,
    difficulty: 'Medium',
    topics: ['Tables', 'Graphs', 'Charts', 'Data Analysis']
  }
];

export default function AptitudeTestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = aptitudeTests.find(test => test.id === id);

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Test Not Found
          </h2>
          <button
            onClick={() => navigate('/aptitude-tests')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/aptitude-tests')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {test.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {test.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-medium text-gray-900 dark:text-white">{test.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                <p className="font-medium text-gray-900 dark:text-white">{test.questions}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                <p className="font-medium text-gray-900 dark:text-white">{test.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Topics Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {test.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/aptitude-test')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 