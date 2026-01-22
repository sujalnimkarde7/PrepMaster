const Question = require("../models/Question");

// ✅ Add Question
exports.addQuestion = async (req, res) => {
  try {
    const { title, topic, company, link, difficulty } = req.body;

    if (!title || !topic || !company || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.create({
      title,
      topic,
      company,
      link,
      difficulty
    });

    res.status(201).json({
      message: "Question added ✅",
      question
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get All Questions + Filters
exports.getQuestions = async (req, res) => {
  try {
    const { topic, company, difficulty } = req.query;

    let filter = {};
    if (topic) filter.topic = topic;
    if (company) filter.company = company;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter).sort({ createdAt: -1 });

    res.json({
      total: questions.length,
      questions
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
