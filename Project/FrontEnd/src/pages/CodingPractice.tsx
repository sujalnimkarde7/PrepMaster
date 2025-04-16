import React, { useEffect, useState } from 'react';
import { Code2, Globe } from 'lucide-react';
import { progressService } from '../services/progressService';
import ProblemStatusButton from '../components/ProblemStatusButton';

const dsaTopics = [
  {
    id: 1,
    title: "Arrays",
    description: "Practice array manipulation and common array-based problems",
    questions: [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/" }
        ]
      },
      {
        id: 2,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/stock-buy-sell/" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Linked Lists",
    description: "Master linked list operations and common problems",
    questions: [
      {
        id: 1,
        title: "Reverse Linked List",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/reverse-a-linked-list/" }
        ]
      },
      {
        id: 2,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Trees",
    description: "Solve tree traversal and manipulation problems",
    questions: [
      {
        id: 1,
        title: "Invert Binary Tree",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/invert-binary-tree/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/" }
        ]
      },
      {
        id: 2,
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Dynamic Programming",
    description: "Learn and practice dynamic programming concepts",
    questions: [
      {
        id: 1,
        title: "Climbing Stairs",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/count-ways-reach-nth-stair/" }
        ]
      },
      {
        id: 2,
        title: "House Robber",
        difficulty: "Medium",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/house-robber/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/find-maximum-possible-stolen-value-houses/" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Stack & Queue",
    description: "Practice stack and queue operations and their applications",
    questions: [
      {
        id: 1,
        title: "Valid Parentheses",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/valid-parentheses/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/" }
        ]
      },
      {
        id: 2,
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/implement-queue-using-stacks/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/queue-using-stacks/" }
        ]
      },
      {
        id: 3,
        title: "Min Stack",
        difficulty: "Medium",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/min-stack/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/" }
        ]
      },
      {
        id: 4,
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        platforms: [
          { name: "LeetCode", url: "https://leetcode.com/problems/sliding-window-maximum/" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/" }
        ]
      }
    ]
  }
];

export default function CodingPractice() {
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const solved = await progressService.getSolvedProblems();
        setSolvedProblems(new Set(solved.map(problem => problem.problemId)));
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedProblems();
  }, []);

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleStatusChange = (problemId: string, solved: boolean) => {
    setSolvedProblems(prev => {
      const newSet = new Set(prev);
      if (solved) {
        newSet.add(problemId);
      } else {
        newSet.delete(problemId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Data Structures & Algorithms Practice</h1>
        <div className="space-y-8">
          {dsaTopics.map((topic) => (
            <div key={topic.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>
              
              <div className="space-y-4">
                {topic.questions.map((question) => (
                  <div 
                    key={question.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-4">
                        <ProblemStatusButton
                          problemId={`${topic.id}-${question.id}`}
                          problemName={question.title}
                          difficulty={question.difficulty as 'Easy' | 'Medium' | 'Hard'}
                          initialStatus={solvedProblems.has(`${topic.id}-${question.id}`)}
                          onStatusChange={(solved) => handleStatusChange(`${topic.id}-${question.id}`, solved)}
                        />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question.title}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        question.difficulty === "Easy" 
                          ? "bg-green-100 text-green-800" 
                          : question.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {question.platforms.map((platform, index) => (
                        <button
                          key={index}
                          onClick={() => handlePlatformClick(platform.url)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          {platform.name === "LeetCode" ? (
                            <Code2 className="h-4 w-4" />
                          ) : (
                            <Globe className="h-4 w-4" />
                          )}
                          {platform.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}