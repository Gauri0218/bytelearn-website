const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    completedLessons: [
      {
        lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
        completedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
