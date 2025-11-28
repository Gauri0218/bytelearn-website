// backend/src/routes/auth.js

const express = require("express");

const router = express.Router();

// Simple test route: GET /api/auth/test
router.get("/test", (req, res) => {
  res.json({ ok: true, message: "Simple auth router is working ✅" });
});

// IMPORTANT: export ONLY the router function
module.exports = router;
