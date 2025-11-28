const express = require("express");
const User = require("../models/User");
const Lesson = require("../models/Lesson");

const router = express.Router();

async function getUserFromHeader(req, res, next) {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(401).json({ error: "x-user-id header missing" });

  try {
    const user = await User.findById(userId).populate("completedLessons.lesson");
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

// GET /api/users/me
router.get("/me", getUserFromHeader, (req, res) => {
  const user = req.user;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      completedLessons: user.completedLessons,
    },
  });
});

// POST /api/users/complete/:lessonId
router.post("/complete/:lessonId", getUserFromHeader, async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const user = req.user;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    const alreadyCompleted = user.completedLessons.some(
      (item) => item.lesson.toString() === lessonId
    );

    if (!alreadyCompleted) {
      user.completedLessons.push({ lesson: lessonId, completedAt: new Date() });
      await user.save();
    }

    res.json({
      message: "Lesson marked as completed",
      completedLessons: user.completedLessons,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/users/progress/summary
router.get("/progress/summary", getUserFromHeader, async (req, res, next) => {
  try {
    const user = req.user;
    const totalCompleted = user.completedLessons.length;

    const categoryCounts = {};
    for (const entry of user.completedLessons) {
      const lesson = entry.lesson;
      const category = lesson?.category || "uncategorized";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }

    res.json({ totalCompleted, categoryCounts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
