import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function CodingChallenges() {
  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: number) => {
    navigate(`/coding-challenges/${challengeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Coding Challenges</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingChallenges.map((challenge) => (
            <div 
              key={challenge.id}
              onClick={() => handleChallengeClick(challenge.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{challenge.title}</h2>
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
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {challenge.problems} problems
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.topics.map((topic, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 