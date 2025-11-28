import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   SAMPLE LESSON DATA (NO BACKEND)
   ========================================================= */

const ALL_LESSONS = [
  /* ---------- GENERAL / DSA ---------- */
  {
    id: "1",
    playlist: "DSA",
    title: "What is an Algorithm?",
    description: "Understand the core idea behind algorithms.",
    language: "Programming",
    level: "Beginner",
    xpReward: 10,
    questions: [
      {
        prompt: "An algorithm is...",
        options: [
          "A programming language",
          "A set of step-by-step instructions",
          "A type of hardware",
          "A syntax error",
        ],
        answerIndex: 1,
      },
      {
        prompt: "Where are algorithms used?",
        options: [
          "Only in maths",
          "Only in computer science",
          "In everyday problem solving",
          "Nowhere",
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    id: "2",
    playlist: "DSA",
    title: "Time Complexity Basics",
    description: "Big-O notation and why it matters.",
    language: "Programming",
    level: "Beginner",
    xpReward: 15,
    questions: [
      {
        prompt: "Big-O describes...",
        options: [
          "Exact running time",
          "Worst-case growth of time with input size",
          "Amount of RAM in the computer",
          "Number of if statements",
        ],
        answerIndex: 1,
      },
      {
        prompt: "Which is faster as n grows?",
        options: ["O(n)", "O(n^2)", "O(2^n)", "O(n!)"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "3",
    playlist: "DSA",
    title: "Arrays vs Linked Lists",
    description: "Trade-offs between arrays and linked lists.",
    language: "DSA",
    level: "Intermediate",
    xpReward: 20,
    questions: [
      {
        prompt: "Arrays have...",
        options: [
          "Fast random access",
          "Fast insertion in the middle",
          "O(1) deletion anywhere",
          "No fixed size",
        ],
        answerIndex: 0,
      },
      {
        prompt: "Linked lists are good for...",
        options: [
          "Random access",
          "Frequent insertions/deletions",
          "Sorting",
          "Matrix operations",
        ],
        answerIndex: 1,
      },
    ],
  },

  /* ---------- SQL PLAYLIST ---------- */
  {
    id: "4",
    playlist: "SQL",
    title: "SQL Basics: SELECT",
    description: "Querying rows from a single table.",
    language: "SQL",
    level: "Beginner",
    xpReward: 12,
    questions: [
      {
        prompt: "Which keyword is used to fetch data?",
        options: ["PULL", "FETCH", "SELECT", "GET"],
        answerIndex: 2,
      },
      {
        prompt: "To get all columns, you use...",
        options: ["SELECT ALL", "SELECT *", "SELECT COLUMN", "GET *"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "5",
    playlist: "SQL",
    title: "SQL WHERE & AND/OR",
    description: "Filter rows using conditions.",
    language: "SQL",
    level: "Beginner",
    xpReward: 14,
    questions: [
      {
        prompt: "Which clause is used to filter rows?",
        options: ["FILTER", "WHERE", "HAVING", "CHECK"],
        answerIndex: 1,
      },
      {
        prompt: "To combine two conditions both true, use...",
        options: ["OR", "AND", "JOIN", "BETWEEN"],
        answerIndex: 1,
      },
    ],
  },

  /* ---------- CLOUD PLAYLIST ---------- */
  {
    id: "6",
    playlist: "Cloud",
    title: "Cloud Service Models",
    description: "IaaS vs PaaS vs SaaS.",
    language: "Cloud",
    level: "Conceptual",
    xpReward: 15,
    questions: [
      {
        prompt: "Which model gives you the most control over VMs?",
        options: ["SaaS", "PaaS", "IaaS", "FaaS"],
        answerIndex: 2,
      },
      {
        prompt: "Which is typically 'ready-to-use' software?",
        options: ["SaaS", "PaaS", "IaaS", "On-prem"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "7",
    playlist: "Cloud",
    title: "Regions & Availability Zones",
    description: "High availability in the cloud.",
    language: "Cloud",
    level: "Beginner",
    xpReward: 18,
    questions: [
      {
        prompt: "Multiple AZs in a region mainly help with...",
        options: ["Cost", "Latency", "High availability", "Security"],
        answerIndex: 2,
      },
      {
        prompt: "Data residency is decided at the level of...",
        options: ["Region", "Availability Zone", "Subnet", "VPC"],
        answerIndex: 0,
      },
    ],
  },

  /* ---------- NETWORKS PLAYLIST ---------- */
  {
    id: "8",
    playlist: "Networks",
    title: "OSI Model Layers",
    description: "Remember the 7 layers and roles.",
    language: "Networks",
    level: "Beginner",
    xpReward: 12,
    questions: [
      {
        prompt: "Which layer is responsible for routing?",
        options: ["Transport", "Network", "Session", "Data Link"],
        answerIndex: 1,
      },
      {
        prompt: "HTTP usually lives at which layer?",
        options: ["Presentation", "Application", "Transport", "Network"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "9",
    playlist: "Networks",
    title: "HTTP vs HTTPS",
    description: "Secure web communication basics.",
    language: "Networks",
    level: "Beginner",
    xpReward: 15,
    questions: [
      {
        prompt: "HTTPS mainly adds...",
        options: ["Speed", "Compression", "Encryption", "Caching"],
        answerIndex: 2,
      },
      {
        prompt: "TLS works between which layers?",
        options: [
          "Network & Data Link",
          "Application & Transport",
          "Physical & Data Link",
          "Transport & Network",
        ],
        answerIndex: 1,
      },
    ],
  },

  /* ---------- INTERVIEW PLAYLIST ---------- */
  {
    id: "10",
    playlist: "Interviews",
    title: "System Design: Basics",
    description: "High-level design conversation topics.",
    language: "Interviews",
    level: "Intermediate",
    xpReward: 22,
    questions: [
      {
        prompt: "A load balancer mainly helps with...",
        options: ["Storage", "Scalability", "CPU speed", "Testing"],
        answerIndex: 1,
      },
      {
        prompt: "Horizontal scaling means...",
        options: [
          "Adding more powerful CPUs",
          "Adding more machines",
          "Optimising queries only",
          "Caching responses",
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "11",
    playlist: "Interviews",
    title: "Behavioural: STAR Method",
    description: "Structure your answers clearly.",
    language: "Interviews",
    level: "Soft Skills",
    xpReward: 10,
    questions: [
      {
        prompt: "In STAR, 'R' stands for...",
        options: ["Result", "Reason", "Review", "Role"],
        answerIndex: 0,
      },
      {
        prompt: "STAR is best used for...",
        options: [
          "Coding rounds",
          "Behavioural questions",
          "System design",
          "Resume writing",
        ],
        answerIndex: 1,
      },
    ],
  },
];

/* ---------- PLAYLIST META ---------- */

const PLAYLISTS = [
  {
    id: "DSA",
    title: "DSA Sprint",
    emoji: "🧠",
    description: "Core algorithms & data structures.",
  },
  {
    id: "SQL",
    title: "SQL Query Rush",
    emoji: "🗄️",
    description: "Most asked SQL concepts.",
  },
  {
    id: "Cloud",
    title: "Cloud Foundations",
    emoji: "☁️",
    description: "AWS / Azure / GCP basics.",
  },
  {
    id: "Networks",
    title: "Network Ninja",
    emoji: "🌐",
    description: "HTTP, OSI, protocols.",
  },
  {
    id: "Interviews",
    title: "Mock Interview Prep",
    emoji: "🎤",
    description: "System design + HR.",
  },
];

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar({ user, onLogout, onGoDashboard }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="logo" onClick={onGoDashboard}>
          ByteLearn
        </button>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">
              XP: {user.xp} &nbsp; | &nbsp; 🔥 {user.streak}
            </span>
            <button onClick={onLogout} className="btn-secondary">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

/* =========================================================
   AUTH SCREENS (FAKE AUTH)
   ========================================================= */

function LoginView({ onSwitchToRegister, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }
    const fakeUser = {
      name: form.email.split("@")[0] || "Learner",
      email: form.email,
      xp: 0,
      streak: 0,
      completedLessons: [],
    };
    onLoginSuccess(fakeUser);
  };

  return (
    <div className="auth-container">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="error-text">{error}</p>}
        <button className="btn-primary">Login</button>
      </form>
      <p>
        New here?{" "}
        <button className="link-btn" onClick={onSwitchToRegister}>
          Create an account
        </button>
      </p>
    </div>
  );
}

function RegisterView({ onSwitchToLogin, onRegisterSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    const fakeUser = {
      name: form.name,
      email: form.email,
      xp: 0,
      streak: 0,
      completedLessons: [],
    };
    onRegisterSuccess(fakeUser);
  };

  return (
    <div className="auth-container">
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="error-text">{error}</p>}
        <button className="btn-primary">Sign up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button className="link-btn" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </div>
  );
}

/* =========================================================
   PLAYLIST STRIP (BLACK ANIMATED CARDS)
   ========================================================= */

function PlaylistStrip({ user, lessons, activeCategory, onCategoryChange }) {
  const completedSet = new Set(user.completedLessons);

  const computeProgress = (playlistId) => {
    const playlistLessons = lessons.filter((l) => l.playlist === playlistId);
    if (playlistLessons.length === 0) return 0;

    const totalXp = playlistLessons.reduce((sum, l) => sum + l.xpReward, 0);
    const earnedXp = playlistLessons
      .filter((l) => completedSet.has(l.id))
      .reduce((sum, l) => sum + l.xpReward, 0);

    return Math.round((earnedXp / totalXp) * 100);
  };

  return (
    <div className="playlist-strip">
      {PLAYLISTS.map((pl) => {
        const progress = computeProgress(pl.id);
        const lessonCount = lessons.filter((l) => l.playlist === pl.id).length;
        const isActive = activeCategory === pl.id;

        return (
          <button
            key={pl.id}
            type="button"
            className="playlist-card"
            onClick={() =>
              onCategoryChange(isActive ? "All" : pl.id)
            }
          >
            <div className="playlist-header">
              <div className="playlist-title">
                {pl.emoji} {pl.title}
              </div>
              <div className="playlist-count">
                {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="playlist-progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>
            <p className="playlist-xp">
              {pl.description} • {progress}% complete
            </p>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function DashboardView({
  user,
  lessons,
  activeCategory,
  onCategoryChange,
  onStartLesson,
}) {
  const xp = user.xp;
  const streak = user.streak;
  const completedIds = user.completedLessons;

  const level = Math.floor(xp / 50) + 1;
  const xpIntoLevel = xp % 50;
  const xpToNext = 50 - xpIntoLevel;
  const levelProgress = (xpIntoLevel / 50) * 100;

  const badges = [];
  if (xp >= 10) badges.push("First Steps");
  if (streak >= 3) badges.push("3-Day Streak");
  if (completedIds.length >= 3) badges.push("Lesson Explorer");

  const nextLesson =
    lessons.find((l) => !completedIds.includes(l.id)) || lessons[0];

  const visibleLessons =
    activeCategory === "All"
      ? lessons
      : lessons.filter((l) => l.playlist === activeCategory);

  const categories = [
    "All",
    "DSA",
    "SQL",
    "Cloud",
    "Networks",
    "Interviews",
  ];

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Welcome back, {user.name} 👋</h1>
          <p className="dash-subtitle">
            Keep your streak alive and unlock new lessons. Each lesson gives
            you XP and helps you level up.
          </p>
        </div>
        <div className="dash-level-card">
          <p className="label">Level</p>
          <h2>{level}</h2>
          <p className="small">
            {xpIntoLevel} / 50 XP to next level ({xpToNext} XP left)
          </p>
          <div className="progress-line">
            <div style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </header>

      {/* playlist strip */}
      <PlaylistStrip
        user={user}
        lessons={lessons}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* category pills */}
      <div className="category-row">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={
              "category-pill" + (activeCategory === cat ? " active" : "")
            }
            onClick={() => onCategoryChange(cat)}
          >
            {cat === "All" ? "All topics" : cat}
          </button>
        ))}
      </div>

      <section className="dash-top-row">
        <div className="continue-card">
          <h3>Continue learning</h3>
          <p className="small">
            {nextLesson ? nextLesson.title : "No lessons available yet"}
          </p>
          <p className="tiny">
            Complete 1 lesson today to keep your daily streak.
          </p>
          {nextLesson && (
            <button
              className="btn-primary wide"
              onClick={() => onStartLesson(nextLesson.id)}
            >
              Resume lesson
            </button>
          )}
        </div>

        <div className="stats-card">
          <div className="stat-pill">
            <span className="label">XP</span>
            <span className="value">{xp}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Streak</span>
            <span className="value">🔥 {streak}</span>
          </div>
          <div className="stat-pill">
            <span className="label">Completed</span>
            <span className="value">{completedIds.length}</span>
          </div>
          <div className="daily-goal">
            <p className="label">Daily goal</p>
            <p className="tiny">
              {streak > 0
                ? "You're on fire! Don't break the chain today."
                : "Complete one lesson to start a streak."}
            </p>
          </div>
        </div>

        <div className="badge-card">
          <h3>Achievements</h3>
          {badges.length === 0 ? (
            <p className="tiny">Finish a few lessons to unlock badges.</p>
          ) : (
            <ul>
              {badges.map((b) => (
                <li key={b}>🏅 {b}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dash-main-row">
        <div className="lessons-panel">
          <div className="lessons-header">
            <h2>All lessons</h2>
          </div>
          <div className="lesson-grid">
            {visibleLessons.map((lesson) => {
              const done = completedIds.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className={`lesson-card ${done ? "completed" : ""}`}
                >
                  <div className="lesson-card-header">
                    <h3>{lesson.title}</h3>
                    {done && (
                      <span className="pill pill-completed">Completed</span>
                    )}
                  </div>
                  <p className="lesson-desc">{lesson.description}</p>
                  <p className="lesson-meta">
                    {lesson.language} • {lesson.level} • {lesson.xpReward} XP
                  </p>
                  <button
                    className="btn-secondary small-btn"
                    onClick={() => onStartLesson(lesson.id)}
                  >
                    {done ? "Practice again" : "Start lesson"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="leaderboard-panel">
          <h3>Leaderboard (demo)</h3>
          <p className="tiny">
            Example leaderboard to show how a real feature would look.
          </p>
          <ul className="leaderboard-list">
            <li>
              <span>👑 You</span>
              <span>{xp} XP</span>
            </li>
            <li>
              <span>Alex</span>
              <span>{xp + 40} XP</span>
            </li>
            <li>
              <span>Deeksha</span>
              <span>{xp + 25} XP</span>
            </li>
            <li>
              <span>Riya</span>
              <span>{xp + 10} XP</span>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}

/* =========================================================
   LESSON PLAY VIEW
   ========================================================= */

function LessonView({ lesson, onBack, onFinished }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    setCurrentIndex(0);
    setSelected(null);
    setIsCorrect(null);
    setScore(0);
    setTimer(30);
  }, [lesson.id]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  useEffect(() => {
    if (timer === 0 && selected === null) {
      handleNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const total = lesson.questions.length;
  const question = lesson.questions[currentIndex];
  const questionProgress = ((currentIndex + 1) / total) * 100;
  const timerProgress = (timer / 30) * 100;

  const handleOptionClick = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.answerIndex;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setIsCorrect(null);
      setTimer(30);
      return;
    }
    onFinished({ score });
  };

  return (
    <div className="lesson-play">
      <button className="btn-secondary" onClick={onBack}>
        ← Back to dashboard
      </button>

      <header className="lesson-header">
        <div>
          <h1>{lesson.title}</h1>
          <p className="tiny">
            {lesson.language} • {lesson.level} • {lesson.xpReward} XP
          </p>
        </div>
        <div className="question-progress">
          <span className="tiny">
            Question {currentIndex + 1} of {total}
          </span>
          <div className="progress-line">
            <div style={{ width: `${questionProgress}%` }} />
          </div>
        </div>
      </header>

      <section className="lesson-card-main">
        <p className="question-text">{question.prompt}</p>

        <div className="timer-row">
          <span className="tiny">⏳ {timer}s left</span>
          <div className="progress-line thin">
            <div style={{ width: `${timerProgress}%` }} />
          </div>
        </div>

        <div className="options-grid">
          {question.options.map((opt, idx) => {
            let className = "option-btn";
            if (selected !== null) {
              if (idx === question.answerIndex) className += " correct";
              else if (idx === selected && idx !== question.answerIndex)
                className += " incorrect";
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleOptionClick(idx)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="feedback">
            {isCorrect ? "✅ Correct!" : "❌ Not quite, keep going!"}
          </div>
        )}

        <button
          className="btn-primary next-btn"
          disabled={selected === null && timer > 0}
          onClick={handleNext}
        >
          {currentIndex === total - 1 ? "Finish Lesson" : "Next"}
        </button>
      </section>
    </div>
  );
}

/* =========================================================
   ROOT APP
   ========================================================= */

export default function App() {
  // read user from localStorage once (no setState inside effect)
  const savedUser = (() => {
    try {
      const stored = localStorage.getItem("bytelearn-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const [user, setUser] = useState(savedUser);
  const [view, setView] = useState(savedUser ? "dashboard" : "login");
  const [lessons] = useState(ALL_LESSONS);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completionInfo, setCompletionInfo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // keep user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("bytelearn-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bytelearn-user");
    }
  }, [user]);

  const handleLoginSuccess = (fakeUser) => {
    setUser(fakeUser);
    setView("dashboard");
  };

  const handleRegisterSuccess = (fakeUser) => {
    setUser(fakeUser);
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveLesson(null);
    setCompletionInfo(null);
    setActiveCategory("All");
    setView("login");
  };

  const handleStartLesson = (lessonId) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setActiveLesson(lesson);
    setCompletionInfo(null);
    setView("lesson");
  };

  const handleLessonFinished = ({ score }) => {
    if (!user || !activeLesson) return;
    const xpGained = activeLesson.xpReward;
    const alreadyCompleted = user.completedLessons.includes(activeLesson.id);

    const updatedUser = {
      ...user,
      xp: user.xp + xpGained,
      streak: user.streak + 1,
      completedLessons: alreadyCompleted
        ? user.completedLessons
        : [...user.completedLessons, activeLesson.id],
    };

    setUser(updatedUser);
    setCompletionInfo({
      score,
      xp: updatedUser.xp,
      streak: updatedUser.streak,
    });
    setView("dashboard");
  };

  const handleNavbarDashboard = () => {
    if (user) setView("dashboard");
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onGoDashboard={handleNavbarDashboard}
      />
      <main className="main-container">
        {!user && view === "login" && (
          <LoginView
            onSwitchToRegister={() => setView("register")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {!user && view === "register" && (
          <RegisterView
            onSwitchToLogin={() => setView("login")}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}

        {user && view === "dashboard" && (
          <>
            <DashboardView
              user={user}
              lessons={lessons}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              onStartLesson={handleStartLesson}
            />
            {completionInfo && (
              <p className="center-text">
                🎉 Last lesson: score {completionInfo.score}, total XP{" "}
                {completionInfo.xp}, streak {completionInfo.streak}
              </p>
            )}
          </>
        )}

        {user && view === "lesson" && activeLesson && (
          <LessonView
            lesson={activeLesson}
            onBack={() => setView("dashboard")}
            onFinished={handleLessonFinished}
          />
        )}
      </main>
    </>
  );
}
