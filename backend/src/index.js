// backend/src/index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // reads ../.env by default

// ===== ROUTE IMPORTS =====
const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lessons");
const userRoutes = require("./routes/users");

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

// Debug: make sure these are functions
console.log("authRoutes type:", typeof authRoutes);
console.log("lessonRoutes type:", typeof lessonRoutes);
console.log("userRoutes type:", typeof userRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "ByteLearn API is running 🚀" });
});

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Server error",
  });
});

// ===== CONNECT TO DB + START SERVER =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error starting server:", err);
  });
