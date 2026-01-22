const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    topic: { type: String, required: true },
    solvedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// ✅ prevent duplicate solved for same user + question
progressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
