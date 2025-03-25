import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const codingChallenges = [
  {
    id: 1,
    title: "Arrays & Strings",
    description: "Practice problems involving array manipulation, string operations, and basic data structures.",
    problems: 15,
    difficulty: "Easy",
    topics: ["Arrays", "Strings", "Hash Maps"]
  },
  {
    id: 2,
    title: "Trees & Graphs",
    description: "Solve complex problems related to tree traversal, graph algorithms, and path finding.",
    problems: 20,
    difficulty: "Hard",
    topics: ["Binary Trees", "Graphs", "DFS", "BFS"]
  },
  {
    id: 3,
    title: "Dynamic Programming",
    description: "Master dynamic programming concepts with problems on optimization and memoization.",
    problems: 18,
    difficulty: "Hard",
    topics: ["DP", "Recursion", "Memoization"]
  },
  {
    id: 4,
    title: "System Design",
    description: "Practice designing scalable systems and solving real-world engineering problems.",
    problems: 12,
    difficulty: "Medium",
    topics: ["Architecture", "Scalability", "Databases"]
  }
];

export default function CodingChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  
  const challenge = codingChallenges.find(c => c.id === Number(id));

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Challenge Not Found</h1>
          <button
            onClick={() => navigate('/coding-challenges')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Challenges
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{challenge.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              challenge.difficulty === "Easy" 
                ? "bg-green-100 text-green-800" 
                : challenge.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {challenge.difficulty}
            </span>
          </div>
          
          <div className="mb-6">
            <span className="text-gray-500 dark:text-gray-400">
              Problems: {challenge.problems}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">{challenge.description}</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Topics Covered</h2>
            <div className="flex flex-wrap gap-2">
              {challenge.topics.map((topic, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsStarting(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Challenge
            </button>
            <button
              onClick={() => navigate('/coding-challenges')}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back to Challenges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 