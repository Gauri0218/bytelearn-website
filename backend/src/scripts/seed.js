// backend/src/scripts/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Lesson = require("../models/Lesson");

async function seed() {
  try {
    console.log("🔌 Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB for seeding");

    // Delete old lessons
    const delResult = await Lesson.deleteMany({});
    console.log("🧹 Deleted old lessons:", delResult.deletedCount);

    // New sample lessons
    const lessons = [
      {
        title: "What is an Algorithm?",
        content:
          "An algorithm is a step-by-step set of instructions to solve a problem.",
        durationSeconds: 30,
        category: "Computer Science",
      },
      {
        title: "Time Complexity (Big-O)",
        content:
          "Big-O notation describes how running time grows as input size increases.",
        durationSeconds: 30,
        category: "Computer Science",
      },
      {
        title: "What is HTTP?",
        content:
          "HTTP is the protocol used by web browsers and servers to communicate.",
        durationSeconds: 30,
        category: "Web",
      },
      {
        title: "CSS Box Model",
        content:
          "The CSS box model consists of content, padding, border, and margin.",
        durationSeconds: 30,
        category: "Web",
      },
      {
        title: "What is a Database?",
        content:
          "A database is an organized collection of data that can be accessed, managed and updated easily.",
        durationSeconds: 30,
        category: "Databases",
      },
    ];

    const inserted = await Lesson.insertMany(lessons);
    console.log("✅ Inserted lessons:", inserted.length);

    await mongoose.disconnect();
    console.log("🔌 Disconnected. Seeding finished.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
