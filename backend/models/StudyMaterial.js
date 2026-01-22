const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true }, // OS, DBMS, CN...
    topic: { type: String, required: true },   // Deadlock, Indexing etc.
    type: {
      type: String,
      enum: ["PDF", "Notes", "Video", "Link"],
      default: "Notes"
    },
    link: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
