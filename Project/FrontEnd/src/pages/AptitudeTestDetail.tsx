import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const aptitudeTests = [
  {
    id: 1,
    title: "Quantitative Aptitude",
    description: "Test your mathematical skills with questions on numbers, algebra, geometry, and data interpretation.",
    duration: "30 mins",
    questions: 25,
    difficulty: "Medium"
  },
  {
    id: 2,
    title: "Verbal Ability",
    description: "Assess your English language skills with questions on reading comprehension, grammar, and vocabulary.",
    duration: "25 mins",
    questions: 20,
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Logical Reasoning",
    description: "Challenge your analytical thinking with questions on patterns, sequences, and logical deductions.",
    duration: "35 mins",
    questions: 30,
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Data Interpretation",
    description: "Practice analyzing and interpreting data from charts, graphs, and tables.",
    duration: "30 mins",
    questions: 25,
    difficulty: "Hard"
  }
];

export default function AptitudeTestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  
  const test = aptitudeTests.find(t => t.id === Number(id));

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Test Not Found</h1>
          <button
            onClick={() => navigate('/aptitude-tests')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{test.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              test.difficulty === "Easy" 
                ? "bg-green-100 text-green-800" 
                : test.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {test.difficulty}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-500 dark:text-gray-400">
              Duration: {test.duration}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              Questions: {test.questions}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">{test.description}</p>

          <div className="flex gap-4">
            <button
              onClick={() => setIsStarting(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Test
            </button>
            <button
              onClick={() => navigate('/aptitude-tests')}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 