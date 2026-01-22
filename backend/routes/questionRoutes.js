const express = require("express");
const { addQuestion, getQuestions } = require("../controllers/questionController");

const router = express.Router();

// test route (optional)
router.get("/test", (req, res) => {
  res.send("Questions route working ✅");
});

router.post("/add", addQuestion);
router.get("/", getQuestions);

module.exports = router;
