const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },      // Arrays, Strings, DP...
    company: { type: String, required: true },    // Amazon, TCS...
    link: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
