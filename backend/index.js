const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const materialRoutes = require("./routes/materialsRoutes");

const app = express();

// ✅ simplest working CORS
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PrepMaster Backend Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/materials", materialRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
  })
  .catch((err) => console.log("MongoDB Error ❌", err.message));
