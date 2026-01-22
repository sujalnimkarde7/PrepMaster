const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes"); // ✅ add this
const progressRoutes = require("./routes/progressRoutes");
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("PrepMaster Backend Running ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes); // ✅ add this
app.use("/api/progress", progressRoutes);
app.use("/api/materials", studyMaterialRoutes);


// MongoDB connection + Start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
  })
  .catch((err) => console.log("MongoDB Error ❌", err.message));
