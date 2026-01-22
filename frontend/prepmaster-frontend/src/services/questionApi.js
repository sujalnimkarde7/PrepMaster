import API from "./api";

export const getQuestions = (params) => API.get("/questions", { params });
export const addQuestion = (data) => API.post("/questions/add", data);
