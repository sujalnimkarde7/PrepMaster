import React from 'react';

const mockInterviews = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Practice fundamental DSA concepts with common interview questions. Topics include arrays, linked lists, trees, and graphs.",
    duration: "45 mins",
    difficulty: "Medium",
    type: "Technical"
  },
  {
    id: 2,
    title: "System Design",
    description: "Mock interview focusing on system design principles, scalability, and architecture decisions.",
    duration: "60 mins",
    difficulty: "Hard",
    type: "Technical"
  },
  {
    id: 3,
    title: "Behavioral Interview",
    description: "Practice common behavioral questions about your experience, teamwork, and problem-solving approach.",
    duration: "30 mins",
    difficulty: "Easy",
    type: "Behavioral"
  },
  {
    id: 4,
    title: "Frontend Development",
    description: "Interview focused on React, JavaScript, and web development best practices.",
    duration: "45 mins",
    difficulty: "Medium",
    type: "Technical"
  }
];

export default function MockInterviews() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mock Interviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInterviews.map((interview) => (
            <div 
              key={interview.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{interview.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  interview.difficulty === "Easy" 
                    ? "bg-green-100 text-green-800" 
                    : interview.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {interview.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {interview.duration}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {interview.type}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{interview.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}