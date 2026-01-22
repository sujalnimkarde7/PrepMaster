import API from "./api";

export const markSolved = (data) => API.post("/progress/solve", data);
export const getProgressStats = (userId) =>
  API.get(`/progress/stats?userId=${userId}`);
export const getSolvedQuestions = (userId) =>
  API.get(`/progress/solved?userId=${userId}`);
