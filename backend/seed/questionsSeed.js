const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

console.log("✅ Seed script started");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND ✅" : "NOT FOUND ❌");

const Question = require("../models/Question");

const questions = [
  {
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    company: "Amazon",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: "Easy",
  },
  {
    title: "Contains Duplicate",
    topic: "Arrays",
    company: "TCS",
    link: "https://leetcode.com/problems/contains-duplicate/",
    difficulty: "Easy",
  },
  {
    title: "Valid Anagram",
    topic: "Strings",
    company: "Infosys",
    link: "https://leetcode.com/problems/valid-anagram/",
    difficulty: "Easy",
  },
  {
    title: "Valid Parentheses",
    topic: "Stack",
    company: "Wipro",
    link: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
  },
  {
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    company: "Accenture",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: "Easy",
  },
  {
    title: "Reverse Linked List",
    topic: "Linked List",
    company: "Microsoft",
    link: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: "Easy",
  },
  {
    title: "Binary Search",
    topic: "Searching",
    company: "Google",
    link: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
  },
  {
    title: "Maximum Subarray",
    topic: "DP",
    company: "Amazon",
    link: "https://leetcode.com/problems/maximum-subarray/",
    difficulty: "Medium",
  },
  {
    title: "Climbing Stairs",
    topic: "DP",
    company: "TCS",
    link: "https://leetcode.com/problems/climbing-stairs/",
    difficulty: "Easy",
  },
  {
    title: "Two Sum II - Input Array Is Sorted",
    topic: "Two Pointers",
    company: "Meta",
    link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    difficulty: "Medium",
  },
];

async function seedQuestions() {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // ✅ timeout fix
    });

    console.log("MongoDB Connected ✅");

    // ✅ clear existing questions (optional but recommended)
    await Question.deleteMany();
    console.log("Old questions cleared ✅");

    await Question.insertMany(questions);
    console.log("Questions Seeded Successfully ✅");

    await mongoose.connection.close();
    console.log("MongoDB connection closed ✅");
    process.exit(0);
  } catch (err) {
    console.log("Error ❌", err.message);
    process.exit(1);
  }
}

seedQuestions();
