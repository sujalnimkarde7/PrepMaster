import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { progressService } from '../services/progressService';

interface ProblemStatusButtonProps {
  problemId: string;
  problemName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialStatus: boolean;
  onStatusChange: (solved: boolean) => void;
}

export default function ProblemStatusButton({
  problemId,
  problemName,
  difficulty,
  initialStatus,
  onStatusChange,
}: ProblemStatusButtonProps) {
  const [solved, setSolved] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const newStatus = !solved;
      if (newStatus) {
        await progressService.markProblemSolved({
          problemId,
          problemName,
          difficulty,
          solvedAt: new Date().toISOString(),
        });
      } else {
        await progressService.markProblemUnsolved(problemId);
      }
      setSolved(newStatus);
      onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating problem status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        relative flex items-center justify-center
        w-8 h-8 rounded-full transition-colors
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        ${solved 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
        }
      `}
      title={solved ? 'Mark as unsolved' : 'Mark as solved'}
    >
      {solved && <Check className="w-5 h-5" />}
    </button>
  );
} 