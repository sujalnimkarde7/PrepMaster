import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function AptitudeTests() {
  const navigate = useNavigate();

  const handleTestClick = (testId: number) => {
    navigate(`/aptitude-tests/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Aptitude Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aptitudeTests.map((test) => (
            <div 
              key={test.id}
              onClick={() => handleTestClick(test.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{test.title}</h2>
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
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {test.duration}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {test.questions} questions
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{test.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 