const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const materialRoutes = require("./routes/materialRoutes");

const app = express();

/* ✅ CORS Fix (for Vercel Frontend)
   - Allows requests from any origin
   - Handles preflight properly
*/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight request handler (important)
app.options("/*", cors());

app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("PrepMaster Backend Running ✅");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/materials", materialRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
  })
  .catch((err) => console.log("MongoDB Error ❌", err.message));
