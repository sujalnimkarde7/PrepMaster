const express = require("express");
const {
  markSolved,
  getProgressStats,
  getSolvedQuestions
} = require("../controllers/progressController");

const router = express.Router();

router.post("/solve", markSolved);
router.get("/stats", getProgressStats);
router.get("/solved", getSolvedQuestions);

module.exports = router;
