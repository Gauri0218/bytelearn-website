// src/routes/lessons.js

const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');

// GET /api/lessons  -> list all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.json({ data: lessons });
  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
