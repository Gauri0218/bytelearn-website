ByteLearn – Gamified CS Learning Web App
A Duolingo-style web app for computer science students.
I built this as a full-fledged web version of a ByteLearn-like practice experience with playlists, XP, streaks and timed quizzes.

🌟 Features
🔐 Fake Auth Flow

Login & Register screens (email/password)
User is stored in localStorage so the session survives refresh
🎮 Gamified Dashboard

XP, level, daily streak, completed lessons
Achievement badges based on XP, streak and completion count
“Continue learning” card that jumps to the next lesson
🧠 Topic Playlists

DSA Sprint, SQL Query Rush, Cloud Foundations, Network Ninja, Mock Interview Prep
Animated black playlist cards with progress bars
Category filter pills (All / DSA / SQL / Cloud / Networks / Interviews)
❓ Interactive Lesson Player

MCQ questions with correct / incorrect animations
30s timer per question with progress bar
Question progress bar (Question x of n)
Score calculation + XP and streak update when you finish
🎨 UI / UX

Dark gamer-style theme with animated background
Neon gradients, glowing buttons, hover effects
Fully responsive layout for desktop and mobile
🛠 Tech Stack
Frontend: React + Vite
Styling: Custom CSS (no UI library)
State: React Hooks (useState, useEffect)
Storage: localStorage for persisting user session
🧩 Architecture Overview
App.jsx – main React component:
Handles routing between login, register, dashboard, lesson views
Stores user, lessons, activeLesson, and completion info in state
SAMPLE_LESSONS – in-memory dataset:
Lessons grouped by playlist: DSA, SQL, Cloud, Networks, Interviews
Each lesson has questions, options and answer index
App.css – entire design system:
Dark theme, animated background
Dashboard layout, playlist strip, lesson player styling
Mobile responsive rules
🚀 Getting Started
# install dependencies
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
