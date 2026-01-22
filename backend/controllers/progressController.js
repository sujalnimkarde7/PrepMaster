const mongoose = require("mongoose");
const Progress = require("../models/Progress");
const Question = require("../models/Question");

// ✅ Mark a question as solved
exports.markSolved = async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "userId and questionId are required" });
    }

    // Check question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Create progress record
    const progress = await Progress.create({
      userId,
      questionId,
      topic: question.topic,
      solvedAt: new Date()
    });

    return res.status(201).json({
      message: "Marked as solved ✅",
      progress
    });
  } catch (err) {
    // duplicate solve prevention (userId + questionId unique)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already marked solved ✅" });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get progress stats (total solved + topic wise)
exports.getProgressStats = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    // Total solved count
    const totalSolved = await Progress.countDocuments({ userId });

    // Topic wise solved count (aggregation)
    const topicWise = await Progress.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // ✅ FIXED
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return res.json({
      userId,
      totalSolved,
      topicWise
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get list of solved questions (with question details)
exports.getSolvedQuestions = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    // populate questionId -> gets question details
    const solved = await Progress.find({ userId })
      .populate("questionId")
      .sort({ solvedAt: -1 });

    return res.json({
      total: solved.length,
      solved
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
