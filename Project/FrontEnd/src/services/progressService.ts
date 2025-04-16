import { api } from './api';

export interface ProblemProgress {
  problemId: string;
  problemName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solvedAt: string;
}

export interface DailyProgress {
  date: string;
  problemsSolved: number;
}

export interface DifficultyProgress {
  name: 'Easy' | 'Medium' | 'Hard';
  solved: number;
  total: number;
  color: string;
}

// Mock data for development
let solvedProblems: ProblemProgress[] = [];

class ProgressService {
  private readonly BASE_URL = '/api/progress';

  async getSolvedProblems(): Promise<ProblemProgress[]> {
    // For development, return mock data
    return solvedProblems;
    
    // When backend is ready, uncomment this:
    // const response = await api.get(`${this.BASE_URL}/solved`);
    // return response.data;
  }

  async markProblemSolved(problem: ProblemProgress): Promise<void> {
    // For development, update mock data
    solvedProblems.push(problem);
    
    // When backend is ready, uncomment this:
    // await api.post(`${this.BASE_URL}/solved`, problem);
  }

  async markProblemUnsolved(problemId: string): Promise<void> {
    // For development, update mock data
    solvedProblems = solvedProblems.filter(p => p.problemId !== problemId);
    
    // When backend is ready, uncomment this:
    // await api.delete(`${this.BASE_URL}/solved/${problemId}`);
  }

  async getDailyProgress(days: number = 7): Promise<DailyProgress[]> {
    // For development, return mock data
    const today = new Date();
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        problemsSolved: Math.floor(Math.random() * 5)
      };
    });
    
    // When backend is ready, uncomment this:
    // const response = await api.get(`${this.BASE_URL}/daily?days=${days}`);
    // return response.data;
  }

  async getTotalSolved(): Promise<number> {
    // For development, return mock data
    return solvedProblems.length;
    
    // When backend is ready, uncomment this:
    // const response = await api.get(`${this.BASE_URL}/total`);
    // return response.data.total;
  }

  async getStatistics(): Promise<{
    totalSolved: number;
    difficultyProgress: DifficultyProgress[];
    currentStreak: number;
  }> {
    // For development, return mock data
    const totalSolved = solvedProblems.length;
    const difficultyProgress: DifficultyProgress[] = [
      { name: 'Easy', solved: solvedProblems.filter(p => p.difficulty === 'Easy').length, total: 10, color: '#00b8a3' },
      { name: 'Medium', solved: solvedProblems.filter(p => p.difficulty === 'Medium').length, total: 8, color: '#ffc01e' },
      { name: 'Hard', solved: solvedProblems.filter(p => p.difficulty === 'Hard').length, total: 5, color: '#ff375f' }
    ];
    const currentStreak = Math.floor(Math.random() * 7);
    
    return { totalSolved, difficultyProgress, currentStreak };
  }

  async getSubmissionHistory(): Promise<DailyProgress[]> {
    return this.getDailyProgress(30); // Last 30 days
  }

  async getRecentActivity(limit: number = 5): Promise<ProblemProgress[]> {
    return solvedProblems.slice(-limit);
  }
}

export const progressService = new ProgressService(); 