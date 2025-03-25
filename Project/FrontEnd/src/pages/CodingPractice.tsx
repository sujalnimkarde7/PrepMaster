import React from 'react';

const codingExercises = [
  {
    id: 1,
    title: "FizzBuzz",
    description: "Write a program that prints the numbers from 1 to 100. But for multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'. For numbers that are multiples of both three and five print 'FizzBuzz'.",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Calculate Factorial",
    description: "Write a function that calculates the factorial of a number.",
    difficulty: "Medium"
  }
];

export default function CodingPractice() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Coding Practice</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingExercises.map((exercise) => (
            <div 
              key={exercise.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{exercise.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  exercise.difficulty === "Easy" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{exercise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}